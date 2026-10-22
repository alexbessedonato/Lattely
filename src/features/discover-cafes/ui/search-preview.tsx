import type { SearchPreviewProps } from "@/features/discover-cafes/types/search-preview-props";
import type { LocationFallbackReason } from "@/features/discover-cafes/types/location-outcome";
import { barcelonaConfig } from "@/shared/config/barcelona";

const fallbackMessages: Record<LocationFallbackReason, string> = {
  denied: "Location permission was denied.",
  unavailable: "Your location is unavailable.",
  unsupported: "Your browser does not support geolocation.",
  timeout: "The location request timed out. Please try again.",
  "outside-coverage":
    "Your location is outside our approximate Barcelona demo coverage.",
};

export function SearchPreview({
  centerName,
  isLocating,
  outcome,
  onUseMyLocation,
}: SearchPreviewProps) {
  return (
    <section className="search-preview page-width" aria-label="Café discovery">
      <fieldset
        disabled
        className="search-fields"
        aria-describedby="preview-note"
      >
        <legend className="sr-only">Search cafés — static preview</legend>
        <label>
          <span>SEARCH CENTER</span>
          <select defaultValue="catalunya" aria-describedby="preview-note">
            <option value="catalunya">{centerName}</option>
          </select>
        </label>
        <label>
          <span>HOW FAR?</span>
          <select
            defaultValue={barcelonaConfig.defaultRadiusMeters}
            aria-describedby="preview-note"
          >
            <option value={barcelonaConfig.defaultRadiusMeters}>2 km</option>
          </select>
        </label>
        <label>
          <span>SORT BY</span>
          <select defaultValue="highest-rated" aria-describedby="preview-note">
            <option value="highest-rated">Highest-rated</option>
          </select>
        </label>
        <button
          className="search-cta"
          type="button"
          aria-describedby="preview-note"
        >
          Search cafés <span aria-hidden="true">↗</span>
        </button>
      </fieldset>
      <p id="preview-note">
        Fixed 2 km radius · Center, radius, sort, and search controls are
        previews.
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
            ? "Finding your location…"
            : outcome?.status === "fallback"
              ? `${fallbackMessages[outcome.reason]} Using ${barcelonaConfig.fallbackName} as the fallback location.`
              : outcome?.status === "success"
                ? "Showing demo cafés near your location."
                : `Starting near ${barcelonaConfig.fallbackName} · Default location.`}
        </p>
      </div>
    </section>
  );
}
