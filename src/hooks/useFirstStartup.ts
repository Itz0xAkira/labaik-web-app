import { STORAGE_KEY_FIRST_STARTUP } from "../config/storage.config";
import { useEffect, useState } from "react";

export const useFirstStartup = () => {
  const [isFirstStartup, setIsFirstStartup] = useState(true);

  const loadFirstStartup = async () => {
    try {
      const firstStartup = await localStorage.getItem(
        STORAGE_KEY_FIRST_STARTUP
      );
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
      await localStorage.setItem(
        STORAGE_KEY_FIRST_STARTUP,
        JSON.stringify(false)
      );
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
