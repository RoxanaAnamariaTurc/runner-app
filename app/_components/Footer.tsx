import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Footer() {
  const openInstagram = () => {
    Linking.openURL("https://instagram.com/crosul_sperantei_blaj");
  };

  const openFacebook = () => {
    Linking.openURL(
      "https://www.facebook.com/share/16xCqfyPao/?mibextid=wwXIfr"
    );
  };

  const openStrava = () => {
    Linking.openURL("https://strava.app.link/OCYF8VqYXUb");
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerContent}>
        <View style={styles.leftSection}>
          <Link href="/about" style={styles.footerLink}>
            Despre Noi
          </Link>
          <Text style={styles.contactTitle}>Contact</Text>
          <Text style={styles.contactInfo}>📞 +40 729 014 565</Text>
          <Text style={styles.contactInfo}>📧 deliaiorga@yahoo.com</Text>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.socialTitle}>Urmăriți-ne pe:</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={openFacebook}
            >
              <FontAwesome name="facebook" size={20} color="#f0d26e" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={openInstagram}
            >
              <FontAwesome name="instagram" size={20} color="#f0d26e" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} onPress={openStrava}>
              <Text style={styles.stravaIcon}>Strava</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyrightText}>© 2025 Crosul Speranței Blaj</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#1f3e25", // Back to solid dark green
    paddingVertical: 30,
    paddingHorizontal: 15,
    marginTop: 40,
    borderTopWidth: 1,
    borderTopColor: "rgba(240, 210, 110, 0.3)", // Updated to new yellow
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
    color: "#f0d26e", // Updated to new yellow color
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
    backgroundColor: "rgba(240, 210, 110, 0.1)", // Updated to new yellow background
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
