import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { router } from "expo-router";
import Footer from "./_components/Footer";
import LazyImage from "./_components/LazyImage";
import { eventsData, Event } from "./data/events";
import { LinearGradient } from "expo-linear-gradient";
import { previousEventsData } from "./data/previousEvents";
import { useTranslation } from "react-i18next";
import { imagePerformance } from "./utils/imagePerformance";

import sponsorsData from "./data/sponsorData";

export default function Home() {
  const { t } = useTranslation();
  const featuredEvents = eventsData.filter((event) => event.featured);

  // Initialize performance tracking for previous events images
  React.useEffect(() => {
    imagePerformance.startTracking(previousEventsData.length);
  }, []);

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
    };
  };
  const arrowAnimation = useRef(new Animated.Value(0)).current;
  const scrollAnimation = useRef(new Animated.Value(0)).current;
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(arrowAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(arrowAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: Platform.OS !== "web",
        }),
      ]).start(() => animate());
    };
    animate();

    const scrollAnimate = () => {
      scrollAnimation.setValue(0);
      Animated.loop(
        Animated.timing(scrollAnimation, {
          toValue: 1,
          duration: 60000, // 60 seconds - slower animation for 26 images
          useNativeDriver: Platform.OS !== "web",
        }),
        { iterations: -1 }
      ).start();
    };
    scrollAnimate();
  }, [arrowAnimation, scrollAnimation]);

  const arrowTranslateY = arrowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  // Calculate responsive card width
  const getCardWidth = () => {
    const { width } = screenData;
    if (Platform.OS === "web") {
      if (width < 480) return Math.min(width * 0.85, 300); // Mobile: 85% of screen width, max 300px
      if (width < 768) return Math.min(width * 0.7, 320); // Small tablet: 70% of screen width, max 320px
      if (width < 1024) return 300; // Medium tablet: fixed 300px
      return 280; // Desktop: original 280px
    }
    return 280; // Native mobile: keep original size
  };

  const renderFeaturedEvent = (item: Event) => {
    const cardWidth = getCardWidth();
    const translatedEvent = getTranslatedEventData(item);

    return (
      <View key={item.id} style={[styles.carouselCard, { width: cardWidth }]}>
        <Image source={item.image} style={styles.carouselImage} />
        <View style={styles.carouselContent}>
          <View style={styles.carouselInfo}>
            <Text style={styles.carouselTitle}>{translatedEvent.title}</Text>
            <Text style={styles.carouselDate}>{translatedEvent.date}</Text>
            <Text style={styles.carouselLocation}>
              {translatedEvent.location}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => router.push(`/event-details?id=${item.id}`)}
            >
              <Text style={styles.detailsButtonText}>{t("details")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderPreviousEvents = () => {
    const doubleEvents = [...previousEventsData, ...previousEventsData];
    const cardWidth = 165;
    const totalWidth = previousEventsData.length * cardWidth;

    const translateX = scrollAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -totalWidth],
    });

    return doubleEvents.map((event, index) => (
      <Animated.View
        key={`${event.id}-${Math.floor(index / previousEventsData.length)}-${
          index % previousEventsData.length
        }`}
        style={[
          styles.previousEventCard,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [
              {
                scale: scrollAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 1.02, 1],
                }),
              },
            ],
          }}
        >
          <LazyImage
            source={event.image}
            style={styles.previousEventImage}
            resizeMode="cover"
            threshold={150} // Start loading when 150px from viewport
            placeholder={
              <View
                style={[styles.previousEventImage, styles.imagePlaceholder]}
              >
                {/* Custom placeholder that matches the image dimensions */}
              </View>
            }
          />
        </Animated.View>
        <Text style={styles.previousEventTitle}>{event.title}</Text>
      </Animated.View>
    ));
  };

  const renderSponsors = () => {
    return sponsorsData.map((sponsor, index) => (
      <View key={index} style={styles.sponsorCard}>
        <Text style={styles.sponsorText}>{sponsor}</Text>
      </View>
    ));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainScrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>{t("mainTitle")}</Text>
            <View style={styles.titleDivider} />
            <Text style={styles.subtitle}>{t("subtitle")}</Text>
          </View>

          {/* Featured Events Section */}
          <View style={styles.featuredSectionContainer}>
            <Text style={styles.featuredSectionTitle}>
              {t("featuredEventsTitle")}
            </Text>
            <Text style={styles.featuredSectionNote}>
              {t("featuredEventsNote")}
            </Text>
          </View>

          {/* Featured Events Horizontal Scroll */}
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.scrollContainer,
                Platform.OS === "web" &&
                  screenData.width < 768 &&
                  styles.scrollContainerSmall,
              ]}
              centerContent={featuredEvents.length === 1} // Center content if only one item
            >
              {featuredEvents.map(renderFeaturedEvent)}
            </ScrollView>
          </View>

          {/* All Events Button - Now inside the scrollable area */}
          <TouchableOpacity
            style={styles.allEventsButton}
            onPress={() => router.push("/events")}
          >
            <Text style={styles.allEventsText}>{t("allEvents")}</Text>
            <Animated.Text
              style={[
                styles.arrowIcon,
                { transform: [{ translateY: arrowTranslateY }] },
              ]}
            >
              ↓
            </Animated.Text>
          </TouchableOpacity>

          <View style={styles.imperfectCardContainer}>
            <LinearGradient
              colors={[
                "rgba(31,62,37,0.9)",
                "rgba(240,210,110,0.1)",
                "rgba(31,62,37,0.9)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.previousEventsCard}
            >
              <Text style={styles.previousEventsTitle}>
                {t("previousEventsTitle")}
              </Text>
              <View style={styles.previousEventsScrollView}>
                <View style={styles.previousEventsContainer}>
                  {renderPreviousEvents()}
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Sponsors Section */}
          <View style={styles.sponsorsSection}>
            <Text style={styles.sponsorsTitle}>{t("partnersTitle")}</Text>
            <View style={styles.sponsorsGrid}>{renderSponsors()}</View>
          </View>
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
  mainScrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "web" ? 0 : 20,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  titleDivider: {
    width: 120,
    height: 2,
    backgroundColor: "rgba(231, 76, 60, 0.3)",
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    color: "#f0d26e",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  carouselContainer: {
    marginTop: 20,
    marginBottom: 30,
    height: 350,
    width: "100%",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    minWidth: "100%",
    justifyContent: "center",
  },
  scrollContainerSmall: {
    paddingHorizontal: 5,
    minWidth: "100%",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  carouselCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    marginHorizontal: 7.5,
    flexShrink: 0,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }),
  },
  carouselImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  carouselContent: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  carouselInfo: {
    flex: 1,
  },
  carouselTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  carouselDate: {
    color: "#f0d26e",
    fontSize: 14,
    marginBottom: 3,
  },
  carouselLocation: {
    color: "#B8B8B8",
    fontSize: 12,
  },
  buttonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  detailsButton: {
    backgroundColor: "#CD853F",
    borderWidth: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  allEventsButton: {
    backgroundColor: "rgba(240, 210, 110, 0.05)",
    borderWidth: 0,
    paddingVertical: 18,
    paddingHorizontal: 28,
    marginVertical: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(240, 210, 110, 0.4)",
  },
  allEventsText: {
    color: "#f0d26e",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 8,
  },
  arrowIcon: {
    color: "#f0d26e",
    fontSize: 18,
    fontWeight: "600",
  },
  imperfectCardContainer: {
    width: "100%",
    marginVertical: 30,
    position: "relative",
  },
  topDiagonalBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#F4D03F",
    transform: [{ skewY: "2deg" }],
    zIndex: 1,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 1px 4px rgba(244, 208, 63, 0.2)" }
      : {
          shadowColor: "#F4D03F",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }),
  },
  bottomDiagonalBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#F4D03F",
    transform: [{ skewY: "-2deg" }],
    zIndex: 1,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px -1px 4px rgba(244, 208, 63, 0.2)" }
      : {
          shadowColor: "#F4D03F",
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }),
  },

  previousEventsCard: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  previousEventsTitle: {
    color: "#f0d26e",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 1,
  },
  previousEventsScrollView: {
    height: 200,
    overflow: "hidden",
  },
  previousEventsContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  previousEventCard: {
    width: 150,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(240, 210, 110, 0.2)",
    flexShrink: 0,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        }),
  },
  previousEventImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  previousEventTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    padding: 10,
  },
  // Sponsors Styles
  sponsorsSection: {
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
  sponsorsTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: 1,
  },
  sponsorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  sponsorCard: {
    backgroundColor: "rgba(240, 210, 110, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(240, 210, 110, 0.3)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    minWidth: 80,
    alignItems: "center",
  },
  sponsorText: {
    color: "#f0d26e",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  featuredSectionContainer: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
  },
  featuredSectionTitle: {
    color: "#f0d26e",
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  featuredSectionNote: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    maxWidth: 300,
  },
  imagePlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
