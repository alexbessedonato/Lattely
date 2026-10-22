import type { Coordinates } from "@/shared/types/coordinates";

export function calculateHaversineDistance(
  from: Coordinates,
  to: Coordinates,
): number {
  const radians = Math.PI / 180;
  const latitudeDifference = (to.latitude - from.latitude) * radians;
  const longitudeDifference = (to.longitude - from.longitude) * radians;
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(from.latitude * radians) *
      Math.cos(to.latitude * radians) *
      Math.sin(longitudeDifference / 2) ** 2;

  // Mean Earth radius in meters; clamp rounding at antipodal points.
  return 2 * 6_371_000 * Math.asin(Math.sqrt(Math.min(1, haversine)));
}
