import { Platform } from "react-native";

interface PerformanceMetrics {
  imageLoadStart: number;
  imageLoadEnd: number;
  totalImages: number;
  loadedImages: number;
}

class ImageLoadingPerformance {
  private metrics: PerformanceMetrics = {
    imageLoadStart: 0,
    imageLoadEnd: 0,
    totalImages: 0,
    loadedImages: 0,
  };

  private imageCache = new Set<string>();

  startTracking(totalImages: number) {
    this.metrics.imageLoadStart = Date.now();
    this.metrics.totalImages = totalImages;
    this.metrics.loadedImages = 0;

    if (Platform.OS === "web" && window.performance) {
      // Clear any previous marks
      try {
        performance.clearMarks("image-loading-start");
        performance.clearMeasures("image-loading-duration");
      } catch (e) {
        // Marks might not exist
      }
      performance.mark("image-loading-start");
    }
  }

  onImageLoaded() {
    this.metrics.loadedImages++;

    if (this.metrics.loadedImages === this.metrics.totalImages) {
      this.metrics.imageLoadEnd = Date.now();

      if (Platform.OS === "web" && window.performance) {
        performance.mark("image-loading-end");
        try {
          performance.measure(
            "image-loading-duration",
            "image-loading-start",
            "image-loading-end"
          );
        } catch (e) {
          console.warn("Performance measurement failed:", e);
        }
      }

      const loadTime = this.metrics.imageLoadEnd - this.metrics.imageLoadStart;
      console.log(
        `📸 Image Loading Complete: ${loadTime}ms for ${this.metrics.totalImages} images`
      );

      // Log memory usage if available
      if (Platform.OS === "web" && (window.performance as any).memory) {
        const memory = (window.performance as any).memory;
        console.log(
          `💾 Memory Usage: ${Math.round(
            memory.usedJSHeapSize / 1024 / 1024
          )}MB`
        );
      }
    }
  }

  getProgress(): number {
    return this.metrics.totalImages > 0
      ? this.metrics.loadedImages / this.metrics.totalImages
      : 0;
  }

  isImageCached(imageSource: any): boolean {
    const imageKey =
      typeof imageSource === "string"
        ? imageSource
        : imageSource?.uri || String(imageSource);
    return this.imageCache.has(imageKey);
  }

  cacheImage(imageSource: any) {
    const imageKey =
      typeof imageSource === "string"
        ? imageSource
        : imageSource?.uri || String(imageSource);
    this.imageCache.add(imageKey);
  }

  clearCache() {
    this.imageCache.clear();
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

export const imagePerformance = new ImageLoadingPerformance();
