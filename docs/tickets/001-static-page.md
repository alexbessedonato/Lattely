# 001 — Static café discovery page

Status: selected direction is A's structure with C's palette; updated prototype ready for review.

## Current prototype exploration

The user requested a throwaway homepage exploration before choosing the final design. Use three variants on `/prototype/homepage?variant=A|B|C`, with a floating development-only switcher. Each has a Lattely logo/name header, hero, `CoffeeRanking` main section with the top three fictional cafés as large cards and ranks 4–10 as a list, and a footer. Keep search controls static. This exploration supersedes the six-card minimum below and does not authorize interactive search or infrastructure.

After the user selects a direction, record the verdict and implement the real static page separately. Archive the prototype on a throwaway branch once Git history exists. Until then, mark prototype files clearly and keep their location close to the feature and route.

Selected direction: preserve A's split hero, three equal featured cards, and the ranks 4–10 list below; use C's warm cream, ochre, and brown palette. Variant A now previews this combination. Keep this styling exploration separate from final-page implementation and future search behavior.

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
