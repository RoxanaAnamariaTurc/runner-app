import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
} from "react-native";
import { imagePerformance } from "../utils/imagePerformance";

interface LazyImageProps {
  source: ImageSourcePropType;
  style: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  placeholder?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number; // Distance from viewport to start loading
}

export default function LazyImage({
  source,
  style,
  containerStyle,
  resizeMode = "cover",
  placeholder,
  onLoad,
  onError,
  threshold = 50,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<View>(null);

  // For React Native Web, we can use Intersection Observer
  useEffect(() => {
    if (Platform.OS === "web" && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              setShouldLoad(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: `${threshold}px`,
        }
      );

      // We need to get the DOM element for web
      const element = (containerRef.current as any)?._nativeTag
        ? document.querySelector(
            `[data-tag="${(containerRef.current as any)._nativeTag}"]`
          )
        : containerRef.current;

      if (element) {
        observer.observe(element as Element);
      }

      return () => {
        if (element) {
          observer.unobserve(element as Element);
        }
        observer.disconnect();
      };
    } else {
      // For React Native, use a progressive loading strategy
      // Load images in batches with a slight delay to reduce initial load
      const timer = setTimeout(() => {
        setShouldLoad(true);
        setIsInView(true);
      }, Math.random() * 2000); // Random delay between 0-2 seconds

      return () => clearTimeout(timer);
    }
  }, [threshold]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    imagePerformance.cacheImage(source);
    imagePerformance.onImageLoaded();
    onLoad?.();
  };

  const handleImageError = () => {
    setHasError(true);
    onError?.();
  };

  const defaultPlaceholder = (
    <View style={[styles.placeholder, style]}>
      <ActivityIndicator size="small" color="#f0d26e" />
    </View>
  );

  const errorPlaceholder = (
    <View style={[styles.placeholder, styles.errorPlaceholder, style]}>
      <View style={styles.errorIcon} />
    </View>
  );

  return (
    <View ref={containerRef} style={[containerStyle, { position: "relative" }]}>
      {!shouldLoad && (placeholder || defaultPlaceholder)}

      {shouldLoad && !hasError && (
        <>
          {!isLoaded && (placeholder || defaultPlaceholder)}
          <Image
            source={source}
            style={[
              style,
              {
                opacity: isLoaded ? 1 : 0,
                position: isLoaded ? "relative" : "absolute",
              },
            ]}
            resizeMode={resizeMode}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
      )}

      {hasError && errorPlaceholder}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  errorPlaceholder: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  errorIcon: {
    width: 20,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
  },
});
