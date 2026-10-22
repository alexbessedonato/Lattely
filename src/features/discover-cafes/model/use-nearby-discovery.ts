"use client";

import { useEffect, useReducer, useRef } from "react";
import { mockCafes } from "@/features/discover-cafes/data/mock-cafes";
import { findNearbyCafes } from "@/features/discover-cafes/model/find-nearby-cafes";
import {
  initialNearbyDiscoveryState,
  nearbyDiscoveryReducer,
} from "@/features/discover-cafes/model/nearby-discovery-reducer";
import { requestBrowserLocation } from "@/features/discover-cafes/model/request-browser-location";

export function useNearbyDiscovery() {
  const [state, dispatch] = useReducer(
    nearbyDiscoveryReducer,
    initialNearbyDiscoveryState,
  );
  const pending = useRef(false);
  const cancelRequest = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      cancelRequest.current?.();
      pending.current = false;
    },
    [],
  );

  function cancelLocation() {
    cancelRequest.current?.();
    cancelRequest.current = null;
    pending.current = false;
  }

  function selectCenter(centerId: string) {
    cancelLocation();
    dispatch({ type: "center-selected", centerId });
  }

  function selectRadius(radiusMeters: number | null) {
    dispatch({ type: "radius-selected", radiusMeters });
  }

  function search() {
    cancelLocation();
    dispatch({ type: "search-submitted" });
  }

  function useMyLocation() {
    if (pending.current) return;
    pending.current = true;
    dispatch({ type: "location-started" });
    cancelRequest.current = requestBrowserLocation(
      navigator.geolocation,
      (outcome) => {
        pending.current = false;
        dispatch({ type: "location-resolved", outcome });
      },
    );
  }

  const cafes = findNearbyCafes({
    cafes: mockCafes,
    center: state.submitted.center,
    radiusMeters: state.submitted.radiusMeters,
  });

  return { state, cafes, selectCenter, selectRadius, search, useMyLocation };
}
