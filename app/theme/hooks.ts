import { StyleSheet } from "react-native";
import { theme, type Theme } from "./index";

/**
 * Custom hook for accessing theme values and creating themed styles
 */
export const useTheme = () => {
  return theme;
};

/**
 * Helper function to create styles with theme integration
 */
export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (theme: Theme) => T
) => {
  return (themeInstance: Theme) =>
    StyleSheet.create(styleFactory(themeInstance));
};

/**
 * Helper function for responsive text styles
 */
export const getTextStyle = (
  size: keyof typeof theme.typography.fontSize = "base",
  weight: keyof typeof theme.typography.fontWeight = "normal",
  color: string = theme.colors.text.primary
) => ({
  fontSize: theme.typography.fontSize[size],
  fontWeight: theme.typography.fontWeight[weight],
  color,
  fontFamily: theme.typography.fontFamily.regular,
});

/**
 * Helper function for consistent button styles
 */
export const getButtonStyle = (
  variant: "primary" | "secondary" | "outline" = "primary",
  size: "sm" | "base" | "lg" = "base"
) => {
  const baseStyle = {
    height: theme.layout.button.height[size],
    paddingHorizontal: theme.layout.button.padding[size],
    borderRadius: theme.borderRadius.md,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  };

  switch (variant) {
    case "primary":
      return {
        ...baseStyle,
        backgroundColor: theme.colors.primary.main,
        borderWidth: 0,
      };
    case "secondary":
      return {
        ...baseStyle,
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
      };
    case "outline":
      return {
        ...baseStyle,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: theme.colors.primary.main,
      };
    default:
      return baseStyle;
  }
};

/**
 * Helper function for consistent card styles
 */
export const getCardStyle = (elevated = true) => ({
  backgroundColor: theme.colors.background.card,
  padding: theme.layout.card.padding,
  borderRadius: theme.layout.card.borderRadius,
  borderWidth: 1,
  borderColor: theme.colors.border.light,
  ...(elevated ? theme.shadows.base : theme.shadows.none),
});
