import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, router, usePathname } from "expo-router";
import logo from "../assets/images/logo-crosul.png";
import LoadingScreen from "./_components/LoadingScreen";
import LanguageSwitcher from "./_components/LanguageSwitcher";
import "./i18n/config";
import { useTranslation } from "react-i18next";

const RootLayout = () => {
  const { t, ready } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      // Always wait for translations to be ready first
      if (!ready) return;

      try {
        if (Platform.OS === "web") {
          // More comprehensive asset loading for web
          await Promise.allSettled([
            // Preload critical assets
            new Promise((resolve) => {
              if (typeof window !== "undefined") {
                const img = new window.Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(true);
                img.src = require("../assets/images/logo-crosul.png");
              } else {
                resolve(true);
              }
            }),
            // Wait for DOM and all resources to be fully loaded
            new Promise((resolve) => {
              if (typeof document !== "undefined") {
                if (document.readyState === "complete") {
                  resolve(true);
                } else {
                  // Wait for all resources including images, stylesheets, etc.
                  window.addEventListener("load", () => resolve(true), {
                    once: true,
                  });
                }
              } else {
                resolve(true);
              }
            }),
            // Preload additional critical assets
            new Promise((resolve) => {
              if (typeof window !== "undefined") {
                // Wait for fonts and other critical resources
                if ("fonts" in document) {
                  document.fonts.ready
                    .then(() => resolve(true))
                    .catch(() => resolve(true));
                } else {
                  resolve(true);
                }
              } else {
                resolve(true);
              }
            }),
          ]);

          // Hide HTML loading screen smoothly
          if (typeof document !== "undefined") {
            const htmlLoadingScreen = document.getElementById("loading-screen");
            if (htmlLoadingScreen) {
              htmlLoadingScreen.style.opacity = "0";
              setTimeout(() => {
                htmlLoadingScreen.style.display = "none";
              }, 400);
            }
          }

          // Enhanced deployment detection and timing
          const isDev =
            typeof window !== "undefined" &&
            (window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1" ||
              window.location.hostname.includes("expo.dev"));

          // More generous timing for Netlify and production deployments
          const waitTime = isDev ? 800 : 2000; // Increased production wait time

          // Additional check for Netlify deployment readiness
          if (!isDev && typeof window !== "undefined") {
            // Wait for any lazy-loaded chunks or dynamic imports
            await new Promise((resolve) => {
              const checkReadiness = () => {
                // Check if there are any pending network requests
                if (window.performance && window.performance.getEntriesByType) {
                  const resources = window.performance.getEntriesByType(
                    "resource"
                  ) as PerformanceResourceTiming[];
                  const stillLoading = resources.some(
                    (resource) =>
                      resource.responseEnd === 0 &&
                      Date.now() - resource.startTime < 5000 // Still loading if started less than 5s ago
                  );

                  if (!stillLoading) {
                    resolve(true);
                  } else {
                    setTimeout(checkReadiness, 200);
                  }
                } else {
                  resolve(true);
                }
              };

              // Start checking after a base delay
              setTimeout(checkReadiness, 500);

              // Maximum wait time failsafe
              setTimeout(() => resolve(true), waitTime);
            });
          } else {
            await new Promise((resolve) => setTimeout(resolve, waitTime));
          }
        } else {
          // Mobile - simpler loading
          await new Promise((resolve) => setTimeout(resolve, 1200));
        }
      } catch (error) {
        console.warn("Loading initialization error:", error);
        // Fallback delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Dispatch custom event to signal app readiness
      if (Platform.OS === "web" && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("app-ready"));
      }

      setIsLoading(false);
    };

    initializeApp();
  }, [ready]);

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
      <View style={styles.headerRight}>
        <LanguageSwitcher />
        <TouchableOpacity onPress={handleLogoPress}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1f3e25",
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
      <Stack.Screen name="about" options={{ title: t("about") }} />
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
});
