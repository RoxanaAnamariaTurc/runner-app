import { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  interactionLatency: number;
  frameDrops: number;
  jsHeapSize: number;
}

interface NetworkInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    interactionLatency: 0,
    frameDrops: 0,
    jsHeapSize: 0,
  });

  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const startTime = useRef(Date.now());
  const renderStartTime = useRef(Date.now());

  // Track component mount and render time
  useEffect(() => {
    const mountTime = Date.now() - startTime.current;
    const renderTime = Date.now() - renderStartTime.current;

    setMetrics((prev) => ({
      ...prev,
      loadTime: mountTime,
      renderTime,
    }));
  }, []);

  // Monitor memory usage (Web only) - with throttling
  useEffect(() => {
    if (Platform.OS === "web" && "memory" in performance) {
      const updateMemoryInfo = () => {
        const memory = (performance as any).memory;
        if (memory) {
          setMetrics((prev) => ({
            ...prev,
            memoryUsage: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
            jsHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          }));
        }
      };

      updateMemoryInfo();
      // Reduced frequency to prevent performance impact
      const interval = setInterval(updateMemoryInfo, 10000); // Every 10 seconds
      return () => clearInterval(interval);
    }
  }, []);

  // Monitor network information (Web only)
  useEffect(() => {
    if (Platform.OS === "web" && "connection" in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        const updateNetworkInfo = () => {
          setNetworkInfo({
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
          });
        };

        updateNetworkInfo();
        connection.addEventListener("change", updateNetworkInfo);
        return () =>
          connection.removeEventListener("change", updateNetworkInfo);
      }
    }
  }, []);

  // Track frame drops (Web only) - optimized for less overhead
  useEffect(() => {
    if (Platform.OS === "web") {
      let frameDropCount = 0;
      let lastFrameTime = performance.now();
      let rafId: number;
      let sampleCount = 0;
      const maxSamples = 60; // Only sample for 1 second at 60fps

      const checkFrameRate = (currentTime: number) => {
        const delta = currentTime - lastFrameTime;

        // Consider frame dropped if > 20ms (more lenient threshold)
        if (delta > 20 && sampleCount < maxSamples) {
          frameDropCount++;
        }

        lastFrameTime = currentTime;
        sampleCount++;

        // Update metrics less frequently
        if (sampleCount % 10 === 0) {
          setMetrics((prev) => ({
            ...prev,
            frameDrops: frameDropCount,
          }));
        }

        // Stop sampling after maxSamples to reduce CPU usage
        if (sampleCount < maxSamples) {
          rafId = requestAnimationFrame(checkFrameRate);
        }
      };

      rafId = requestAnimationFrame(checkFrameRate);
      return () => cancelAnimationFrame(rafId);
    }
  }, []);

  // Measure interaction latency
  const measureInteraction = (callback: () => void) => {
    const startTime = performance.now();

    const measureLatency = () => {
      const latency = performance.now() - startTime;
      setMetrics((prev) => ({
        ...prev,
        interactionLatency: latency,
      }));
    };

    requestAnimationFrame(() => {
      callback();
      requestAnimationFrame(measureLatency);
    });
  };

  // Get performance summary
  const getPerformanceSummary = () => {
    const summary = {
      ...metrics,
      networkInfo,
      performanceGrade: getPerformanceGrade(),
      recommendations: getRecommendations(),
    };

    if (__DEV__) {
      console.log("📊 Performance Summary:", summary);
    }

    return summary;
  };

  const getPerformanceGrade = (): "A" | "B" | "C" | "D" | "F" => {
    let score = 100;

    // Load time scoring
    if (metrics.loadTime > 3000) score -= 30;
    else if (metrics.loadTime > 1500) score -= 15;
    else if (metrics.loadTime > 1000) score -= 5;

    // Memory usage scoring
    if (metrics.memoryUsage > 100) score -= 20;
    else if (metrics.memoryUsage > 50) score -= 10;

    // Frame drops scoring
    if (metrics.frameDrops > 10) score -= 20;
    else if (metrics.frameDrops > 5) score -= 10;

    // Interaction latency scoring
    if (metrics.interactionLatency > 100) score -= 15;
    else if (metrics.interactionLatency > 50) score -= 5;

    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const getRecommendations = (): string[] => {
    const recommendations: string[] = [];

    if (metrics.loadTime > 2000) {
      recommendations.push("Consider lazy loading more components");
    }

    if (metrics.memoryUsage > 80) {
      recommendations.push("Memory usage is high - check for memory leaks");
    }

    if (metrics.frameDrops > 5) {
      recommendations.push("Frame drops detected - optimize animations");
    }

    if (metrics.interactionLatency > 50) {
      recommendations.push(
        "Interaction latency is high - optimize event handlers"
      );
    }

    if (
      networkInfo?.effectiveType === "slow-2g" ||
      networkInfo?.effectiveType === "2g"
    ) {
      recommendations.push("Optimize for slow network connections");
    }

    return recommendations;
  };

  return {
    metrics,
    networkInfo,
    measureInteraction,
    getPerformanceSummary,
    getPerformanceGrade: getPerformanceGrade(),
    recommendations: getRecommendations(),
  };
};

export default usePerformanceMetrics;
