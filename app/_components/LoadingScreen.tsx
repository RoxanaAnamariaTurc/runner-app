import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Spinning animation for the accent circle
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.backgroundGradient} />

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo container */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <Image
              source={require("../../assets/images/logo-crosul.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Spinning accent circle */}
          <Animated.View
            style={[
              styles.accentCircle,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>CROSUL SPERANȚEI</Text>
        <Text style={styles.subtitle}>BLAJ</Text>

        {/* Loading indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f0d26e" />
          <Text style={styles.loadingText}>Se încarcă...</Text>
        </View>
      </Animated.View>

      {/* Bottom decoration */}
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
