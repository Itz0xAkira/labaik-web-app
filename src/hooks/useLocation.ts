import { useEffect, useState } from "react";
import * as Location from "expo-location";

type useLocationProps = {
  shouldUpdateLocationPeriodically?: boolean;
  shouldUpdateHeadingPeriodically?: boolean;
  updateLocationInterval?: number;
  updateHeadingInterval?: number;
};

export const useLocation = ({
  shouldUpdateHeadingPeriodically = false,
  shouldUpdateLocationPeriodically = false,
  updateLocationInterval = 800,
  updateHeadingInterval = 800,
}: useLocationProps) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  }>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const [currentHeading, setCurrentHeading] = useState<{
    offset?: number;
    accuracy?: number;
    magHeading: number;
    trueHeading: number;
  }>(null);

  const gotoLocationPermissionSettings = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionGranted(false);
      return false;
    }

    setPermissionGranted(true);
    return true;
  };

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setPermissionGranted(false);
      return false;
    }

    setPermissionGranted(true);
    return true;
  };

  const getLocation = async () => {
    try {
      const permissionGranted = requestLocationPermission();
      if (!permissionGranted) {
        alert("Failed to obtain your location!");
      }

      const foundLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
      const { longitude, latitude } = foundLocation.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    } catch (error) {
      console.log("useLocation Error:", error);
    }
  };

  const getHeading = async () => {
    try {
      const permissionGranted = requestLocationPermission();
      if (!permissionGranted) {
        alert("Failed to obtain your location!");
      }

      const heading = await Location.getHeadingAsync();
      setCurrentHeading(heading);
    } catch (error) {
      console.log("useLocation Error:", error);
    }
  };

  const getLastLocation = async () => {
    try {
      const permissionGranted = requestLocationPermission();
      if (!permissionGranted) {
        alert("Failed to obtain your location!");
      }

      const foundLocation = await Location.getLastKnownPositionAsync();
      const { longitude, latitude } = foundLocation.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
    } catch (error) {
      console.log("useLocation Error:", error);
    }
  };

  useEffect(() => {
    if (!currentLocation) {
      getLocation();
    }
  }, [currentLocation]);

  const setupWatchers = async () => {
    let locationUpdateTask: Location.LocationSubscription;
    let headingUpdateTask: Location.LocationSubscription;
    if (shouldUpdateHeadingPeriodically) {
      headingUpdateTask = await Location.watchHeadingAsync((heading) => {
        setCurrentHeading(heading);
      });
    }

    if (shouldUpdateLocationPeriodically) {
      locationUpdateTask = await Location.watchPositionAsync(
        {
          accuracy: Location.LocationAccuracy.Highest,
          mayShowUserSettingsDialog: true,
          timeInterval: updateLocationInterval,
        },
        (location) => {
          setCurrentLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });
          setCurrentHeading({
            offset: location.coords.accuracy,
            magHeading: location.coords.heading,
            trueHeading: location.coords.heading,
          });
        }
      );
    }

    return () => {
      if (shouldUpdateLocationPeriodically) {
        locationUpdateTask.remove();
      }
      if (shouldUpdateHeadingPeriodically) {
        headingUpdateTask.remove();
      }
    };
  };

  useEffect(() => {
    if (permissionGranted) {
      setupWatchers();
    }
  }, [permissionGranted]);

  return {
    currentLocation,
    currentHeading,
    requestLocationPermission,
    gotoLocationPermissionSettings,
    getLocation,
    getHeading,
    getLastLocation,
  };
};
