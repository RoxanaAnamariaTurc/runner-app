import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error | undefined;
}

/**
 * Global Error Boundary for catching and handling React errors
 */
class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public override render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <View style={styles.container}>
          <View style={styles.errorCard}>
            <Text style={styles.title}>Oops! Something went wrong</Text>
            <Text style={styles.subtitle}>
              We're sorry for the inconvenience. Please try again.
            </Text>

            {__DEV__ && this.state.error && (
              <View style={styles.debugInfo}>
                <Text style={styles.debugTitle}>Debug Info:</Text>
                <Text style={styles.debugText}>{this.state.error.message}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.retryButton}
              onPress={this.handleRetry}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },
  errorCard: {
    backgroundColor: theme.colors.background.card,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    maxWidth: 400,
    width: "100%",
    alignItems: "center",
    ...theme.shadows.lg,
  },
  title: {
    fontSize: theme.typography.fontSize["2xl"],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.muted,
    textAlign: "center",
    marginBottom: theme.spacing.xl,
    lineHeight: theme.typography.lineHeight.relaxed,
  },
  debugInfo: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.base,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xl,
    width: "100%",
  },
  debugTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.status.warning,
    marginBottom: theme.spacing.sm,
  },
  debugText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.muted,
    fontFamily: "monospace",
  },
  retryButton: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minWidth: 120,
  },
  retryText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.contrast,
    textAlign: "center",
  },
});

export default ErrorBoundary;
