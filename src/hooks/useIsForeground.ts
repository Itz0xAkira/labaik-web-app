import { list } from "firebase/storage";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

export const useIsForeground = () => {
  const [currentState, setCurrentState] = useState(AppState.currentState);
  const [isForeground, setIsForeground] = useState(true);

  const onAppStateChange = (nextAppState) => {
    setIsForeground(nextAppState === "active");
    setCurrentState(AppState.currentState);
  };

  useEffect(() => {
    const listener = AppState.addEventListener("change", onAppStateChange);
    return () => listener.remove();
  }, []);

  return {
    isForeground,
  };
};
