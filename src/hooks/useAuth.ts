import { AuthContext } from "../context/auth/authContext";
import { useContext, useEffect, useState } from "react";
import { SECURED_STORAGE_KEY_PASSPORT } from "../config/storage.config";

export const useAuth = () => {
  const [passport, setPassport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserPassport = async () => {
    try {
      setIsLoading(true);
      const passport = await localStorage.getItemAsync(
        SECURED_STORAGE_KEY_PASSPORT
      );
      if (passport) {
        setPassport(passport);
        return passport;
      } else {
        console.log("useAuth: getUserPassport: Nothing saved!");
      }
      return "";
    } catch (err) {
      console.log("useAuth: getUserPassport: Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserPassport = async (passport: string) => {
    try {
      await localStorage.setItemAsync(SECURED_STORAGE_KEY_PASSPORT, passport);
      getUserPassport();
    } catch (err) {
      console.log("useAuth: setUserPassport: Error:", err);
    }
  };

  useEffect(() => {
    getUserPassport();
  }, []);

  return {
    passport,
    isLoading,
    getUserPassport,
    setUserPassport,
  };
};
