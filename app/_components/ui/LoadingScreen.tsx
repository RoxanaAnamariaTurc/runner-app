import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingScreenProps {
  loadingProgress?: any;
}

export default function LoadingScreen({ loadingProgress }: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RUNNING APP</Text>
      <Text style={styles.subtitle}>Community Edition</Text>
      <ActivityIndicator size="large" color="#4ECDC4" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "center",
    alignItems: "center",
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
    color: "#4ECDC4",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 50,
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    marginTop: 15,
    fontWeight: "500",
  },
});
