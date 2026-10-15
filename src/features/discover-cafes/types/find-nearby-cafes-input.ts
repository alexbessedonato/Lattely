import type { MockCafe } from "@/features/discover-cafes/types/mock-cafe";
import type { Coordinates } from "@/shared/types/coordinates";

export type FindNearbyCafesInput = {
  cafes: readonly MockCafe[];
  center: Coordinates;
};
