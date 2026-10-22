import { barcelonaConfig } from "../../../shared/config/barcelona.ts";
import { barcelonaBarris } from "../data/barcelona-barris.ts";
import type {
  NearbyDiscoveryAction,
  NearbyDiscoveryState,
} from "../types/nearby-discovery-state.ts";

export const initialNearbyDiscoveryState: NearbyDiscoveryState = {
  draftCenterId: "catalunya",
  draftRadiusMeters: barcelonaConfig.defaultRadiusMeters,
  submitted: {
    center: barcelonaConfig.fallbackCoordinates,
    centerName: barcelonaConfig.fallbackName,
    locationLabel: "Default location",
    radiusMeters: barcelonaConfig.defaultRadiusMeters,
  },
  userCoordinates: null,
  isLocating: false,
  outcome: null,
};

export function nearbyDiscoveryReducer(
  state: NearbyDiscoveryState,
  action: NearbyDiscoveryAction,
): NearbyDiscoveryState {

  switch (action.type) {
    // Handle center selection
    case "center-selected":
      if (
        action.centerId !== "catalunya" &&
        !(action.centerId === "user-location" && state.userCoordinates) &&
        !barcelonaBarris.some((barri) => barri.id === action.centerId)
      )
        return state;
      return {
        ...state,
        draftCenterId: action.centerId,
        isLocating: false,
        outcome: null,
      };

    // Handle radius selection
    case "radius-selected":
      if (
        !barcelonaConfig.radiusOptions.some(
          (option) => option.meters === action.radiusMeters,
        )
      )
        return state;
      return { ...state, draftRadiusMeters: action.radiusMeters };

    // Handle location start
    case "location-started":
      return { ...state, isLocating: true, outcome: null };

    // Handle location resolved
    case "location-resolved": {
      if (!state.isLocating) return state;
      if (action.outcome.status === "fallback") {
        return {
          ...state,
          isLocating: false,
          outcome: action.outcome,
          draftCenterId: "catalunya",
          submitted: {
            center: barcelonaConfig.fallbackCoordinates,
            centerName: barcelonaConfig.fallbackName,
            locationLabel: "Fallback location",
            radiusMeters: state.draftRadiusMeters,
          },
        };
      }
      return {
        ...state,
        isLocating: false,
        outcome: action.outcome,
        userCoordinates: action.outcome.center,
        draftCenterId: "user-location",
        submitted: {
          center: action.outcome.center,
          centerName: "your location",
          locationLabel: "Current location",
          radiusMeters: state.draftRadiusMeters,
        },
      };
    }

    // Handle search submission
    case "search-submitted": {
      const barri = barcelonaBarris.find(
        (item) => item.id === state.draftCenterId,
      );
      const useUserLocation =
        state.draftCenterId === "user-location" &&
        state.userCoordinates !== null;
      return {
        ...state,
        isLocating: false,
        outcome: null,
        submitted: {
          center: useUserLocation
            ? state.userCoordinates!
            : (barri?.center ?? barcelonaConfig.fallbackCoordinates),
          centerName: useUserLocation
            ? "your location"
            : (barri?.name ?? barcelonaConfig.fallbackName),
          locationLabel: useUserLocation
            ? "Current location"
            : barri
              ? "Approximate barri center"
              : "Selected location",
          radiusMeters: state.draftRadiusMeters,
        },
      };
    }
  }
}
