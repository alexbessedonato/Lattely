import { SearchPicker } from "@/features/discover-cafes/ui/search-picker";
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
          <SearchPicker
            label="SEARCH CENTER"
            value={centerId}
            searchable
            options={[
              { value: "catalunya", label: barcelonaConfig.fallbackName },
              ...(hasUserLocation
                ? [{ value: "user-location", label: "Your location" }]
                : []),
              ...barcelonaBarris.map((barri) => ({
                value: barri.id,
                label: barri.name,
              })),
            ]}
            onChange={onCenterChange}
          />
          <SearchPicker
            label="HOW FAR?"
            value={String(radiusMeters ?? "anywhere")}
            options={barcelonaConfig.radiusOptions.map((option) => ({
              value: String(option.meters ?? "anywhere"),
              label: option.label,
            }))}
            onChange={(value) => {
              const option = barcelonaConfig.radiusOptions.find(
                (item) => String(item.meters ?? "anywhere") === value,
              );
              if (option) onRadiusChange(option.meters);
            }}
          />
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
