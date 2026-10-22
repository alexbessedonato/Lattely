import type { SearchControlsProps } from "@/features/discover-cafes/types/search-controls-props";
import type { LocationFallbackReason } from "@/features/discover-cafes/types/location-outcome";
import { barcelonaBarris } from "@/features/discover-cafes/data/barcelona-barris";
import { barcelonaConfig } from "@/shared/config/barcelona";

const fallbackMessages: Record<LocationFallbackReason, string> = {
  denied: "Location permission was denied.",
  unavailable: "Your location is unavailable.",
  unsupported: "Your browser does not support geolocation.",
  timeout: "The location request timed out. Please try again.",
  "outside-coverage":
    "Your location is outside our approximate Barcelona demo coverage.",
};

export function SearchControls({
  centerId,
  radiusMeters,
  hasUserLocation,
  isLocating,
  outcome,
  onCenterChange,
  onRadiusChange,
  onSearch,
  onUseMyLocation,
}: SearchControlsProps) {
  return (
    <section className="search-controls page-width" aria-label="Café discovery">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
      >
        <fieldset className="search-fields" aria-describedby="search-note">
          <legend className="sr-only">Search cafés</legend>
          <label>
            <span>SEARCH CENTER</span>
            <select
              value={centerId}
              onChange={(event) => onCenterChange(event.target.value)}
            >
              <option value="catalunya">{barcelonaConfig.fallbackName}</option>
              {hasUserLocation && (
                <option value="user-location">Your location</option>
              )}
              <optgroup label="Barcelona barris">
                {barcelonaBarris.map((barri) => (
                  <option key={barri.id} value={barri.id}>
                    {barri.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
          <label>
            <span>HOW FAR?</span>
            <select
              value={radiusMeters ?? "anywhere"}
              onChange={(event) => {
                const option = barcelonaConfig.radiusOptions.find(
                  (item) =>
                    String(item.meters ?? "anywhere") === event.target.value,
                );
                if (option) onRadiusChange(option.meters);
              }}
            >
              {barcelonaConfig.radiusOptions.map((option) => (
                <option key={option.label} value={option.meters ?? "anywhere"}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button className="search-cta" type="submit">
            Search cafés <span aria-hidden="true">↗</span>
          </button>
        </fieldset>
      </form>
      <p id="search-note">
        Choose a center and radius, then search. Barris use approximate centers;
        results may include neighboring barris.
      </p>
      <div className="location-action">
        <button
          type="button"
          className="location-button"
          disabled={isLocating}
          onClick={onUseMyLocation}
          aria-describedby="location-status"
        >
          Use my location <span aria-hidden="true">↗</span>
        </button>
        <p id="location-status" role="status" aria-atomic="true">
          {isLocating
            ? "Finding your location… You can still choose a barri."
            : outcome?.status === "fallback"
              ? `${fallbackMessages[outcome.reason]} Using ${barcelonaConfig.fallbackName} as the fallback location.`
              : outcome?.status === "success"
                ? "Showing demo cafés near your location."
                : "Use my location searches immediately with the selected radius."}
        </p>
      </div>
    </section>
  );
}
