import React, { memo, useMemo, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Event } from "../../data/events";
import { useTranslation } from "react-i18next";
import LazyImage from "../ui/LazyImage";
import PlaceholderImage from "../ui/PlaceholderImage";
import { getDisplayDate } from "../../utils/dateUtils";

interface OptimizedEventCardProps {
  event: Event;
  cardWidth: number;
  onPress: (eventId: number) => void;
  style?: any;
}

const OptimizedEventCard = memo(
  ({ event, cardWidth, onPress, style }: OptimizedEventCardProps) => {
    const { t, i18n } = useTranslation();

    // Memoize translated event data
    const translatedEvent = useMemo(() => {
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
      };
    }, [
      event.id,
      event.title,
      event.date,
      event.location,
      event.startTime,
      t,
      i18n.language,
    ]);

    // Memoize press handler
    const handlePress = useCallback(() => {
      onPress(event.id);
    }, [event.id, onPress]);

    return (
      <View style={[styles.carouselCard, { width: cardWidth }, style]}>
        {event.image ? (
          <LazyImage
            source={event.image}
            style={styles.carouselImage}
            threshold={100}
            placeholder={
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>Loading...</Text>
              </View>
            }
          />
        ) : (
          <PlaceholderImage style={styles.carouselImage} />
        )}
        <View style={styles.carouselContent}>
          <View style={styles.carouselInfo}>
            <Text style={styles.carouselTitle} numberOfLines={2}>
              {translatedEvent.title}
            </Text>
            <Text style={styles.carouselDate} numberOfLines={1}>
              {translatedEvent.date}
            </Text>
            <Text style={styles.carouselLocation} numberOfLines={1}>
              {translatedEvent.location}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={handlePress}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsButtonText}>{t("details")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

OptimizedEventCard.displayName = "OptimizedEventCard";

const styles = StyleSheet.create({
  carouselCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    overflow: "hidden",
    marginHorizontal: 7.5,
    flexShrink: 0,
  },
  carouselImage: {
    width: "100%",
    height: 140,
  },
  imagePlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
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
    color: "#4ECDC4",
    fontSize: 14,
    marginBottom: 3,
  },
  carouselLocation: {
    color: "#B8B8B8",
    fontSize: 12,
  },
  detailsButton: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#0D0D0D",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default OptimizedEventCard;
