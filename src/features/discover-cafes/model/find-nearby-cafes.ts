import { calculateHaversineDistance } from "../lib/calculate-haversine-distance.ts";
import { barcelonaConfig } from "../../../shared/config/barcelona.ts";
import type { FindNearbyCafesInput } from "@/features/discover-cafes/types/find-nearby-cafes-input";
import type { NearbyCafe } from "@/features/discover-cafes/types/nearby-cafe";

export function findNearbyCafes({
  cafes,
  center,
  radiusMeters = barcelonaConfig.defaultRadiusMeters,
}: FindNearbyCafesInput): NearbyCafe[] {

  if (
    !barcelonaConfig.radiusOptions.some(
      (option) => option.meters === radiusMeters,
    )
  ) {
    throw new RangeError("Choose a configured search radius.");
  }
  
  return cafes
    .map((cafe) => ({
      ...cafe,
      distanceMeters: calculateHaversineDistance(center, cafe),
    }))
    .filter(
      (cafe) => radiusMeters === null || cafe.distanceMeters <= radiusMeters,
    )
    .sort(
      (a, b) =>
        b.rating - a.rating ||
        b.reviewCount - a.reviewCount ||
        a.distanceMeters - b.distanceMeters ||
        (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
    );
}
