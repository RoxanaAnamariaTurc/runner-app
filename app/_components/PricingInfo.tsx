import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import {
  getCurrentPricingPeriod,
  getNextPricingPeriod,
  getDaysUntilPriceChange,
} from "../utils/pricing";

interface PricingInfoProps {
  currentDate?: Date;
}

export default function PricingInfo({
  currentDate = new Date(),
}: PricingInfoProps) {
  const { t } = useTranslation();
  const currentPeriod = getCurrentPricingPeriod(currentDate);
  const nextPeriod = getNextPricingPeriod(currentDate);
  const daysUntilChange = getDaysUntilPriceChange(currentDate);

  if (!currentPeriod) {
    return (
      <View style={styles.container}>
        <View style={styles.closedBanner}>
          <Text style={styles.closedText}>
            {t("registrationClosed", "Înregistrările sunt închise")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.currentPeriodBanner}>
        <Text style={styles.currentPeriodText}>
          {t("currentPeriod", "Perioada curentă")}: {currentPeriod.name}
        </Text>
      </View>

      {nextPeriod && daysUntilChange && daysUntilChange > 0 && (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>
            ⏰ {t("priceIncreaseIn", "Preţurile cresc în")} {daysUntilChange}{" "}
            {t("days", "zile")}
          </Text>
          <Text style={styles.nextPeriodText}>
            {t("nextPeriod", "Următoarea perioadă")}: {nextPeriod.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  currentPeriodBanner: {
    backgroundColor: "rgba(240, 210, 110, 0.15)",
    borderLeftWidth: 4,
    borderLeftColor: "#f0d26e",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  currentPeriodText: {
    color: "#f0d26e",
    fontSize: 16,
    fontWeight: "600",
  },
  countdownContainer: {
    backgroundColor: "rgba(255, 165, 0, 0.1)",
    borderLeftWidth: 4,
    borderLeftColor: "#ff6b35",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  countdownText: {
    color: "#ff6b35",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  nextPeriodText: {
    color: "#ff6b35",
    fontSize: 12,
    opacity: 0.8,
  },
  closedBanner: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    borderLeftWidth: 4,
    borderLeftColor: "#ff4757",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  closedText: {
    color: "#ff4757",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
