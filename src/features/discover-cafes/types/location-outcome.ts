import type { Coordinates } from "@/shared/types/coordinates";

export type LocationFallbackReason =
  "denied" | "unavailable" | "unsupported" | "timeout" | "outside-coverage";

export type LocationOutcome =
  | { status: "success"; center: Coordinates }
  | { status: "fallback"; reason: LocationFallbackReason };
