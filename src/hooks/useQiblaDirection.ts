import { useEffect, useMemo, useState } from "react";
import { Bounds, ZoneBounds } from "@/data/zoneBounds";

export const MECCA_LATITUDE = 21.422547464888435;
export const MECCA_LONGITUDE = 39.826183447419844;

export const useQiblaDirection = ({
  lat: latitude = 0,
  lng: longitude = 0,
  heading = 0,
}) => {
  const qiblaDegrees = useMemo(() => {
    // const dLon = Math.abs(longitude - MECCA_LONGITUDE);
    // const y = Math.sin(dLon) * Math.cos(latitude);
    // const x =
    //   Math.cos(MECCA_LATITUDE) * Math.sin(latitude) -
    //   Math.sin(MECCA_LONGITUDE) * Math.cos(latitude) * Math.cos(dLon);

    // let brng = Math.atan2(y, x);
    // brng = brng * (180 / Math.PI);
    // brng = (brng + 360) % 360;
    // brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

    // return brng;
    const PI = Math.PI;
    let latk = (21.4225 * PI) / 180.0;
    let longk = (39.8264 * PI) / 180.0;
    let phi = (latitude * PI) / 180.0;
    let lambda = (longitude * PI) / 180.0;
    let var_qiblad =
      (180.0 / PI) *
      Math.atan2(
        Math.sin(longk - lambda),
        Math.cos(phi) * Math.tan(latk) -
          Math.sin(phi) * Math.cos(longk - lambda)
      );

    return var_qiblad;
  }, [latitude, longitude, heading]);
  return { qiblaDegrees };
};

export const calculateNorthByTrueHeading = (trueHeading: number) => {
  return (360 - trueHeading + 5) % 360;
};

type isLocationInBoundProps = {
  location: { lat: number; lng: number };
  zone: ZoneBounds;
};

export const isLocationInBound = ({
  location,
  zone,
}: isLocationInBoundProps) => {
  const minLat = Math.min(...zone.map((point) => point[0]));
  const maxLat = Math.max(...zone.map((point) => point[0]));
  const minLng = Math.min(...zone.map((point) => point[1]));
  const maxLng = Math.max(...zone.map((point) => point[1]));
  return (
    location.lat <= maxLat &&
    location.lat >= minLat &&
    location.lng <= maxLng &&
    location.lng >= minLng
  );
};
