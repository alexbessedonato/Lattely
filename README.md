# Lattely

A Barcelona café discovery demo built with Next.js, React, TypeScript, and Tailwind CSS 4. The homepage uses the selected editorial layout and warm cream/ochre/brown palette.

On page load, it displays fictional cafés within 2 km of Plaça de Catalunya. The existing ten fixtures yield eight initial results: three featured cards, then ranks 4–8. Ratings and review counts are simulated; displayed distances are approximate straight-line calculations.

Choose any of Barcelona’s 73 official barris from the alphabetical dropdown, then a radius of 500 m, 1 km, 2 km, 5 km, 10 km, or Anywhere. Changes stay in the form until **Search cafés** is submitted. Anywhere includes all ten demo cafés, with distances measured from the selected center. Results always rank by rating descending, review count descending, distance ascending, then stable ID ascending; there is no sorting control.

**Use my location** requests fresh browser coordinates and searches immediately with the currently selected radius. After success, Your location remains available in the dropdown so visitors can switch between it and a barri. Permission denial, unavailable/invalid coordinates, unsupported geolocation, timeout, or coordinates outside demo coverage immediately search Plaça de Catalunya with a specific fallback explanation. The action supports explicit retries. Choosing a center or submitting the form while locating cancels that pending request; obsolete callbacks cannot replace a newer choice or retry.

`NearbyDiscovery` composes the form and results. `useNearbyDiscovery` handles browser request lifetimes; `nearbyDiscoveryReducer` separates draft controls from the submitted search. `findNearbyCafes` derives distances, applies the selected inclusive radius (or no distance filter for Anywhere), and ranks results without modifying fixtures. `SearchControls` renders the form and location status; `CoffeeRanking` renders the applied center/radius, count, ranking, and empty-state guidance. Result and location changes use live status regions. Empty results never silently expand the radius.

`src/shared/config/barcelona.ts` owns the default center, radius choices, and inclusive approximate demo service box: latitude 41.32–41.47, longitude 2.05–2.23. The box is not a municipal boundary. The local `barcelona-barris.ts` dataset contains official barri names/IDs and approximate centers derived from municipal polygons; all 73 centers fit the existing box. A radius around a barri center can include cafés in adjacent barris. See [data attribution and derivation](docs/barcelona-barris-data.md).

Coordinates remain in memory only, excluded from URLs, persistent storage, logs, and external requests. No runtime municipal API calls are needed.

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

The distance/filtering/ranking, discovery-state, barrio-data, and browser-location outcome tests use Node's built-in test runner and native TypeScript support on Node.js 24+, without additional dependencies. Explicit `.ts` imports in those functions allow the tests to run the same source the page uses; TypeScript's `allowImportingTsExtensions` option permits these imports with the existing `noEmit` setup.

No database, API keys, external assets, or additional services are required. Automatic location on load, new café datasets, TanStack Query, and all backend infrastructure remain deferred. Browser checks should cover keyboard activation, the pending state, each fallback, retry after timeout with an obsolete callback, an empty result, and mobile/desktop layout. Deterministic browser checks can simulate geolocation outcomes; actual device accuracy and permission prompts depend on the browser and operating system.

## Prototype reference

The original UI exploration is preserved in Git commit `946c3f1` (`chore: initial UI prototype`). Inspect it with `git show 946c3f1:src/features/discover-cafes/ui/homepage-prototype.tsx`. No separate prototype branch is needed.
