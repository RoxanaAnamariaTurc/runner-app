import { Platform } from "react-native";

/**
 * Utility to set document title for web accessibility
 * This ensures the page title is properly set for screen readers and SEO
 */
export const setDocumentTitle = (title: string) => {
  if (Platform.OS === "web" && typeof document !== "undefined") {
    document.title = title;
  }
};

/**
 * Set meta description for SEO
 */
export const setMetaDescription = (description: string) => {
  if (Platform.OS === "web" && typeof document !== "undefined") {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }
};

/**
 * Set meta keywords for SEO
 */
export const setMetaKeywords = (keywords: string) => {
  if (Platform.OS === "web" && typeof document !== "undefined") {
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", keywords);
    }
  }
};

/**
 * Set page language for accessibility
 */
export const setPageLanguage = (lang: "ro" | "en") => {
  if (Platform.OS === "web" && typeof document !== "undefined") {
    document.documentElement.lang = lang;

    // Update meta tags for current language
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute("content", lang === "ro" ? "ro_RO" : "en_US");
    }
  }
};

/**
 * Initialize page accessibility settings
 */
export const initializePageAccessibility = (language: "ro" | "en" = "ro") => {
  if (Platform.OS === "web") {
    const titles = {
      ro: "Crosul Speranței Blaj - Editia a VIII-a | Eveniment Caritabil de Alergare",
      en: "Hope Cross Blaj - 8th Edition | Charity Running Event",
    };

    const descriptions = {
      ro: "Alătură-te celei de-a VIII-a ediții a Crosului Speranței, un eveniment care combină sportul cu spiritul caritabil. Evenimentul principal al anului - crosul care adună comunitatea pentru o cauză nobilă.",
      en: "Join the 8th edition of Hope Cross, an event that combines sports with charitable spirit. The main event of the year - the cross that brings the community together for a noble cause.",
    };

    setDocumentTitle(titles[language]);
    setMetaDescription(descriptions[language]);
    setPageLanguage(language);
  }
};
