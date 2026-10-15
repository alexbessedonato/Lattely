# Next milestone — GPS-powered nearby discovery

Status: approved with the two-ticket breakdown. This scope replaces the rejected neighborhood-filtering proposal. Ticket creation is authorized; implementation remains a separate request.

## One user-visible behavior

On first load, show fictional cafés within 2 km of Plaça de Catalunya as the default starting center. A visitor chooses “Use my location” to discover cafés within 2 km of their retrieved location. If location cannot be used, show results around Plaça de Catalunya and explain the fallback.

## Agreed decisions

- Request browser location only after the explicit action. Automatic location requests on load remain deferred, although they are part of the full product specification.
- Show “Finding your location…” while waiting.
- Use Plaça de Catalunya automatically after permission denial, unavailable location, an unsupported browser, timeout, or a location outside the existing approximate Barcelona coverage. Visibly identify the fallback center and the reason.
- Keep the action available after completion for an explicit retry.
- Use a fixed, visibly labeled 2 km radius. Radius selection remains deferred.
- Add geographically plausible coordinates to the existing fictional fixtures as needed. Use actual coordinate-based distances for inclusion and display; do not interpret the current fictional distance labels as geographical measurements.
- Include only cafés at or within 2 km of the resolved center. Preserve the fixtures’ existing highest-rated order; changing sort order remains deferred.
- Identify whether results use the visitor’s location or Plaça de Catalunya, show the result count, and label calculated distances as approximate straight-line distances.
- Show “No demo cafés within 2 km” when a valid search has no matches. An empty result does not trigger fallback or silently increase the radius.
- Keep cafés, ratings, and review counts visibly identified as fictional demo data.

## Initial display

On first load, calculate and display results within 2 km of Plaça de Catalunya using the fixture coordinates. Clearly label this as the default starting location, for example “Demo cafés within 2 km of Plaça de Catalunya · Default location.” Do not request browser location until the visitor chooses “Use my location.”

Initial results use the same radius, inclusion rules, ordering, distance display, count, and empty-result behavior as GPS-powered results. A default center chosen before any location request is distinct from a fallback after a failed request; only a failed request displays a failure explanation.

## Boundaries

Use the existing ten fictional cafés. Neighborhood browsing is excluded. Manual search-center selection, radius selection, nearest sorting, maps, extra datasets, and automatic discovery on load remain deferred.

Use local data and browser geolocation. No café-data API, asynchronous data-provider abstraction, TanStack Query wiring, backend routes, persistence, schemas, migrations, seed scripts, notifications, tracing, or deployment belongs to this slice. Coordinates stay in memory, following the product specification’s privacy rules.

The implementation should remain small enough to explain the action, location outcome, distance calculation, and displayed results. Stop after this behavior; the wider MVP does not expand the scope.

## Approved ticket sequence

1. 002 — Show cafés within 2 km of Plaça de Catalunya. No outstanding blockers; ticket 001 is complete.
2. 003 — Discover cafés using “Use my location”. Blocked by ticket 002, whose calculation and display it reuses.

The interview and ticketing work changes documentation only. Implementation and its validation require a subsequent request. Build and review one ticket at a time.
