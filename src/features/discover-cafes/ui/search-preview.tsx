import { barcelonaConfig } from "@/shared/config/barcelona";

export function SearchPreview() {
  return (
    <section className="search-preview page-width" aria-label="Café search preview">
      <fieldset disabled className="search-fields" aria-describedby="preview-note">
        <legend className="sr-only">Search cafés — static preview</legend>
        <label>
          <span>YOUR NEIGHBORHOOD</span>
          <select defaultValue="catalunya" aria-describedby="preview-note">
            <option value="catalunya">{barcelonaConfig.fallbackName}</option>
          </select>
        </label>
        <label>
          <span>HOW FAR?</span>
          <select defaultValue={barcelonaConfig.defaultRadiusMeters} aria-describedby="preview-note">
            {barcelonaConfig.radiusOptions.map(option => (
              <option key={option.label} value={option.meters ?? "anywhere"}>{option.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>SORT BY</span>
          <select defaultValue="highest-rated" aria-describedby="preview-note">
            <option value="highest-rated">Highest-rated</option>
            <option value="nearest">Nearest</option>
          </select>
        </label>
        <button className="search-cta" type="button" aria-describedby="preview-note">Search cafés <span aria-hidden="true">↗</span></button>
      </fieldset>
      <p id="preview-note">Preview — search coming next</p>
    </section>
  );
}
