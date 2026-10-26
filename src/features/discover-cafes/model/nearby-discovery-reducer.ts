import { barcelonaConfig } from "../../../shared/config/barcelona.ts";
import { defaultSearchLocation } from "../data/search-locations.ts";
import type {
  NearbyDiscoveryAction,
  NearbyDiscoveryState,
} from "../types/nearby-discovery-state.ts";
import type { SearchLocation } from "../types/search-location.ts";

export const initialNearbyDiscoveryState: NearbyDiscoveryState = {
  draftLocation: defaultSearchLocation,
  draftRadiusMeters: barcelonaConfig.defaultRadiusMeters,
  submitted: {
    location: defaultSearchLocation,
    locationLabel: "Default location",
    radiusMeters: barcelonaConfig.defaultRadiusMeters,
  },
  userLocation: null,
  isLocating: false,
  outcome: null,
};

export function nearbyDiscoveryReducer(
  state: NearbyDiscoveryState,
  action: NearbyDiscoveryAction,
): NearbyDiscoveryState {
  switch (action.type) {
    case "center-selected":
      return {
        ...state,
        draftLocation: action.location,
        isLocating: false,
        outcome: null,
      };

    case "radius-selected":
      if (
        !barcelonaConfig.radiusOptions.some(
          (option) => option.meters === action.radiusMeters,
        )
      )
        return state;
      return { ...state, draftRadiusMeters: action.radiusMeters };

    case "location-started":
      return { ...state, isLocating: true, outcome: null };

    case "location-resolved": {
      if (!state.isLocating) return state;
      const { outcome } = action;
      const succeeded = outcome.status === "success";
      const location: SearchLocation = succeeded
        ? {
            id: "user-location",
            name: "Your location",
            center: outcome.center,
          }
        : defaultSearchLocation;
      return {
        ...state,
        isLocating: false,
        outcome,
        userLocation: succeeded ? location : state.userLocation,
        draftLocation: location,
        submitted: {
          location,
          locationLabel: succeeded ? "Current location" : "Fallback location",
          radiusMeters: state.draftRadiusMeters,
        },
      };
    }

    case "search-submitted": {
      const { draftLocation } = state;
      return {
        ...state,
        isLocating: false,
        outcome: null,
        submitted: {
          location: draftLocation,
          locationLabel:
            draftLocation.id === "user-location"
              ? "Current location"
              : draftLocation.id === "catalunya"
                ? "Selected location"
                : "Approximate barri center",
          radiusMeters: state.draftRadiusMeters,
        },
      };
    }
  }
}
