import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";

import openLink from "../utils/openLink";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <View style={styles.leftSection}>
          <Link href="/about" style={styles.footerLink}>
            {t("about")}
          </Link>
          <Text style={styles.contactTitle}>{t("contact")}</Text>
          <Text style={styles.contactInfo}>📞 +40 729 014 565</Text>
          <Text style={styles.contactInfo}>📧 deliaiorga@yahoo.com</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.socialTitle}>{t("followUs")}</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                openLink(
                  "https://www.facebook.com/share/16xCqfyPao/?mibextid=wwXIfr"
                )
              }
            >
              <FontAwesome name="facebook" size={20} color="#f0d26e" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openLink("https://strava.app.link/OCYF8VqYXUb")}
            >
              <Text style={styles.stravaIcon}>Strava</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyrightText}>{t("copyright")}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#1f3e25",
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "rgba(240, 210, 110, 0.3)",
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    flex: 1,
    paddingRight: 20,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  footerLink: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  contactTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  contactInfo: {
    color: "#B8B8B8",
    fontSize: 14,
    marginBottom: 5,
  },
  socialTitle: {
    color: "#f0d26e",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 15,
  },
  socialButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(240, 210, 110, 0.1)",
  },
  stravaIcon: {
    width: 50,
    height: 20,
    tintColor: "#f0d26e",
    color: "#f0d26e",
    textAlign: "center",
  },
  copyrightText: {
    color: "#B8B8B8",
    fontSize: 12,
    textAlign: "right",
  },
});
