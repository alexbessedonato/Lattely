# Lattely

A Barcelona café discovery demo built with Next.js, React, TypeScript, and Tailwind CSS 4. The homepage uses the selected editorial layout and warm cream/ochre/brown palette.

On page load, it calculates straight-line distances from Plaça de Catalunya and displays the fictional cafés within 2 km, preserving their existing highest-rated order. The ten fixtures currently yield eight results: three featured cards, then ranks 4–8. Ratings and review counts are simulated; distances are calculated from plausible fictional coordinates.

Plaça de Catalunya is clearly labeled as the default location. “Use my location” requests browser coordinates only after an explicit click and shows “Finding your location…” while waiting. A successful location inside the approximate Barcelona demo coverage replaces the center; permission denial, unavailable or invalid coordinates, unsupported geolocation, a timeout, or a location outside coverage restores Plaça de Catalunya with a specific fallback explanation. The action becomes available again after completion. Radius, sort, manual center, and search controls remain disabled previews.

The homepage composes `NearbyDiscovery`. Its `useNearbyDiscovery` hook coordinates the action and stores only the current in-memory location outcome. `requestBrowserLocation` validates coordinates, enforces a 10-second deadline (including time spent waiting for permission), and ignores callbacks after completion or cancellation. Unmounting cancels the pending outcome; the button and hook prevent overlapping requests. Coordinates never enter URLs, persistent storage, logs, or external café requests.

The resolved center goes through the same `findNearbyCafes` calculation for default, current, and fallback locations: Haversine distances in meters, inclusive 2,000-meter filtering before rounding, and the fixtures’ existing highest-rated order. `SearchPreview` renders the location action and outcome; `CoffeeRanking` renders results, count, center, location label, and approximate distances. Both status and result changes use live status regions. A valid center with no matches renders “No demo cafés within 2 km” without falling back or expanding the radius.

`src/shared/config/barcelona.ts` owns the default center, fixed radius, and inclusive approximate demo service box: latitude 41.32–41.47, longitude 2.05–2.23. This box is an approximation for the fictional dataset, not a municipal boundary.

## Run locally

Recommended runtime: Node.js 24 LTS (`.nvmrc`). Checks are run using the runtime available in the workspace. Existing scripts use Webpack because Turbopack compiler-worker permissions were blocked in this environment.

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js at `/` using localhost or its loopback address; browser geolocation requires a secure context, and loopback is supported for local development. The retained `npm run prototype` script is an alias for the same development server; the prototype route and switcher have been removed.

## Verification

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Run `npm run format` to format the project with Prettier. It uses two-space indentation, double quotes, semicolons, and an 80-character target line width to make long expressions and JSX easier to read. Generated files and lockfiles are excluded. `npm run format:check` checks formatting without changing files. Prettier handles layout; ESLint checks code rules.

The distance/filtering and browser-location outcome tests use Node's built-in test runner and native TypeScript support on Node.js 24+, without additional dependencies. Explicit `.ts` imports in those functions allow the tests to run the same source the page uses; TypeScript's `allowImportingTsExtensions` option permits these imports with the existing `noEmit` setup.

No database, API keys, external assets, or additional services are required. Automatic location on load, interactive radius/sort controls, TanStack Query, and all backend infrastructure remain deferred. Browser checks should cover keyboard activation, the pending state, each fallback, retry after timeout with an obsolete callback, an empty result, and mobile/desktop layout. Deterministic browser checks can simulate geolocation outcomes; actual device accuracy and permission prompts depend on the browser and operating system.

## Prototype reference

The original UI exploration is preserved in Git commit `946c3f1` (`chore: initial UI prototype`). Inspect it with `git show 946c3f1:src/features/discover-cafes/ui/homepage-prototype.tsx`. No separate prototype branch is needed.
