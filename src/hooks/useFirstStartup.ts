import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { STORAGE_KEY_FIRST_STARTUP } from "../config/storage.config";
import { useEffect, useState } from "react";

export const useFirstStartup = () => {
  const { getItem, setItem } = useAsyncStorage(STORAGE_KEY_FIRST_STARTUP);
  const [isFirstStartup, setIsFirstStartup] = useState(true);

  const loadFirstStartup = async () => {
    try {
      const firstStartup = await getItem();
      if (firstStartup) {
        setIsFirstStartup(false);
      } else {
        console.log("useFirstStartup: loadFirstStartup: Nothing saved!");
      }
    } catch (err) {
      console.log("useFirstStartup: loadFirstStartup: Error:", err);
    }
  };

  const disableStartup = async () => {
    try {
      await setItem(JSON.stringify(false));
    } catch (err) {
      console.log("useI18n: updateLocale: Error:", err);
    }
  };

  useEffect(() => {
    loadFirstStartup();
  }, []);

  return {
    isFirstStartup,
    disableStartup,
  };
};
