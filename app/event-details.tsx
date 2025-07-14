import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { useLocalSearchParams, router } from "expo-router";
import { eventsData, Event } from "./data/events";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = eventsData.find((e) => e.id === parseInt(id || "0"));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Evenimentul nu a fost găsit</Text>
      </View>
    );
  }

  const handleRegistration = () => {
    if (event.registrationUrl) {
      Linking.openURL(event.registrationUrl);
    } else {
      // Fallback - you can replace this with your actual registration logic
      Linking.openURL(
        "mailto:contact@crosulsperantei.ro?subject=Înregistrare " + event.title
      );
    }
  };

  const renderDifficultyPill = (difficulty: string, index: number) => (
    <View key={index} style={styles.difficultyPill}>
      <Text style={styles.difficultyText}>{difficulty}</Text>
    </View>
  );

  const renderPriceItem = (key: string, value: string) => (
    <View key={key} style={styles.priceRow}>
      <Text style={styles.priceLabel}>
        {key.charAt(0).toUpperCase() + key.slice(1)}:
      </Text>
      <Text style={styles.priceValue}>{value}</Text>
    </View>
  );

  const renderDistanceItem = (distance: string, index: number) => (
    <Text key={index} style={styles.distanceItem}>
      • {distance}
    </Text>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          <Image source={event.image} style={styles.headerImage} />
          <View style={styles.imageOverlay}></View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Basic Info */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.basicInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📅</Text>
                <Text style={styles.infoText}>
                  {event.date} • {event.startTime}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>{event.location}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Despre Eveniment</Text>
            <Text style={styles.description}>{event.detailedDescription}</Text>
          </View>

          {/* Difficulty Levels */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nivel de Dificultate</Text>
            <View style={styles.difficultyContainer}>
              {event.difficulty.map(renderDifficultyPill)}
            </View>
          </View>

          {/* Distances */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distanțe Disponibile</Text>
            <View style={styles.distancesContainer}>
              {event.distances.map(renderDistanceItem)}
            </View>
          </View>

          {/* Prices */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prețuri Înregistrare</Text>
            <View style={styles.pricesContainer}>
              {Object.entries(event.prices).map(([key, value]) =>
                renderPriceItem(key, value)
              )}
            </View>
          </View>

          {/* Registration Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegistration}
          >
            <Text style={styles.registerButtonText}>ÎNREGISTREAZĂ-TE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3e25", // Back to solid dark green
  },
  scrollView: {
    flex: 1,
  },
  headerImageContainer: {
    position: "relative",
    height: 250,
    width: "100%",
    marginTop: Platform.OS === "web" ? 0 : 0, // Test: ensure no margin
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
    paddingTop: Platform.OS === "web" ? 0 : 20, // Test: no top padding on web
  },
  titleSection: {
    marginBottom: 25,
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
    lineHeight: 32,
  },
  basicInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  infoText: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  description: {
    color: "#E8E8E8",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "justify",
  },
  difficultyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  difficultyPill: {
    backgroundColor: "rgba(240, 210, 110, 0.15)", // Updated to new yellow
    borderColor: "rgba(240, 210, 110, 0.3)",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  difficultyText: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 14,
    fontWeight: "500",
  },
  distancesContainer: {
    gap: 6,
  },
  distanceItem: {
    color: "#D0D0D0",
    fontSize: 15,
    lineHeight: 22,
  },
  pricesContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  priceLabel: {
    color: "#B8B8B8",
    fontSize: 15,
    fontWeight: "500",
  },
  priceValue: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 15,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#B8860B", // Dark mustard yellow
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 10,
    alignSelf: Platform.OS === "web" ? "flex-end" : "stretch", // Right align on web, full width on mobile
    maxWidth: Platform.OS === "web" ? 250 : "100%", // Limit width on web
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 4,
        }),
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 18,
    textAlign: "center",
    marginTop: 100,
  },
});
