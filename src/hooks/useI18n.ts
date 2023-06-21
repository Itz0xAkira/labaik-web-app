import { TranslationLocales, i18n } from "../config/translations.config";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { STORAGE_KEY_PREFERRED_LOCALE } from "../config/storage.config";
import { useEffect, useState } from "react";
import { I18nManager } from "react-native";

export const useI18n = () => {
  const { getItem, setItem } = useAsyncStorage(STORAGE_KEY_PREFERRED_LOCALE);
  const [isRTL, setIsRTL] = useState(false);
  const loadLocale = async () => {
    try {
      const locale = await getItem();
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
        await setItem(locale);
      } else {
        console.log("useI18n: updateLocale: Locale is invalid!");
      }
    } catch (err) {
      console.log("useI18n: updateLocale: Error:", err);
    }
  };

  useEffect(() => {
    if (i18n.locale === "ar" || i18n.locale === "ur") {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }

    loadLocale();
  }, [i18n.locale]);

  return {
    locale: i18n.locale,
    loadLocale,
    updateLocale,
  };
};
