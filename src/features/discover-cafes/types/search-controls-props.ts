import type { LocationOutcome } from "@/features/discover-cafes/types/location-outcome";
import type { SearchLocation } from "@/features/discover-cafes/types/search-location";

export type SearchControlsProps = {
  location: SearchLocation;
  radiusMeters: number | null;
  userLocation: SearchLocation | null;
  isLocating: boolean;
  outcome: LocationOutcome | null;
  onCenterChange: (location: SearchLocation) => void;
  onRadiusChange: (radiusMeters: number | null) => void;
  onSearch: () => void;
  onUseMyLocation: () => void;
};
