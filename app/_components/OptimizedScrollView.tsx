import React, { memo, useCallback, useMemo } from "react";
import { ScrollView, Dimensions, Platform } from "react-native";

interface OptimizedScrollViewProps {
  children: React.ReactNode;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  contentContainerStyle?: any;
  style?: any;
  centerContent?: boolean;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
}

const OptimizedScrollView = memo(
  ({
    children,
    horizontal = false,
    showsHorizontalScrollIndicator = false,
    showsVerticalScrollIndicator = false,
    contentContainerStyle,
    style,
    centerContent = false,
    onScroll,
    scrollEventThrottle = 16,
    ...props
  }: OptimizedScrollViewProps) => {
    const { width } = Dimensions.get("window");

    // Optimize scroll props based on platform
    const scrollProps = useMemo(() => {
      const baseProps = {
        horizontal,
        showsHorizontalScrollIndicator,
        showsVerticalScrollIndicator,
        scrollEventThrottle,
        removeClippedSubviews: Platform.OS !== "web", // Only on native
        ...props,
      };

      if (Platform.OS === "web") {
        // Web-specific optimizations
        return {
          ...baseProps,
          keyboardShouldPersistTaps: "handled" as const,
        };
      }

      return baseProps;
    }, [
      horizontal,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      scrollEventThrottle,
      props,
    ]);

    // Optimize content container style
    const optimizedContentContainerStyle = useMemo(() => {
      const baseStyle = contentContainerStyle || {};

      if (centerContent && horizontal) {
        return [
          baseStyle,
          Platform.OS === "web" &&
            width < 768 && {
              paddingHorizontal: 5,
            },
        ];
      }

      return baseStyle;
    }, [contentContainerStyle, centerContent, horizontal, width]);

    // Throttled scroll handler
    const handleScroll = useCallback(
      (event: any) => {
        if (onScroll) {
          onScroll(event);
        }
      },
      [onScroll]
    );

    return (
      <ScrollView
        {...scrollProps}
        style={style}
        contentContainerStyle={optimizedContentContainerStyle}
        onScroll={handleScroll}
      >
        {children}
      </ScrollView>
    );
  }
);

OptimizedScrollView.displayName = "OptimizedScrollView";

export default OptimizedScrollView;
