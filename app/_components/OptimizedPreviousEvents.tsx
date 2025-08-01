import React, { memo, useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import LazyImage from "./LazyImage";
import { previousEventsData } from "../data/previousEvents";

interface OptimizedPreviousEventsProps {
  style?: any;
}

const OptimizedPreviousEvents = memo(
  ({ style }: OptimizedPreviousEventsProps) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = useState(
      Dimensions.get("window").width
    );
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef<any>(null);
    const scrollViewRef = useRef<ScrollView>(null);

    // Reduce to a manageable number of images for better performance
    const ITEM_WIDTH = 150;
    const ITEM_MARGIN = 15;
    const TOTAL_ITEM_WIDTH = ITEM_WIDTH + ITEM_MARGIN;
    const VISIBLE_ITEMS = Math.min(8, previousEventsData.length); // Limit to 8 items for performance

    // Use only a subset of images for smooth performance
    const limitedData = previousEventsData.slice(0, VISIBLE_ITEMS);
    const extendedData = [...limitedData, ...limitedData]; // Double for seamless loop

    useEffect(() => {
      const subscription = Dimensions.addEventListener(
        "change",
        ({ window }) => {
          setContainerWidth(window.width);
        }
      );
      return () => subscription?.remove();
    }, []);

    // Continuous infinite scroll with seamless looping
    useEffect(() => {
      if (isPaused) return;

      const startAnimation = () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }

        // For seamless infinite scroll, we animate from 0 to -TOTAL_ITEM_WIDTH * limitedData.length
        // This will scroll exactly one full set, then seamlessly continue with the duplicated set
        const animateToNext = () => {
          scrollX.setValue(0); // Start from beginning

          animationRef.current = Animated.timing(scrollX, {
            toValue: -TOTAL_ITEM_WIDTH * limitedData.length,
            duration: limitedData.length * 3750, // 3.75 seconds per item for smooth viewing
            useNativeDriver: true,
          });

          animationRef.current.start((result: { finished: boolean }) => {
            if (result.finished && !isPaused) {
              // Seamlessly restart the animation
              animateToNext();
            }
          });
        };

        animateToNext();
      };

      const timer = setTimeout(startAnimation, 100); // Small delay to ensure mount
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }, [scrollX, isPaused, limitedData.length]);

    const renderPreviousEvent = useCallback(
      (item: any, index: number) => (
        <Animated.View
          key={`${item.id}-${index}`}
          style={[
            styles.previousEventCard,
            {
              transform: [{ translateX: scrollX }],
            },
          ]}
        >
          <LazyImage
            source={item.image}
            style={styles.previousEventImage}
            resizeMode="cover"
            threshold={300} // Larger threshold for earlier loading
            priority={index < 4 ? "high" : "low"} // Prioritize first 4 images
            placeholder={
              <View style={styles.imagePlaceholder}>
                <View style={styles.shimmerContainer}>
                  <Animated.View style={styles.shimmer} />
                </View>
              </View>
            }
          />
          <Text style={styles.previousEventTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </Animated.View>
      ),
      [scrollX]
    );

    const handleTouchStart = useCallback(() => {
      setIsPaused(true);
    }, []);

    const handleTouchEnd = useCallback(() => {
      setTimeout(() => setIsPaused(false), 2000); // Resume after 2 seconds
    }, []);

    return (
      <View style={[styles.container, style]}>
        <View
          style={styles.scrollContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <View style={styles.animatedContainer}>
            {extendedData.map((item, index) =>
              renderPreviousEvent(item, index)
            )}
          </View>
        </View>

        {/* Pause indicator */}
        {isPaused && (
          <View style={styles.pauseIndicator}>
            <Text style={styles.pauseText}>⏸️ Paused</Text>
          </View>
        )}
      </View>
    );
  }
);

OptimizedPreviousEvents.displayName = "OptimizedPreviousEvents";

const styles = StyleSheet.create({
  container: {
    height: 200,
    overflow: "hidden",
  },
  scrollContainer: {
    height: 200,
    position: "relative",
  },
  animatedContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  previousEventCard: {
    width: 150,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(240, 210, 110, 0.2)",
    flexShrink: 0,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        }),
  },
  previousEventImage: {
    width: "100%",
    height: 120,
  },
  imagePlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  shimmerContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  shimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(240, 210, 110, 0.1)",
    opacity: 0.6,
  },
  previousEventTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  pauseIndicator: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  pauseText: {
    color: "#f0d26e",
    fontSize: 10,
    fontWeight: "600",
  },
});

export default OptimizedPreviousEvents;
