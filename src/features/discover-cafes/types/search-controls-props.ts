import type { LocationOutcome } from "@/features/discover-cafes/types/location-outcome";

export type SearchControlsProps = {
  centerId: string;
  radiusMeters: number | null;
  hasUserLocation: boolean;
  isLocating: boolean;
  outcome: LocationOutcome | null;
  onCenterChange: (centerId: string) => void;
  onRadiusChange: (radiusMeters: number | null) => void;
  onSearch: () => void;
  onUseMyLocation: () => void;
};
