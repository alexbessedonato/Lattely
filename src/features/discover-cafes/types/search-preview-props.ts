import type { LocationOutcome } from "@/features/discover-cafes/types/location-outcome";

export type SearchPreviewProps = {
  centerName: string;
  isLocating: boolean;
  outcome: LocationOutcome | null;
  onUseMyLocation: () => void;
};
