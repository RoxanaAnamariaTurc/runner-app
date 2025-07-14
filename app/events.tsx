import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import Footer from "./_components/Footer";
import { eventsData, Event } from "./data/events";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isLargeScreen = width > 768;

export default function Events() {
  const renderEventCard = (event: Event, index: number) => (
    <TouchableOpacity
      key={event.id}
      style={[
        styles.eventCard,
        isWeb && isLargeScreen && styles.webEventCard,
        isWeb &&
          isLargeScreen &&
          index % 3 !== 2 &&
          styles.webEventCardWithMargin,
      ]}
    >
      <Image source={event.image} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => router.push(`/event-details?id=${event.id}`)}
        >
          <Text style={styles.detailsButtonText}>DETALII</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Evenimente</Text>

        <View
          style={[
            styles.eventsContainer,
            isWeb && isLargeScreen && styles.webEventsContainer,
          ]}
        >
          {eventsData.map((event, index) => renderEventCard(event, index))}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3e25", // Back to solid dark green
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 32,
    fontWeight: "600", // Slightly less bold for modern look
    textAlign: "center",
    marginVertical: Platform.OS === "web" ? 10 : 20, // Test: less margin on web
    letterSpacing: 0.5, // Add letter spacing for modern feel
  },
  eventsContainer: {
    paddingBottom: 20,
  },
  webEventsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  eventCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)", // Softer background
    borderRadius: 16, // More modern rounded corners
    marginBottom: 20, // Increased spacing
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)", // Softer border
    overflow: "hidden",
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }),
  },
  webEventCard: {
    width: "32%",
    minWidth: 280,
  },
  webEventCardWithMargin: {
    marginRight: "2%",
  },
  eventImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  eventContent: {
    padding: 20, // Increased padding for modern feel
  },
  eventTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600", // Slightly less bold
    marginBottom: 8,
    letterSpacing: 0.3, // Add letter spacing
  },
  eventDate: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },
  eventLocation: {
    color: "#B8B8B8", // Softer gray
    fontSize: 14,
    marginBottom: 8,
  },
  eventDescription: {
    color: "#D0D0D0", // Softer light gray
    fontSize: 14,
    lineHeight: 22, // Increased line height for readability
    marginBottom: 16, // Increased margin
  },
  detailsButton: {
    backgroundColor: "#f0d26e", // Updated to new yellow color
    borderWidth: 0,
    paddingVertical: 10, // Slightly more padding
    paddingHorizontal: 18,
    borderRadius: 8, // More modern rounded corners
    alignSelf: "flex-end",
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }),
  },
  detailsButtonText: {
    color: "#1f3e25", // Dark green text for better contrast on yellow background
    fontSize: 12,
    fontWeight: "600", // Slightly less bold
    textAlign: "center",
    letterSpacing: 0.5, // Add letter spacing
  },
});
