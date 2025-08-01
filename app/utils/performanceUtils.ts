import { Platform } from "react-native";

interface BundleAnalysisResult {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  recommendations: string[];
}

export class PerformanceUtils {
  static logPerformanceTiming() {
    if (Platform.OS === "web" && window.performance) {
      const navigation = performance.getEntriesByType("navigation")[0] as any;

      const metrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded:
          navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstByte: navigation.responseStart - navigation.fetchStart,
        domReady: navigation.domComplete - navigation.fetchStart,
        resourcesLoaded: navigation.loadEventStart - navigation.fetchStart,
      };

      console.log("📊 Page Performance Metrics:", metrics);
      return metrics;
    }
    return null;
  }

  static measureRenderTime(componentName: string, renderFunction: () => void) {
    const startTime = performance.now();
    renderFunction();
    const endTime = performance.now();

    const renderTime = endTime - startTime;
    console.log(`🎨 ${componentName} render time: ${renderTime.toFixed(2)}ms`);

    return renderTime;
  }

  static analyzeBundle(): BundleAnalysisResult {
    if (Platform.OS !== "web") {
      return {
        totalSize: 0,
        jsSize: 0,
        cssSize: 0,
        imageSize: 0,
        recommendations: ["Bundle analysis only available on web platform"],
      };
    }

    // Estimate bundle sizes from network resources
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];

    let jsSize = 0;
    let cssSize = 0;
    let imageSize = 0;

    resources.forEach((resource) => {
      const size = resource.transferSize || 0;

      if (resource.name.includes(".js")) {
        jsSize += size;
      } else if (resource.name.includes(".css")) {
        cssSize += size;
      } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        imageSize += size;
      }
    });

    const totalSize = jsSize + cssSize + imageSize;
    const recommendations: string[] = [];

    // Generate recommendations based on sizes
    if (jsSize > 500000) {
      // 500KB
      recommendations.push(
        "JavaScript bundle is large - consider code splitting"
      );
    }

    if (imageSize > 2000000) {
      // 2MB
      recommendations.push(
        "Images are large - optimize compression and use WebP format"
      );
    }

    if (cssSize > 100000) {
      // 100KB
      recommendations.push("CSS bundle is large - remove unused styles");
    }

    const result = {
      totalSize,
      jsSize,
      cssSize,
      imageSize,
      recommendations,
    };

    console.log("📦 Bundle Analysis:", {
      ...result,
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2) + "MB",
      jsSizeMB: (jsSize / 1024 / 1024).toFixed(2) + "MB",
      cssSizeMB: (cssSize / 1024 / 1024).toFixed(2) + "MB",
      imageSizeMB: (imageSize / 1024 / 1024).toFixed(2) + "MB",
    });

    return result;
  }

  static measureInteractionDelay(callback: () => void): Promise<number> {
    return new Promise((resolve) => {
      const startTime = performance.now();

      // Use requestIdleCallback if available, otherwise setTimeout
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          callback();
          const endTime = performance.now();
          resolve(endTime - startTime);
        });
      } else {
        setTimeout(() => {
          callback();
          const endTime = performance.now();
          resolve(endTime - startTime);
        }, 0);
      }
    });
  }

  static observeLCP(): Promise<number> {
    return new Promise((resolve) => {
      if (Platform.OS !== "web" || !("PerformanceObserver" in window)) {
        resolve(0);
        return;
      }

      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          if (lastEntry) {
            console.log(
              "🎯 Largest Contentful Paint:",
              lastEntry.startTime + "ms"
            );
            resolve(lastEntry.startTime);
          }
        });

        observer.observe({ entryTypes: ["largest-contentful-paint"] });

        // Cleanup after 10 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(0);
        }, 10000);
      } catch (error) {
        console.warn("LCP observation failed:", error);
        resolve(0);
      }
    });
  }

  static observeFID(): Promise<number> {
    return new Promise((resolve) => {
      if (Platform.OS !== "web" || !("PerformanceObserver" in window)) {
        resolve(0);
        return;
      }

      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0] as any;

          if (firstEntry) {
            const fid = firstEntry.processingStart - firstEntry.startTime;
            console.log("⚡ First Input Delay:", fid + "ms");
            resolve(fid);
          }
        });

        observer.observe({ entryTypes: ["first-input"] });

        // Cleanup after 30 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(0);
        }, 30000);
      } catch (error) {
        console.warn("FID observation failed:", error);
        resolve(0);
      }
    });
  }

  static getMemoryInfo() {
    if (Platform.OS === "web" && "memory" in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
        totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024), // MB
        jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024), // MB
        usage: Math.round(
          (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        ), // %
      };
    }
    return null;
  }

  static startPerformanceMonitoring() {
    console.log("🚀 Starting Performance Monitoring...");

    // Log initial metrics
    this.logPerformanceTiming();
    this.analyzeBundle();

    // Start observing Core Web Vitals
    this.observeLCP();
    this.observeFID();

    // Log memory usage periodically
    if (Platform.OS === "web") {
      setInterval(() => {
        const memoryInfo = this.getMemoryInfo();
        if (memoryInfo && memoryInfo.usage > 80) {
          console.warn("⚠️ High memory usage detected:", memoryInfo);
        }
      }, 30000); // Check every 30 seconds
    }
  }
}

export default PerformanceUtils;
