# 003 — Discover cafés using “Use my location”

**Status:** complete

**Blocked by:** 002 — Show cafés within 2 km of Plaça de Catalunya.

## What to build

A visitor chooses “Use my location” to replace the default Plaça de Catalunya results with fictional cafés within 2 km of their browser coordinates. When location cannot be used, show Plaça de Catalunya results with a visible explanation.

## Acceptance criteria

- [x] Keep ticket 002's default nearby results on first load. Request browser location only after the explicit “Use my location” action.
- [x] Show “Finding your location…” while waiting. Prevent overlapping requests or obsolete responses from replacing current results.
- [x] On valid coordinates inside the existing approximate Barcelona coverage, reuse ticket 002's distance calculation, inclusive 2 km filter, existing order, and result display. Identify the center as “your location.”
- [x] Use a finite location-request timeout. On permission denial, unavailable location, unsupported browser, timeout, or coordinates outside coverage, show results around Plaça de Catalunya with the specific reason.
- [x] Distinguish the initial default location from fallback after a failed request. A valid location with no matching cafés shows “No demo cafés within 2 km”; it does not trigger fallback or a larger radius.
- [x] Make “Use my location” available again after completion for an explicit retry. A later successful retry replaces the fallback explanation and results.
- [x] Keep user coordinates in memory only; exclude them from URLs, persistent storage, logs, and trace attributes. Café discovery uses local fixtures.
- [x] Keep the fixed 2 km radius, fictional-data labels, approximate-distance explanation, and count accurate across success and fallback. Keep the action keyboard accessible and announce status/result changes.
- [x] Validate success, each fallback reason, finite waiting, retry, obsolete-response handling, and an empty result. Run the existing lint, type-check, and build scripts and inspect mobile and desktop behavior on localhost.
- [x] Explain the changed files and how the action, location outcome, and existing nearby calculation connect. Report validation and limitations, then stop.

## Scope boundary

Reuse the completed default-center discovery behavior rather than introducing another search pipeline. Follow the approved milestone scope and repository architecture. Automatic location requests on load remain deferred despite appearing in the full product specification.

Neighborhood browsing, manual centers, radius selection, new sorting, maps, extra datasets, café-data APIs, asynchronous providers, TanStack Query, backend routes, persistence, schemas, migrations, seed scripts, notifications, tracing, and deployment remain excluded.

Implement only this ticket when requested. Completing it does not authorize later MVP work.

## Implementation and validation

Implemented the explicit browser-location action using a client discovery hook and a cancellable location boundary. Default, successful, and fallback centers reuse the existing synchronous fixture calculation and ranking. The shared configuration now documents the approximate demo coverage box; no coverage bounds existed in ticket 002.

Validation: `npm run lint`, `npm run typecheck`, `npm run test` (11 passing tests), and `npm run build` passed. Localhost browser checks covered initial default without a request, keyboard activation, pending/overlap prevention, valid success, all five fallback reasons, empty results, a 10-second deadline, successful retry, ignored obsolete callbacks, live status markup, and no coordinate persistence or URL changes. Desktop (1440 px) and mobile (390 px) screenshots were inspected; mobile had no horizontal overflow. A browser-context geolocation success also passed.

Limitations: deterministic location/error scenarios use simulated browser callbacks. Actual device location accuracy, operating-system permission dialogs, and screen-reader speech were not manually tested. Browser geolocation itself cannot be cancelled; completed or cancelled callbacks are ignored, and the local waiting state has a finite deadline.
