import type { LocationOutcome } from "@/features/discover-cafes/types/location-outcome";
import type { SearchLocation } from "@/features/discover-cafes/types/search-location";

export type SubmittedCafeSearch = {
  location: SearchLocation;
  locationLabel: string;
  radiusMeters: number | null;
};

export type NearbyDiscoveryState = {
  draftLocation: SearchLocation;
  draftRadiusMeters: number | null;
  submitted: SubmittedCafeSearch;
  userLocation: SearchLocation | null;
  isLocating: boolean;
  outcome: LocationOutcome | null;
};

export type NearbyDiscoveryAction =
  | { type: "center-selected"; location: SearchLocation }
  | { type: "radius-selected"; radiusMeters: number | null }
  | { type: "location-started" }
  | { type: "location-resolved"; outcome: LocationOutcome }
  | { type: "search-submitted" };
