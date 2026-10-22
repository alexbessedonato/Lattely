import type { Coordinates } from "@/shared/types/coordinates";
import type { LocationOutcome } from "@/features/discover-cafes/types/location-outcome";

export type SubmittedCafeSearch = {
  center: Coordinates;
  centerName: string;
  locationLabel: string;
  radiusMeters: number | null;
};

export type NearbyDiscoveryState = {
  draftCenterId: string;
  draftRadiusMeters: number | null;
  submitted: SubmittedCafeSearch;
  userCoordinates: Coordinates | null;
  isLocating: boolean;
  outcome: LocationOutcome | null;
};

export type NearbyDiscoveryAction =
  | { type: "center-selected"; centerId: string }
  | { type: "radius-selected"; radiusMeters: number | null }
  | { type: "location-started" }
  | { type: "location-resolved"; outcome: LocationOutcome }
  | { type: "search-submitted" };
