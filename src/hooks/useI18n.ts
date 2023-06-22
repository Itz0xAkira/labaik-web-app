import { TranslationLocales, i18n } from "../config/translations.config";
import { STORAGE_KEY_PREFERRED_LOCALE } from "../config/storage.config";
import { useEffect, useState } from "react";

export const useI18n = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const loadLocale = async () => {
    try {
      setIsLoading(true);
      const locale = await localStorage.getItem(STORAGE_KEY_PREFERRED_LOCALE);
      if (locale) {
        console.log("useI18n: loadLocale: Setting locale to:", locale);
        i18n.locale = locale;
      } else {
        console.log("useI18n: loadLocale: No Locale saved!");
      }
    } catch (err) {
      console.log("useI18n: loadLocale: Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocale = async (locale: TranslationLocales) => {
    try {
      i18n.locale = locale;
      if (locale) {
        await localStorage.setItem(STORAGE_KEY_PREFERRED_LOCALE, locale);
      } else {
        console.log("useI18n: updateLocale: Locale is invalid!");
      }
    } catch (err) {
      console.log("useI18n: updateLocale: Error:", err);
    }
  };

  useEffect(() => {
    loadLocale();
  }, []);

  return {
    locale: i18n.locale,
    loadLocale,
    updateLocale,
    isLoading,
  };
};
