"use client";

import { useEffect, useRef, useState } from "react";
import { mockCafes } from "@/features/discover-cafes/data/mock-cafes";
import { findNearbyCafes } from "@/features/discover-cafes/model/find-nearby-cafes";
import { requestBrowserLocation } from "@/features/discover-cafes/model/request-browser-location";
import type { LocationOutcome } from "@/features/discover-cafes/types/location-outcome";
import { barcelonaConfig } from "@/shared/config/barcelona";

export function useNearbyDiscovery() {

  const [outcome, setOutcome] = useState<LocationOutcome | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const pending = useRef(false);
  const cancelRequest = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      cancelRequest.current?.();
      pending.current = false;
    },
    [],
  );

  function useMyLocation() {
    if (pending.current) return;
    pending.current = true;
    setIsLocating(true);
    cancelRequest.current = requestBrowserLocation(
      navigator.geolocation,
      (result) => {
        pending.current = false;
        setOutcome(result);
        setIsLocating(false);
      },
    );
  }

  const center =
    outcome?.status === "success"
      ? outcome.center
      : barcelonaConfig.fallbackCoordinates;

  const centerName =
    outcome?.status === "success"
      ? "your location"
      : barcelonaConfig.fallbackName;

  const locationLabel =
    outcome === null
      ? "Default location"
      : outcome.status === "success"
        ? "Current location"
        : "Fallback location";

  const cafes = findNearbyCafes({ cafes: mockCafes, center });

  return {
    cafes,
    centerName,
    locationLabel,
    outcome,
    isLocating,
    useMyLocation,
  };
}
