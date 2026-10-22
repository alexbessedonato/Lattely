# 004 — Editable café search centers and radius

**Status:** complete; implemented on 22 October 2026. Changes remain uncommitted for user review.

**Blocked by:** 003 — Discover cafés using “Use my location” (complete).

## What to build

Allow visitors to search around any of Barcelona’s 73 official barris or their browser location, using the selected radius. Remove the sorting dropdown; always recommend the highest-rated matching demo cafés.

## Agreed behavior

- Keep the existing initial results around Plaça de Catalunya with a 2 km radius. Browser location remains an explicit action.
- Enable a search-center dropdown containing all 73 official Barcelona barris, alphabetized by their displayed Catalan names. Keep Plaça de Catalunya as the initial/default center option and offer the retrieved user location after a successful request so visitors can switch back to it.
- Each barri uses a documented approximate central point. Radius matching may include cafés in adjacent barris; this is not polygon-boundary filtering.
- Enable 500 m, 1 km, 2 km, 5 km, 10 km, and Anywhere. Anywhere includes the complete existing Barcelona demo café dataset and retains distance display.
- Editing the center or radius changes the form selection only. Search cafés applies those selections to results. Keep displayed result summaries tied to the applied search.
- Use my location requests fresh browser coordinates and automatically applies the outcome using the currently selected radius, without requiring Search cafés afterward.
- Keep the dropdowns editable after geolocation. A manual center selection supersedes any pending geolocation request; late callbacks must not overwrite that selection or the results.
- Retain finite location waiting, explicit retry, Barcelona coverage validation, and visible fallback reasons. Failed location requests automatically search around Plaça de Catalunya using the selected radius.
- Remove Sort by. Rank by rating descending, review count descending, distance ascending, and stable ID ascending for ties.
- Keep results, counts, approximate-distance explanations, empty states, and status announcements accurate for each submitted center and radius. An empty result does not silently expand the radius.
- Keep coordinates in memory only and preserve the visible fictional-data and simulated-rating labels.

## Data and validation

- Source official names and stable barri IDs from the Ayuntamiento’s administrative-units dataset. Bundle the small center dataset locally with source/license attribution; no runtime geocoding or external café requests.
- Official source: https://opendata-ajuntament.barcelona.cat/data/ca/dataset/20170706-districtes-barris . Government catalogue mirror: https://datos.gob.es/es/catalogo/l01080193-unidades-administrativas-de-la-ciudad-de-barcelona .
- Validate the complete 73-entry dataset, unique IDs/names, alphabetical presentation, valid coordinates, and compatibility with the documented approximate demo coverage. Verify coverage against the source data before deciding whether the existing approximation needs adjustment.
- Cover every radius, inclusive finite-radius matching, Anywhere, deterministic ranking, submitted versus draft values, location success/fallback/retry, and manual selections superseding pending location callbacks.
- Run the repository’s lint, type-check, test, and build scripts. Inspect keyboard interactions and mobile/desktop layouts on localhost.

## Scope boundary

Reuse the existing local fixture calculation and browser-location boundary. This slice adds search controls and a static barrio-center dataset, not neighborhood boundary filtering, address autocomplete, new café fixtures, automatic geolocation on load, asynchronous café providers, TanStack Query wiring, backend routes, databases, maps, deployment, or infrastructure.

The current-ticket pointer, product specification’s sorting behavior, architecture placement notes, and README are updated. No ADR is needed: these interface and local-data choices are readily reversible.

## Implementation and validation

- Replaced the disabled preview with accessible search controls. The feature reducer keeps draft selections separate from submitted searches; the hook owns browser request cancellation and explicit retries. Filtering and deterministic ranking remain local, with no new dependencies.
- Bundled all 73 municipal barrio names/codes and derived approximate centers with source attribution. Every center fits the existing coverage; no coverage expansion was needed.
- `npm run lint`, `npm run typecheck`, `npm run test` (22 tests), `npm run build`, `npm run format:check`, and `git diff --check` passed.
- Localhost browser checks covered initial default without geolocation, all 73 dropdown entries and six radii, manual edits waiting for submission, Enter submission, Anywhere, immediate location results, switching back to a saved user location, current radius during a pending lookup, cancellation on manual selection/submission, obsolete callbacks across retries, every fallback reason, the actual 10-second deadline, a valid-location empty result, cleared fallback after retry, announced statuses, keyboard focus, empty-state guidance, and no coordinate storage or URL changes. Desktop (1440 px) and mobile (390 px) screenshots were inspected; mobile had no horizontal overflow or browser errors.
- The code-review skill reviewed the uncommitted working tree against HEAD on separate Standards and Spec axes: zero actionable findings on each.

Limitations: the ten existing fictional cafés remain the complete demo dataset, so some barrios have no nearby results. Browser outcome checks simulate location callbacks; physical device accuracy, operating-system permission dialogs, and screen-reader speech were not manually verified. No commit or deployment was performed.
