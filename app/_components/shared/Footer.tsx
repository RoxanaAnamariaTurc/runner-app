import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import openLink from "../../utils/openLink";

export default function Footer() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <View style={styles.mainRow}>
          <View style={styles.contactInfo}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>{t("Email")}:</Text>
              <TouchableOpacity
                onPress={() => openLink("mailto:contact@runningapp.com")}
              >
                <Text style={styles.contactValue}>contact@runningapp.com</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>{t("Phone")}:</Text>
              <TouchableOpacity onPress={() => openLink("tel:+1234567890")}>
                <Text style={styles.contactValue}>+123 456 7890</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.navigationLinks}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => router.push("/about")}
            >
              <Text style={styles.navText}>{t("About")}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.socialLinks}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openLink("#")}
            >
              <Text style={styles.socialText}>{t("Facebook")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openLink("#")}
            >
              <Text style={styles.socialText}>{t("Instagram")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0D0D0D",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#4ECDC4",
  },
  footerContent: {
    width: "100%",
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 20,
  },
  contactInfo: {
    flex: 1,
    minWidth: 200,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
    gap: 20,
    flexWrap: "wrap",
  },
  contactLabel: {
    color: "#ffffff",
    fontSize: 14,
  },
  contactValue: {
    color: "#4ECDC4",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  navigationLinks: {
    justifyContent: "center",
    alignItems: "center",
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  navText: {
    color: "#4ECDC4",
    fontSize: 14,
    fontWeight: "500",
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: 10,
    flexWrap: "wrap",
  },
  socialButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    borderWidth: 1,
    borderColor: "#4ECDC4",
  },
  socialText: {
    color: "#4ECDC4",
    fontSize: 12,
    fontWeight: "500",
  },
});
