import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

interface ImageWithErrorBoundaryProps {
  source: any;
  style?: any;
  placeholder?: React.ReactNode;
  onError?: (error: any) => void;
  retryCount?: number;
  fallbackText?: string;
}

/**
 * Image component with built-in error handling and retry functionality
 */
export const ImageWithErrorBoundary: React.FC<ImageWithErrorBoundaryProps> = ({
  source,
  style,
  placeholder,
  onError,
  retryCount = 2,
  fallbackText = "Image unavailable",
}) => {
  const [hasError, setHasError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = (error: any) => {
    console.warn("Image loading error:", error);

    if (attempts < retryCount) {
      // Retry loading
      setTimeout(() => {
        setAttempts((prev) => prev + 1);
        setHasError(false);
        setIsLoading(true);
      }, 1000 * (attempts + 1)); // Progressive delay
    } else {
      setHasError(true);
      setIsLoading(false);
    }

    if (onError) {
      onError(error);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setAttempts(0);
  };

  // Reset when source changes
  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    setAttempts(0);
  }, [source]);

  if (hasError) {
    return (
      <View style={[styles.errorContainer, style]}>
        {placeholder || (
          <>
            <Text style={styles.errorText}>{fallbackText}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <>
      {isLoading && placeholder && (
        <View style={[styles.placeholderContainer, style]}>{placeholder}</View>
      )}
      <Image
        source={source}
        style={[style, isLoading && { opacity: 0 }]}
        onLoad={handleLoad}
        onError={handleError}
        key={`${source}-${attempts}`} // Force re-render on retry
      />
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: theme.colors.background.secondary,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderStyle: "dashed",
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.muted,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  retryButton: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  retryText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.contrast,
    fontWeight: theme.typography.fontWeight.medium,
  },
  placeholderContainer: {
    position: "absolute",
    zIndex: 1,
  },
});

export default ImageWithErrorBoundary;
