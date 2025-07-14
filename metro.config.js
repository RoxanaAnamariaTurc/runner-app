const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Enable web support and asset serving
config.resolver.platforms = ["web", "ios", "android"];

// Ensure proper asset handling for web
config.resolver.assetExts.push(
  // Add any additional asset extensions you need
  "xml"
);

// Web-specific asset handling
if (process.env.EXPO_PLATFORM === "web") {
  config.resolver.alias = {
    ...config.resolver.alias,
    "react-native$": "react-native-web",
  };
}

module.exports = config;
