# Lattely

A Barcelona café discovery demo built with Next.js, React, TypeScript, and Tailwind CSS 4. The homepage uses the selected editorial layout and warm cream/ochre/brown palette.

On page load, it calculates straight-line distances from Plaça de Catalunya and displays the fictional cafés within 2 km, preserving their existing highest-rated order. The ten fixtures currently yield eight results: three featured cards, then ranks 4–8. Ratings and review counts are simulated; distances are calculated from plausible fictional coordinates.

Plaça de Catalunya is clearly labeled as the default location. Location, radius, sort, and search controls remain disabled previews. No browser location request occurs; “Use my location” belongs to ticket 003. Navigation links only move between sections of the page.

The flow is small: the homepage passes fixtures and the default center to `findNearbyCafes`; that function calculates Haversine distances in meters and keeps results at or within 2,000 meters; the ranking renders those results and formats distances for display. Filtering happens before display rounding. An empty result renders “No demo cafés within 2 km.”

## Run locally

Recommended runtime: Node.js 24 LTS (`.nvmrc`). Checks are run using the runtime available in the workspace. Existing scripts use Webpack because Turbopack compiler-worker permissions were blocked in this environment.

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js at `/`. The retained `npm run prototype` script is an alias for the same development server; the prototype route and switcher have been removed.

## Verification

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

The distance/filtering tests use Node's built-in test runner and native TypeScript support on Node.js 24+, without additional dependencies. Explicit `.ts` imports in those functions allow the tests to run the same source the page uses; TypeScript's `allowImportingTsExtensions` option permits these imports with the existing `noEmit` setup.

No database, API keys, external assets, or additional services are required. Browser geolocation, interactive radius/sort controls, TanStack Query, and all backend infrastructure remain deferred beyond ticket 002.

## Prototype reference

The original UI exploration is preserved in Git commit `946c3f1` (`chore: initial UI prototype`). Inspect it with `git show 946c3f1:src/features/discover-cafes/ui/homepage-prototype.tsx`. No separate prototype branch is needed.
