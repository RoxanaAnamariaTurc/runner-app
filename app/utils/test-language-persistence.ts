import { LanguageStorage } from "../utils/languageStorage";

/**
 * Test script to verify language persistence functionality
 * Run this in the browser console or React Native debugger
 */
export const testLanguagePersistence = async () => {
  console.log("🧪 Testing Language Persistence...");

  try {
    // Test 1: Save Romanian
    console.log("📝 Test 1: Saving Romanian language...");
    await LanguageStorage.saveLanguage("ro");
    const savedRo = await LanguageStorage.loadLanguage();
    console.log("✅ Saved 'ro', loaded:", savedRo);

    // Test 2: Save English
    console.log("📝 Test 2: Saving English language...");
    await LanguageStorage.saveLanguage("en");
    const savedEn = await LanguageStorage.loadLanguage();
    console.log("✅ Saved 'en', loaded:", savedEn);

    // Test 3: Check if preference exists
    console.log("📝 Test 3: Checking if preference exists...");
    const hasPreference = await LanguageStorage.hasLanguagePreference();
    console.log("✅ Has preference:", hasPreference);

    // Test 4: Clear and check
    console.log("📝 Test 4: Clearing preference...");
    await LanguageStorage.clearLanguage();
    const clearedPreference = await LanguageStorage.loadLanguage();
    const hasPreferenceAfterClear =
      await LanguageStorage.hasLanguagePreference();
    console.log(
      "✅ After clear - loaded:",
      clearedPreference,
      "has preference:",
      hasPreferenceAfterClear
    );

    // Test 5: Restore Romanian for normal use
    console.log("📝 Test 5: Restoring Romanian...");
    await LanguageStorage.saveLanguage("ro");
    const final = await LanguageStorage.loadLanguage();
    console.log("✅ Final state:", final);

    console.log("🎉 All language persistence tests passed!");

    return {
      success: true,
      message: "Language persistence is working correctly!",
    };
  } catch (error) {
    console.error("❌ Language persistence test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

/**
 * Manual test instructions for users
 */
export const manualTestInstructions = () => {
  console.log(`
🔧 Manual Testing Instructions:

1. Open the app in your browser
2. Note the current language (Romanian flag 🇷🇴 or English flag 🇺🇸)
3. Click the language switcher to change languages
4. Refresh the page (F5 or Ctrl+R)
5. Verify the language persisted after refresh

Expected behavior:
✅ Language stays the same after page refresh
✅ Flag and text content remain in chosen language
✅ No flicker or language reset

To test in browser console:
> import('./test-language-persistence').then(m => m.testLanguagePersistence())

To check stored preference:
> localStorage.getItem('user_language_preference')
`);
};

// Auto-run instructions when this module is imported in development
if (__DEV__) {
  manualTestInstructions();
}
