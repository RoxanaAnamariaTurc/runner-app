import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, router, usePathname } from "expo-router";
import logo from "../assets/images/logo1.png";
import { LoadingScreen, LanguageSwitcher } from "./_components";
import "./i18n/config";
import { useTranslation } from "react-i18next";
import { initializePageAccessibility } from "./utils/accessibility";
import PerformanceUtils from "./utils/performanceUtils";

const RootLayout = () => {
  const { t, ready } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [appReadyState, setAppReadyState] = useState({
    translations: false,
    dom: false,
    fonts: false,
    images: false,
    network: false,
  });

  // Check if all readiness conditions are met
  useEffect(() => {
    const allReady = Object.values(appReadyState).every(Boolean) && ready;

    // Debug logging in development
    if (__DEV__) {
      console.log("App Readiness State:", {
        ...appReadyState,
        translationsReady: ready,
        allReady,
      });
    }

    if (allReady) {
      // Initialize performance monitoring in production
      if (!__DEV__) {
        PerformanceUtils.startPerformanceMonitoring();
      }

      // Dispatch custom event to signal app readiness
      if (Platform.OS === "web" && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("app-ready"));
      }
      setIsLoading(false);
    }
  }, [appReadyState, ready]);

  useEffect(() => {
    const initializeApp = async () => {
      // Wait for translations to be ready first
      if (!ready) return;

      setAppReadyState((prev) => ({ ...prev, translations: true }));

      // Initialize page accessibility settings
      if (Platform.OS === "web") {
        await initializePageAccessibility(); // Will load from storage
      }

      try {
        if (Platform.OS === "web") {
          // Hide HTML loading screen immediately when React takes over
          if (typeof document !== "undefined") {
            const htmlLoadingScreen = document.getElementById("loading-screen");
            if (htmlLoadingScreen) {
              htmlLoadingScreen.style.opacity = "0";
              setTimeout(() => {
                htmlLoadingScreen.style.display = "none";
              }, 400);
            }
          }

          // Check DOM readiness
          const checkDOMReady = () => {
            if (typeof document !== "undefined") {
              if (document.readyState === "complete") {
                setAppReadyState((prev) => ({ ...prev, dom: true }));
              } else {
                window.addEventListener(
                  "load",
                  () => {
                    setAppReadyState((prev) => ({ ...prev, dom: true }));
                  },
                  { once: true }
                );
              }
            } else {
              setAppReadyState((prev) => ({ ...prev, dom: true }));
            }
          };

          // Check fonts readiness
          const checkFontsReady = () => {
            if (typeof window !== "undefined" && "fonts" in document) {
              document.fonts.ready
                .then(() =>
                  setAppReadyState((prev) => ({ ...prev, fonts: true }))
                )
                .catch(() =>
                  setAppReadyState((prev) => ({ ...prev, fonts: true }))
                );
            } else {
              setAppReadyState((prev) => ({ ...prev, fonts: true }));
            }
          };

          // Check critical images loading
          const checkImagesReady = () => {
            const criticalImages = [require("../assets/images/logo1.png")];

            Promise.allSettled(
              criticalImages.map(
                (imgSrc) =>
                  new Promise((resolve) => {
                    if (typeof window !== "undefined") {
                      const img = new window.Image();
                      img.onload = () => resolve(true);
                      img.onerror = () => resolve(true);
                      img.src = imgSrc;
                    } else {
                      resolve(true);
                    }
                  })
              )
            ).then(() => {
              setAppReadyState((prev) => ({ ...prev, images: true }));
            });
          };

          // Check network readiness (for production)
          const checkNetworkReady = () => {
            if (typeof window !== "undefined") {
              const isDev =
                window.location.hostname === "localhost" ||
                window.location.hostname === "127.0.0.1" ||
                window.location.hostname.includes("expo.dev");

              if (isDev) {
                // In development, mark as ready after short delay
                setTimeout(() => {
                  setAppReadyState((prev) => ({ ...prev, network: true }));
                }, 500);
              } else {
                // In production, check for app stability
                let stableCheckCount = 0;
                const requiredStableChecks = 3;

                const checkStability = () => {
                  try {
                    // Check if React has fully mounted and DOM is stable
                    const rootElement = document.getElementById("root");
                    const hasReactRoot =
                      rootElement && rootElement.children.length > 0;
                    const noLoadingElements = !document.querySelector(
                      '.loading-screen, [data-loading="true"]'
                    );

                    if (hasReactRoot && noLoadingElements) {
                      stableCheckCount++;
                      if (stableCheckCount >= requiredStableChecks) {
                        setAppReadyState((prev) => ({
                          ...prev,
                          network: true,
                        }));
                        return;
                      }
                    } else {
                      stableCheckCount = 0; // Reset if not stable
                    }

                    // Continue checking if not yet stable
                    setTimeout(checkStability, 300);
                  } catch (error) {
                    // If stability check fails, assume ready
                    setAppReadyState((prev) => ({ ...prev, network: true }));
                  }
                };

                // Start stability checking after initial delay
                setTimeout(checkStability, 500);

                // Failsafe: mark as ready after maximum wait time
                setTimeout(() => {
                  setAppReadyState((prev) => ({ ...prev, network: true }));
                }, 4000); // 4 second maximum wait
              }
            } else {
              setAppReadyState((prev) => ({ ...prev, network: true }));
            }
          };

          // Initialize all checks
          checkDOMReady();
          checkFontsReady();
          checkImagesReady();
          checkNetworkReady();
        } else {
          // On mobile, simpler readiness check
          setTimeout(() => {
            setAppReadyState({
              translations: true,
              dom: true,
              fonts: true,
              images: true,
              network: true,
            });
          }, 800);
        }
      } catch (error) {
        console.warn("Loading initialization error:", error);
        // Fallback: mark all as ready after delay
        setTimeout(() => {
          setAppReadyState({
            translations: true,
            dom: true,
            fonts: true,
            images: true,
            network: true,
          });
        }, 1000);
      }
    };

    initializeApp();
  }, [ready]);

  // Show loading screen while app initializes
  if (isLoading) {
    return <LoadingScreen loadingProgress={appReadyState} />;
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
          backgroundColor: "#0D0D0D",
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
