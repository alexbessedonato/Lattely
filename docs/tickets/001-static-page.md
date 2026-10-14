# 001 — Static café discovery page

Status: complete — static homepage implemented and verified; interactive search remains deferred.

## Design and prototype reference

The selected design preserves A's split hero, three equal featured cards, and the ranks 4–10 list below, using C's warm cream, ochre, and brown palette. The page has a Lattely header/logo, hero, `CoffeeRanking` main section, and footer. This ten-café layout supersedes the six-card minimum below.

The original exploration is preserved in Git commit `946c3f1` (`chore: initial UI prototype`). The active homepage is now `/`; prototype routes, variants, and the switcher have been removed. No prototype branch was recreated.

## Goal

Create a locally runnable, responsive home page that shows the café finder's visual direction using typed fictional data. Complete this ticket before expanding to interactive search.

## In scope

- Scaffold Next.js App Router, React, strict TypeScript, Tailwind CSS 4, npm, and basic lint/type-check commands. Document local setup in `README.md`.
- Compose the home page in `src/app/page.tsx`, with presentational café UI under `src/features/discover-cafes/ui` and fixtures under its `data` folder.
- Show at least six fictional café cards with name, simulated rating, review count, neighborhood/address, and a clearly simulated example distance. Label the entire page as demo data.
- Show a static preview of location, radius, and sort controls with Plaça de Catalunya, 2 km, and highest-rated selected. Include the agreed radius options from the shared configuration. Keep controls disabled with a visible “Preview — search coming next” explanation; do not imply working location or search behavior.
- Use warm coffee-inspired colors, readable contrast, semantic markup, and a layout that works on mobile and desktop.

## Deferred

Automatic geolocation and its fallback flow, distance calculations, filtering, sorting behavior, asynchronous providers, TanStack Query wiring, server endpoints, database/schema/migration work, Redis, Socket.IO, tracing, and deployment. These remain in the overall product/architecture documents, not this ticket.

## Done when

- The home page runs locally and displays the static preview and mock café cards without credentials or external services.
- Demo labels and disabled-control explanations are visible; mobile and desktop widths remain readable without horizontal overflow.
- Configured lint, TypeScript checks, and production build pass. Visually inspect the page at mobile and desktop widths. Add automated tests only if necessary for substantive behavior introduced by this slice.
- Report what was implemented and verified, then stop at this ticket's scope. Do not begin the next slice automatically.

## Completion evidence

- Reused the existing scaffold, dependencies, configuration, and scripts without re-scaffolding.
- Implemented the root homepage with separate presentation components, authored types in `types` folders, and ten typed fictional café fixtures in a fixed display order.
- Added disabled location/radius/sort/search controls showing Plaça de Catalunya, 2 km, and highest-rated, with “Preview — search coming next.” Demo labels and example distances remain visible.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass. Obsolete generated type-cache entries for the deleted route were cleared before rechecking.
- Browser inspection confirmed three featured cards and ranks 4–10, disabled controls, keyboard focus and skip-link navigation, and no horizontal overflow at desktop, 390 px, and 320 px widths.
- No dependencies, automated-test framework, geolocation, filtering, sorting behavior, asynchronous providers, database, notifications, tracing, or deployment were added. Work stops at ticket 001.
