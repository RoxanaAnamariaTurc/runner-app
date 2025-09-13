/**
 * RunHope App Theme Configuration
 * Centralized design system for consistent UI/UX
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    main: "#f0d26e", // Golden yellow
    light: "#f4dc8a",
    dark: "#d4b94d",
    contrast: "#1f3e25", // Forest green for contrast
  },

  // Background Colors
  background: {
    primary: "#1f3e25", // Forest green
    secondary: "#2a4f30",
    tertiary: "#365540",
    dark: "#0D0D0D", // Deep black
    light: "#f8f9fa",
    card: "rgba(240, 210, 110, 0.1)", // Semi-transparent golden
  },

  // Text Colors
  text: {
    primary: "#ffffff",
    secondary: "#f0d26e",
    muted: "#a8b2a8",
    dark: "#2c3e2c",
    accent: "#f0d26e",
  },

  // Status Colors
  status: {
    success: "#28a745",
    warning: "#ffc107",
    error: "#dc3545",
    info: "#17a2b8",
  },

  // Utility Colors
  border: {
    light: "rgba(240, 210, 110, 0.2)",
    medium: "rgba(240, 210, 110, 0.4)",
    dark: "rgba(31, 62, 37, 0.8)",
  },

  // Overlay Colors
  overlay: {
    dark: "rgba(0, 0, 0, 0.6)",
    light: "rgba(255, 255, 255, 0.9)",
    primary: "rgba(31, 62, 37, 0.8)",
  },
} as const;

export const typography = {
  // Font Families
  fontFamily: {
    regular: "System",
    medium: "System",
    bold: "System",
    light: "System",
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },

  // Font Weights
  fontWeight: {
    light: "300" as const,
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  // Base spacing unit (4px)
  unit: 4,

  // Spacing scale
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
  "4xl": 64,
  "5xl": 96,

  // Component-specific spacing
  component: {
    cardPadding: 16,
    screenPadding: 20,
    sectionGap: 24,
    itemGap: 12,
  },
} as const;

export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadows = {
  // Shadow elevations for depth
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.overlay.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: colors.overlay.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.overlay.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.overlay.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

export const layout = {
  // Screen dimensions helpers
  screenPadding: spacing.component.screenPadding,
  maxContentWidth: 1200,

  // Component sizes
  button: {
    height: {
      sm: 32,
      base: 44,
      lg: 56,
    },
    padding: {
      sm: spacing.sm,
      base: spacing.base,
      lg: spacing.lg,
    },
  },

  card: {
    padding: spacing.component.cardPadding,
    borderRadius: borderRadius.md,
  },

  input: {
    height: 44,
    padding: spacing.base,
    borderRadius: borderRadius.sm,
  },
} as const;

// Theme object combining all design tokens
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  layout,
} as const;

export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeSpacing = typeof spacing;
