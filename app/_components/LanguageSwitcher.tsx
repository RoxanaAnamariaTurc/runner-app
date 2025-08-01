import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { usePersistentLanguage } from "../hooks/usePersistentLanguage";

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, isLanguageLoaded } =
    usePersistentLanguage();

  const toggleLanguage = async () => {
    const newLanguage = currentLanguage === "en" ? "ro" : "en";
    await changeLanguage(newLanguage);
  };

  // Don't render until language is loaded to prevent flicker
  if (!isLanguageLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleLanguage}
      accessibilityRole="switch"
      accessibilityState={{ checked: currentLanguage === "ro" }}
      accessibilityLabel={`Switch language to ${
        currentLanguage === "en" ? "Romanian" : "English"
      }`}
      accessibilityHint="Changes the application language"
    >
      <View style={styles.toggleContainer}>
        {/* Toggle track */}
        <View style={styles.toggleTrack}>
          {/* Toggle thumb */}
          <View
            style={[
              styles.toggleThumb,
              currentLanguage === "ro" ? styles.thumbRight : styles.thumbLeft,
            ]}
          >
            <Text style={styles.activeFlag}>
              {currentLanguage === "en" ? "🇺🇸" : "🇷🇴"}
            </Text>
          </View>

          {/* Language labels */}
          <View style={styles.labelsContainer}>
            <Text
              style={[
                styles.languageLabel,
                currentLanguage === "en"
                  ? styles.activeLabel
                  : styles.inactiveLabel,
              ]}
            >
              EN
            </Text>
            <Text
              style={[
                styles.languageLabel,
                currentLanguage === "ro"
                  ? styles.activeLabel
                  : styles.inactiveLabel,
              ]}
            >
              RO
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  toggleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  toggleTrack: {
    width: 70,
    height: 32,
    backgroundColor: "rgba(240, 210, 110, 0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(240, 210, 110, 0.3)",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleThumb: {
    position: "absolute",
    width: 28,
    height: 28,
    backgroundColor: "rgba(240, 210, 110, 0.9)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 2,
  },
  thumbLeft: {
    left: 2,
  },
  thumbRight: {
    right: 2,
  },
  activeFlag: {
    fontSize: 14,
  },
  labelsContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    zIndex: 1,
  },
  languageLabel: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    width: 20,
  },
  activeLabel: {
    color: "rgba(0, 0, 0, 0.8)",
  },
  inactiveLabel: {
    color: "rgba(255, 255, 255, 0.7)",
  },
});
