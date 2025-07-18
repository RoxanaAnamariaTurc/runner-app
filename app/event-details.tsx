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
import { getCurrentPrices } from "./utils/pricing";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import PricingInfo from "./_components/PricingInfo";

export default function EventDetails() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = eventsData.find((e) => e.id === parseInt(id || "0"));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t("eventNotFound")}</Text>
      </View>
    );
  }

  const eventPrices = event.hasDynamicPricing
    ? getCurrentPrices()
    : event.prices;

  // Helper function to get translated event data
  const getTranslatedEventData = (event: Event) => {
    const eventKey = `event${event.id}`;
    return {
      title: t(`${eventKey}Title`, { defaultValue: event.title }),
      date: t(`${eventKey}Date`, { defaultValue: event.date }),
      location: t(`${eventKey}Location`, { defaultValue: event.location }),
      description: t(`${eventKey}Description`, {
        defaultValue: event.description,
      }),
      detailedDescription: t(`${eventKey}DetailedDescription`, {
        defaultValue: event.detailedDescription,
      }),
    };
  };

  const translatedEvent = getTranslatedEventData(event);

  // Helper function to translate difficulty levels
  const translateDifficulty = (difficulty: string) => {
    // Try to translate using the exact key first, then fallback to original
    return t(difficulty, { defaultValue: difficulty });
  };

  // Helper function to translate price labels
  const translatePriceLabel = (key: string) => {
    // Try to translate using the exact key first, then fallback to original
    return t(key, { defaultValue: key });
  };

  const handleRegistration = () => {
    if (event.registrationUrl) {
      Linking.openURL(event.registrationUrl);
    }
  };

  const renderDifficultyPill = (difficulty: string, index: number) => (
    <View key={index} style={styles.difficultyPill}>
      <Text style={styles.difficultyText}>
        {translateDifficulty(difficulty)}
      </Text>
    </View>
  );

  const renderPriceItem = (key: string, value: string) => (
    <View key={key} style={styles.priceRow}>
      <Text style={styles.priceLabel}>{translatePriceLabel(key)}:</Text>
      <Text style={styles.priceValue}>{t(value, { defaultValue: value })}</Text>
    </View>
  );

  const renderDistanceItem = (distance: string, index: number) => (
    <Text key={index} style={styles.distanceItem}>
      • {t(distance, { defaultValue: distance })}
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
            <Text style={styles.title}>{translatedEvent.title}</Text>
            <View style={styles.basicInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📅</Text>
                <Text style={styles.infoText}>
                  {translatedEvent.date} • {event.startTime}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoIcon}>📍</Text>
                <Text style={styles.infoText}>{translatedEvent.location}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("aboutEvent")}</Text>
            <Text style={styles.description}>
              {translatedEvent.detailedDescription}
            </Text>
          </View>

          {/* Difficulty Levels */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("difficultyLevel")}</Text>
            <View style={styles.difficultyContainer}>
              {event.difficulty.map(renderDifficultyPill)}
            </View>
          </View>

          {/* Distances */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("availableDistances")}</Text>
            <View style={styles.distancesContainer}>
              {event.distances.map(renderDistanceItem)}
            </View>
          </View>

          {/* Prices */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t("registrationPrices")}</Text>

            {/* Show dynamic pricing info for main event */}
            {event.hasDynamicPricing && <PricingInfo />}

            <View style={styles.pricesContainer}>
              {Object.entries(eventPrices)
                .filter(([key]) => key !== "period")
                .map(([key, value]) => renderPriceItem(key, value))}
            </View>
          </View>

          {/* Registration Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegistration}
          >
            <Text style={styles.registerButtonText}>
              {t("register").toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3e25",
  },
  scrollView: {
    flex: 1,
  },
  headerImageContainer: {
    position: "relative",
    height: 250,
    width: "100%",
    marginTop: Platform.OS === "web" ? 0 : 0,
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
    paddingTop: Platform.OS === "web" ? 0 : 20,
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
    color: "#f0d26e",
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: "#f0d26e",
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
    backgroundColor: "rgba(240, 210, 110, 0.15)",
    borderColor: "rgba(240, 210, 110, 0.3)",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  difficultyText: {
    color: "#f0d26e",
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
    color: "#f0d26e",
    fontSize: 15,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#B8860B",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 10,
    alignSelf: Platform.OS === "web" ? "flex-end" : "stretch",
    maxWidth: Platform.OS === "web" ? 250 : "100%",
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
