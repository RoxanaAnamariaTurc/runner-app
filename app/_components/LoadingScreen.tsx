import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";

export default function LoadingScreen() {
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    // Start animations only if component is still mounted
    if (isMounted) {
      // Slightly staggered animation start for smoother experience
      setTimeout(() => {
        if (isMounted) {
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 800, // Slightly longer for smoother fade
              useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
              toValue: 1,
              tension: 50, // Reduced tension for smoother spring
              friction: 8,
              useNativeDriver: true,
            }),
          ]).start();

          // Spinning animation for the accent circle
          Animated.loop(
            Animated.timing(spinValue, {
              toValue: 1,
              duration: 3000, // Slower rotation for less distraction
              useNativeDriver: true,
            })
          ).start();
        }
      }, 100); // Small delay to ensure smooth mounting
    }

    return () => {
      isMounted = false;
    };
  }, [fadeAnim, scaleAnim, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient} />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require("../../assets/images/logo-crosul.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Animated.View
            style={[
              styles.accentCircle,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
        </View>
        <Text style={styles.title}>{t("mainTitle")}</Text>
        <Text style={styles.subtitle}>BLAJ</Text>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f0d26e" />
          <Text style={styles.loadingText}>{t("loading")}</Text>
        </View>
      </Animated.View>
      <View style={styles.bottomDecoration}>
        <View style={styles.decorationLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3e25",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1f3e25",
    opacity: 0.9,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    position: "relative",
    marginBottom: 40,
  },
  logoBackground: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(240, 210, 110, 0.1)",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(240, 210, 110, 0.3)",
  },
  logo: {
    width: 80,
    height: 80,
  },
  accentCircle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: "#f0d26e",
    borderRightColor: "#f0d26e",
    top: -10,
    left: -10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f0d26e",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 50,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    marginTop: 15,
    fontWeight: "500",
  },
  bottomDecoration: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  decorationLine: {
    width: 60,
    height: 3,
    backgroundColor: "#f0d26e",
    borderRadius: 2,
  },
});
