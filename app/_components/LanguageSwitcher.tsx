import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ro" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggleLanguage}>
      <View style={styles.flagContainer}>
        <Text style={styles.flagText}>
          {i18n.language === "en" ? "🇺🇸" : "🇷🇴"}
        </Text>
        <Text style={styles.languageText}>
          {i18n.language === "en" ? "EN" : "RO"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(240, 210, 110, 0.1)",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(240, 210, 110, 0.3)",
    marginRight: 10,
  },
  flagContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagText: {
    fontSize: 16,
  },
  languageText: {
    color: "#f0d26e",
    fontSize: 12,
    fontWeight: "600",
  },
});
