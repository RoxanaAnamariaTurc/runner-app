import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageStorage } from "../utils/languageStorage";
import { initializePageAccessibility } from "../utils/accessibility";

export const usePersistentLanguage = () => {
  const { i18n } = useTranslation();
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  useEffect(() => {
    const loadLanguagePreference = async () => {
      try {
        const savedLanguage = await LanguageStorage.loadLanguage();

        if (savedLanguage && savedLanguage !== i18n.language) {
          // Load saved language if different from current
          await i18n.changeLanguage(savedLanguage);
          await initializePageAccessibility(savedLanguage as "ro" | "en");
        } else if (!savedLanguage) {
          // Save current language if none saved
          await LanguageStorage.saveLanguage(i18n.language);
          await initializePageAccessibility(i18n.language as "ro" | "en");
        }

        setIsLanguageLoaded(true);
      } catch (error) {
        console.warn("Failed to load language preference:", error);
        setIsLanguageLoaded(true);
      }
    };

    loadLanguagePreference();
  }, [i18n]);

  const changeLanguage = async (newLanguage: "ro" | "en") => {
    try {
      await i18n.changeLanguage(newLanguage);
      await LanguageStorage.saveLanguage(newLanguage);
      await initializePageAccessibility(newLanguage);
    } catch (error) {
      console.warn("Failed to change and save language:", error);
    }
  };

  return {
    currentLanguage: i18n.language as "ro" | "en",
    isLanguageLoaded,
    changeLanguage,
  };
};
