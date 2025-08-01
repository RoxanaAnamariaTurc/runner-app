import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "user_language_preference";

export class LanguageStorage {
  /**
   * Save language preference to persistent storage
   */
  static async saveLanguage(language: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        // Use localStorage for web
        if (typeof localStorage !== "undefined") {
          localStorage.setItem(LANGUAGE_KEY, language);
        }
      } else {
        // Use AsyncStorage for React Native
        await AsyncStorage.setItem(LANGUAGE_KEY, language);
      }
    } catch (error) {
      console.warn("Failed to save language preference:", error);
    }
  }

  /**
   * Load language preference from persistent storage
   */
  static async loadLanguage(): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        // Use localStorage for web
        if (typeof localStorage !== "undefined") {
          return localStorage.getItem(LANGUAGE_KEY);
        }
        return null;
      } else {
        // Use AsyncStorage for React Native
        return await AsyncStorage.getItem(LANGUAGE_KEY);
      }
    } catch (error) {
      console.warn("Failed to load language preference:", error);
      return null;
    }
  }

  /**
   * Remove language preference from storage
   */
  static async clearLanguage(): Promise<void> {
    try {
      if (Platform.OS === "web") {
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem(LANGUAGE_KEY);
        }
      } else {
        await AsyncStorage.removeItem(LANGUAGE_KEY);
      }
    } catch (error) {
      console.warn("Failed to clear language preference:", error);
    }
  }

  /**
   * Check if a language preference exists
   */
  static async hasLanguagePreference(): Promise<boolean> {
    const language = await this.loadLanguage();
    return language !== null && language !== undefined;
  }
}
