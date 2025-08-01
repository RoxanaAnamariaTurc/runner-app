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
import { useTranslation } from "react-i18next";
import { getDisplayDate } from "./utils/dateUtils";

const { width } = Dimensions.get("window");
const isWeb = Platform.OS === "web";
const isLargeScreen = width > 768;

export default function Events() {
  const { t, i18n } = useTranslation();

  // Helper function to get translated event data
  const getTranslatedEventData = (event: Event) => {
    const eventKey = `event${event.id}`;
    const baseTranslatedDate = t(`${eventKey}Date`, {
      defaultValue: event.date,
    });

    return {
      title: t(`${eventKey}Title`, { defaultValue: event.title }),
      date: getDisplayDate(
        {
          date: baseTranslatedDate,
          title: event.title,
          startTime: event.startTime,
        },
        i18n.language === "ro" ? "ro" : "en"
      ),
      location: t(`${eventKey}Location`, { defaultValue: event.location }),
      description: t(`${eventKey}Description`, {
        defaultValue: event.description,
      }),
    };
  };

  const renderEventCard = (event: Event, index: number) => {
    const translatedEvent = getTranslatedEventData(event);

    return (
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
          <Text style={styles.eventTitle}>{translatedEvent.title}</Text>
          <Text style={styles.eventDate}>{translatedEvent.date}</Text>
          <Text style={styles.eventLocation}>{translatedEvent.location}</Text>
          <Text style={styles.eventDescription}>
            {translatedEvent.description}
          </Text>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => router.push(`/event-details?id=${event.id}`)}
          >
            <Text style={styles.detailsButtonText}>{t("details")}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>{t("eventsPageTitle")}</Text>

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
    backgroundColor: "#1f3e25",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    color: "#f0d26e",
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: Platform.OS === "web" ? 10 : 20,
    letterSpacing: 0.5,
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
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
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
    padding: 20,
  },
  eventTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  eventDate: {
    color: "#f0d26e",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },
  eventLocation: {
    color: "#B8B8B8",
    fontSize: 14,
    marginBottom: 8,
  },
  eventDescription: {
    color: "#D0D0D0",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  detailsButton: {
    backgroundColor: "#f0d26e",
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
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
    color: "#1f3e25",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
