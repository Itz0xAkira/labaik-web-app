import { useEffect, useState } from "react";
import { Gyroscope } from "expo-sensors";
import * as Location from "expo-location";

export const useSensor = ({ mode }: { mode: "slow" | "fast" }) => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(60);

  const _subscribe = () => {
    if (mode == "fast") {
      _fast();
    } else {
      _slow();
    }
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();

    return () => _unsubscribe();
  }, []);

  return {
    x,
    y,
    z,
  };
};
