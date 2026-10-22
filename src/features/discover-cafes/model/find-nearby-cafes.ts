import { calculateHaversineDistance } from "../lib/calculate-haversine-distance.ts";
import { barcelonaConfig } from "../../../shared/config/barcelona.ts";
import type { FindNearbyCafesInput } from "@/features/discover-cafes/types/find-nearby-cafes-input";
import type { NearbyCafe } from "@/features/discover-cafes/types/nearby-cafe";

export function findNearbyCafes({
  cafes,
  center,
}: FindNearbyCafesInput): NearbyCafe[] {
  return cafes
    .map((cafe) => ({
      ...cafe,
      distanceMeters: calculateHaversineDistance(center, cafe),
    }))
    .filter(
      (cafe) => cafe.distanceMeters <= barcelonaConfig.defaultRadiusMeters,
    );
}
