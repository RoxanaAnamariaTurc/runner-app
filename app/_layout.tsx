import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, router, usePathname } from "expo-router";
import logo from "../assets/images/logo-crosul.png";
import LoadingScreen from "./_components/LoadingScreen";

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      // Add any initialization logic here
      // For now, just show loading for 2.5 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    };

    initializeApp();
  }, []);

  // Show loading screen while app initializes
  if (isLoading) {
    return <LoadingScreen />;
  }
  const LogoHeader = () => {
    const pathname = usePathname();

    const handleLogoPress = () => {
      if (pathname !== "/") {
        router.push("/");
      }
    };

    return (
      <TouchableOpacity onPress={handleLogoPress}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1f3e25", // Updated to match the new darker green color
        },
        headerTintColor: "#eee",
        headerRight: () => <LogoHeader />,
        headerShadowVisible: false,
        ...(Platform.OS === "web" && {
          animation: "slide_from_right",
          animationTypeForReplace: "push",
        }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerBackVisible: false,
          gestureEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen name="about" options={{ title: "Despre Noi" }} />
      <Stack.Screen
        name="events"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="event-details"
        options={{
          title: "",
          ...(Platform.OS === "web" && {
            animation: "slide_from_right",
            animationTypeForReplace: "push",
          }),
        }}
      />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  footer: {
    flex: 1,
  },
  text: {
    color: "#eee",
  },
  logo: {
    height: 60,
    width: 120,
    alignSelf: "center",
  },
});
