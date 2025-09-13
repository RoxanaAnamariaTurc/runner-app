import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { router } from "expo-router";
import { Footer, OptimizedEventCard, OptimizedScrollView } from "./_components";
import { eventsData, Event } from "./data/events";
import { useTranslation } from "react-i18next";
import { usePerformanceMetrics } from "./hooks/usePerformanceMetrics";

export default function Home() {
  const { t } = useTranslation();
  const { measureInteraction } = usePerformanceMetrics();

  // Memoize featured events to avoid recalculation
  const featuredEvents = useMemo(
    () => eventsData.filter((event) => event.featured),
    []
  );

  const arrowAnimation = useRef(new Animated.Value(0)).current;
  const scrollAnimation = useRef(new Animated.Value(0)).current;
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  // Animation interpolations
  const arrowTranslateY = arrowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

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

  // Calculate responsive card width - memoized
  const getCardWidth = useCallback(() => {
    const { width } = screenData;
    if (Platform.OS === "web") {
      if (width < 480) return Math.min(width * 0.85, 300); // Mobile: 85% of screen width, max 300px
      if (width < 768) return Math.min(width * 0.7, 320); // Small tablet: 70% of screen width, max 320px
      if (width < 1024) return 300; // Medium tablet: fixed 300px
      return 280; // Desktop: original 280px
    }
    return 280; // Native mobile: keep original size
  }, [screenData]);

  // Optimized event card press handler
  const handleEventPress = useCallback(
    (eventId: number) => {
      measureInteraction(() => {
        router.push(`/event-details?id=${eventId}`);
      });
    },
    [measureInteraction]
  );

  // Optimized all events button press
  const handleAllEventsPress = useCallback(() => {
    measureInteraction(() => {
      router.push("/events");
    });
  }, [measureInteraction]);

  const renderFeaturedEvent = useCallback(
    (item: Event) => {
      const cardWidth = getCardWidth();

      return (
        <OptimizedEventCard
          key={item.id}
          event={item}
          cardWidth={cardWidth}
          onPress={handleEventPress}
        />
      );
    },
    [getCardWidth, handleEventPress]
  );

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
            <Text style={styles.featuredSectionTitle}>Featured Events</Text>
            <Text style={styles.featuredSectionNote}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore.
            </Text>
          </View>

          {/* Featured Events Horizontal Scroll */}
          <View style={styles.carouselContainer}>
            <OptimizedScrollView
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
            </OptimizedScrollView>
          </View>

          {/* All Events Button - Now inside the scrollable area */}
          <TouchableOpacity
            style={styles.allEventsButton}
            onPress={handleAllEventsPress}
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
        </View>

        <Footer />

        {/* Performance Monitor removed for production */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D", // Deep black background
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
    backgroundColor: "rgba(78, 205, 196, 0.6)", // Turquoise
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    color: "#4ECDC4", // Teal/cyan color
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
    color: "#4ECDC4", // Turquoise
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
    backgroundColor: "#4ECDC4", // Turquoise
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
    backgroundColor: "rgba(78, 205, 196, 0.1)", // Turquoise with transparency
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
    borderBottomColor: "rgba(78, 205, 196, 0.4)",
  },
  allEventsText: {
    color: "#4ECDC4", // Turquoise
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginRight: 8,
  },
  arrowIcon: {
    color: "#4ECDC4", // Turquoise
    fontSize: 18,
    fontWeight: "600",
  },
  aboutButton: {
    backgroundColor: "rgba(78, 205, 196, 0.1)", // Turquoise with transparency
    borderWidth: 1,
    borderColor: "#4ECDC4",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 8,
  },
  aboutButtonText: {
    color: "#4ECDC4", // Turquoise
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
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
    backgroundColor: "#4ECDC4", // Teal/cyan color
    transform: [{ skewY: "2deg" }],
    zIndex: 1,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 1px 4px rgba(78, 205, 196, 0.3)" }
      : {
          shadowColor: "#4ECDC4",
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
    backgroundColor: "#4ECDC4", // Teal/cyan color
    transform: [{ skewY: "-2deg" }],
    zIndex: 1,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px -1px 4px rgba(78, 205, 196, 0.3)" }
      : {
          shadowColor: "#4ECDC4",
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }),
  },

  featuredSectionContainer: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
  },
  featuredSectionTitle: {
    color: "#4ECDC4", // Teal/cyan color
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
