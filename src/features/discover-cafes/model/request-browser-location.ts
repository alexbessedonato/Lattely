import { barcelonaConfig } from "../../../shared/config/barcelona.ts";
import type { LocationOutcome } from "../types/location-outcome.ts";

export function requestBrowserLocation(
  geolocation: Pick<Geolocation, "getCurrentPosition"> | undefined,
  onComplete: (outcome: LocationOutcome) => void,
): () => void {

  if (!geolocation) {
    onComplete({ status: "fallback", reason: "unsupported" });
    return () => {};
  }

  let active = true;
  const timeout = setTimeout(
    () => complete({ status: "fallback", reason: "timeout" }),
    10_000,
  );

  const complete = (outcome: LocationOutcome) => {
    if (!active) return;
    active = false;
    clearTimeout(timeout);
    onComplete(outcome);
  };

  try {
    geolocation.getCurrentPosition(

      // Success callback
      (position) => {
        const { latitude, longitude } = position.coords;
        if (
          !Number.isFinite(latitude) ||
          !Number.isFinite(longitude) ||
          Math.abs(latitude) > 90 ||
          Math.abs(longitude) > 180
        ) {
          complete({ status: "fallback", reason: "unavailable" });
          return;
        }
        const { south, north, west, east } = barcelonaConfig.coverage;
        if (
          latitude < south ||
          latitude > north ||
          longitude < west ||
          longitude > east
        ) {
          complete({ status: "fallback", reason: "outside-coverage" });
          return;
        }
        complete({ status: "success", center: { latitude, longitude } });
      },

      // Error callback
      (error) => {
        complete({
          status: "fallback",
          reason:
            error.code === 1
              ? "denied"
              : error.code === 3
                ? "timeout"
                : "unavailable",
        });
      },

      // Options object
      { timeout: 10_000, maximumAge: 0 },
    );

    // If getCurrentPosition doesn't call either callback within the timeout, the timeout will trigger complete with a fallback outcome.
  } catch {
    complete({ status: "fallback", reason: "unavailable" });
  }
  
  return () => {
    active = false;
    clearTimeout(timeout);
  };
}
