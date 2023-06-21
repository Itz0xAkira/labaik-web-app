import { TranslationLocales, i18n } from "../config/translations.config";
import { STORAGE_KEY_PREFERRED_LOCALE } from "../config/storage.config";
import { useEffect, useState } from "react";

export const useI18n = () => {
  const [isRTL, setIsRTL] = useState(false);
  const loadLocale = async () => {
    try {
      const locale = await localStorage.getItem(STORAGE_KEY_PREFERRED_LOCALE);
      if (locale) {
        console.log("useI18n: loadLocale: Setting locale to:", locale);
        i18n.locale = locale;
      } else {
        console.log("useI18n: loadLocale: No Locale saved!");
      }
    } catch (err) {
      console.log("useI18n: loadLocale: Error:", err);
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

  return {
    locale: i18n.locale,
    loadLocale,
    updateLocale,
  };
};
