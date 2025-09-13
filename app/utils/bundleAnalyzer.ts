/**
 * Bundle Analyzer for RunHope App
 * Monitors and analyzes bundle size and performance metrics
 */

interface BundleMetrics {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  otherSize: number;
  loadTime: number;
  renderTime: number;
  recommendations: string[];
}

interface PerformanceThresholds {
  jsSize: number;
  cssSize: number;
  imageSize: number;
  totalSize: number;
  loadTime: number;
}

class BundleAnalyzer {
  private thresholds: PerformanceThresholds = {
    jsSize: 2 * 1024 * 1024, // 2MB
    cssSize: 500 * 1024, // 500KB
    imageSize: 5 * 1024 * 1024, // 5MB
    totalSize: 10 * 1024 * 1024, // 10MB
    loadTime: 3000, // 3 seconds
  };

  /**
   * Analyze current bundle performance
   */
  public async analyzeBundleSize(): Promise<BundleMetrics> {
    if (typeof window === "undefined" || !("performance" in window)) {
      return this.getDefaultMetrics();
    }

    try {
      const resources = performance.getEntriesByType(
        "resource"
      ) as PerformanceResourceTiming[];
      const navigationTiming = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;
      let otherSize = 0;

      resources.forEach((resource) => {
        const size = resource.transferSize || 0;

        if (
          resource.name.includes(".js") ||
          resource.name.includes("javascript")
        ) {
          jsSize += size;
        } else if (
          resource.name.includes(".css") ||
          resource.name.includes("stylesheet")
        ) {
          cssSize += size;
        } else if (this.isImageResource(resource.name)) {
          imageSize += size;
        } else {
          otherSize += size;
        }
      });

      const totalSize = jsSize + cssSize + imageSize + otherSize;
      const loadTime =
        navigationTiming.loadEventEnd - navigationTiming.fetchStart;
      const renderTime =
        navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart;

      const recommendations = this.generateRecommendations({
        totalSize,
        jsSize,
        cssSize,
        imageSize,
        otherSize,
        loadTime,
        renderTime,
        recommendations: [],
      });

      return {
        totalSize,
        jsSize,
        cssSize,
        imageSize,
        otherSize,
        loadTime,
        renderTime,
        recommendations,
      };
    } catch (error) {
      console.warn("Bundle analysis failed:", error);
      return this.getDefaultMetrics();
    }
  }

  /**
   * Generate performance grade based on metrics
   */
  public getPerformanceGrade(
    metrics: BundleMetrics
  ): "A" | "B" | "C" | "D" | "F" {
    let score = 100;

    // Bundle size penalties
    if (metrics.totalSize > this.thresholds.totalSize) {
      score -= 20;
    }
    if (metrics.jsSize > this.thresholds.jsSize) {
      score -= 15;
    }
    if (metrics.cssSize > this.thresholds.cssSize) {
      score -= 10;
    }
    if (metrics.imageSize > this.thresholds.imageSize) {
      score -= 15;
    }

    // Performance penalties
    if (metrics.loadTime > this.thresholds.loadTime) {
      score -= 25;
    }
    if (metrics.renderTime > 2000) {
      score -= 15;
    }

    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  }

  /**
   * Get optimization suggestions
   */
  private generateRecommendations(metrics: BundleMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.jsSize > this.thresholds.jsSize) {
      recommendations.push(
        "📦 Consider code splitting for large JavaScript bundles"
      );
      recommendations.push("🌳 Implement tree shaking to remove unused code");
    }

    if (metrics.cssSize > this.thresholds.cssSize) {
      recommendations.push("🎨 Optimize CSS by removing unused styles");
      recommendations.push("📱 Consider critical CSS inlining");
    }

    if (metrics.imageSize > this.thresholds.imageSize) {
      recommendations.push("🖼️ Optimize images with WebP format");
      recommendations.push("📐 Implement responsive image loading");
    }

    if (metrics.loadTime > this.thresholds.loadTime) {
      recommendations.push("⚡ Enable resource preloading for critical assets");
      recommendations.push("🔄 Implement service worker caching");
    }

    if (metrics.totalSize > this.thresholds.totalSize) {
      recommendations.push("📊 Set up bundle size budgets in CI/CD");
      recommendations.push("🔍 Regular bundle analysis in development");
    }

    if (recommendations.length === 0) {
      recommendations.push("✅ Bundle size is optimal!");
      recommendations.push(
        "🚀 Consider implementing Progressive Web App features"
      );
    }

    return recommendations;
  }

  /**
   * Format bytes for human readable output
   */
  public formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  /**
   * Log detailed bundle analysis to console
   */
  public async logBundleAnalysis(): Promise<void> {
    const metrics = await this.analyzeBundleSize();
    const grade = this.getPerformanceGrade(metrics);

    console.group("🏗️ RunHope Bundle Analysis");
    console.log(`📊 Performance Grade: ${grade}`);
    console.log(`📦 Total Bundle Size: ${this.formatBytes(metrics.totalSize)}`);
    console.log(`⚡ Load Time: ${metrics.loadTime}ms`);
    console.log(`🎨 Render Time: ${metrics.renderTime}ms`);

    console.group("📋 Breakdown:");
    console.log(`JavaScript: ${this.formatBytes(metrics.jsSize)}`);
    console.log(`CSS: ${this.formatBytes(metrics.cssSize)}`);
    console.log(`Images: ${this.formatBytes(metrics.imageSize)}`);
    console.log(`Other: ${this.formatBytes(metrics.otherSize)}`);
    console.groupEnd();

    if (metrics.recommendations.length > 0) {
      console.group("💡 Recommendations:");
      metrics.recommendations.forEach((rec) => console.log(rec));
      console.groupEnd();
    }

    console.groupEnd();
  }

  private isImageResource(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|svg|webp|ico)(\?|#|$)/i.test(url);
  }

  private getDefaultMetrics(): BundleMetrics {
    return {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      otherSize: 0,
      loadTime: 0,
      renderTime: 0,
      recommendations: ["⚠️ Bundle analysis not available in this environment"],
    };
  }
}

export const bundleAnalyzer = new BundleAnalyzer();
export default BundleAnalyzer;
