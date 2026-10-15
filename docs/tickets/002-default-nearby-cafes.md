# 002 — Show cafés within 2 km of Plaça de Catalunya

**Status:** complete — implemented and verified

**Blocked by:** None; ticket 001 is complete.

## What to build

On page load, show fictional cafés within 2 km of Plaça de Catalunya, clearly labeled as the default starting location. Replace the static distance examples with calculated approximate straight-line distances.

## Acceptance criteria

- [x] Add geographically plausible coordinates to the existing ten fictional cafés without adding cafés or changing their other content.
- [x] Calculate Haversine distances in meters from Plaça de Catalunya. Include cafés at or within 2,000 meters and exclude cafés beyond that distance, using the calculated value before display rounding.
- [x] Preserve the fixtures' existing highest-rated order. Show the selected center, fixed 2 km radius, displayed result count, and approximate straight-line distances.
- [x] Show up to three featured cards and any remaining results in the lower list. Number displayed results from 1, adapt the lower-list range to the actual count, and hide the lower list when there are no remaining results.
- [x] Support an honest “No demo cafés within 2 km” empty result; never silently widen the radius.
- [x] Keep cafés, ratings, and review counts visibly fictional. Explain that distances are calculated from fictional café coordinates.
- [x] Make the default discovery state clear; radius and sorting remain fixed. Browser location is not requested in this ticket, and preview controls do not imply working interactions.
- [x] Validate distance units, inclusive radius boundaries, preserved order, and result counts. Run the existing lint, type-check, and build scripts and inspect mobile and desktop layouts.
- [x] Explain the changed files and how coordinates become displayed nearby results. Report validation and limitations, then stop.

## Scope boundary

Use local fixtures and the existing default-center configuration. Follow the approved milestone scope and repository architecture for placement and separation of rendering from business rules. The full product specification supplies context; it does not expand this ticket.

Browser geolocation belongs to ticket 003. Neighborhood browsing, manual centers, radius selection, new sorting, extra datasets, café-data APIs, asynchronous providers, TanStack Query, backend routes, persistence, schemas, migrations, seed scripts, notifications, tracing, and deployment remain excluded.

Implement only this ticket when requested; do not automatically begin ticket 003.

## Completion evidence

- Added coordinates to all ten existing fixtures; eight fall within the fixed radius around Plaça de Catalunya. Existing fixture content and order are preserved.
- Added a pure Haversine calculation and nearby-result function; the server-rendered page composes the default results without a provider, query client, or browser location request.
- Updated approximate distance labels, result count, default-center explanation, dynamic ranks, and the empty-result branch.
- `npm run lint`, `npm run typecheck`, `npm run test` (five tests), and `npm run build` pass. Tests cover meters, the inclusive boundary, just-outside exclusion before rounding, order, empty results, and the default result set.
- Browser inspection at 1280 px, 390 px, and 320 px confirmed three cards, five lower-list rows, ranks 4–8, disabled controls, and no horizontal overflow. Empty/short-list rendering was inspected in code; the empty calculation is covered by a test.
- Standards and Spec reviews reported no actionable findings. No dependencies were installed. The README explains the source-to-results flow and the built-in test command.
- Ticket 003 has not been implemented.
