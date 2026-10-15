# 003 — Discover cafés using “Use my location”

**Status:** ready-for-agent

**Blocked by:** 002 — Show cafés within 2 km of Plaça de Catalunya.

## What to build

A visitor chooses “Use my location” to replace the default Plaça de Catalunya results with fictional cafés within 2 km of their browser coordinates. When location cannot be used, show Plaça de Catalunya results with a visible explanation.

## Acceptance criteria

- [ ] Keep ticket 002's default nearby results on first load. Request browser location only after the explicit “Use my location” action.
- [ ] Show “Finding your location…” while waiting. Prevent overlapping requests or obsolete responses from replacing current results.
- [ ] On valid coordinates inside the existing approximate Barcelona coverage, reuse ticket 002's distance calculation, inclusive 2 km filter, existing order, and result display. Identify the center as “your location.”
- [ ] Use a finite location-request timeout. On permission denial, unavailable location, unsupported browser, timeout, or coordinates outside coverage, show results around Plaça de Catalunya with the specific reason.
- [ ] Distinguish the initial default location from fallback after a failed request. A valid location with no matching cafés shows “No demo cafés within 2 km”; it does not trigger fallback or a larger radius.
- [ ] Make “Use my location” available again after completion for an explicit retry. A later successful retry replaces the fallback explanation and results.
- [ ] Keep user coordinates in memory only; exclude them from URLs, persistent storage, logs, and trace attributes. Café discovery uses local fixtures.
- [ ] Keep the fixed 2 km radius, fictional-data labels, approximate-distance explanation, and count accurate across success and fallback. Keep the action keyboard accessible and announce status/result changes.
- [ ] Validate success, each fallback reason, finite waiting, retry, obsolete-response handling, and an empty result. Run the existing lint, type-check, and build scripts and inspect mobile and desktop behavior on localhost.
- [ ] Explain the changed files and how the action, location outcome, and existing nearby calculation connect. Report validation and limitations, then stop.

## Scope boundary

Reuse the completed default-center discovery behavior rather than introducing another search pipeline. Follow the approved milestone scope and repository architecture. Automatic location requests on load remain deferred despite appearing in the full product specification.

Neighborhood browsing, manual centers, radius selection, new sorting, maps, extra datasets, café-data APIs, asynchronous providers, TanStack Query, backend routes, persistence, schemas, migrations, seed scripts, notifications, tracing, and deployment remain excluded.

Implement only this ticket when requested. Completing it does not authorize later MVP work.
