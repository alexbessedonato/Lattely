# Lattely

Find your next good coffee in Barcelona. Lattely is a café discovery demo with neighborhood search, browser geolocation, and recommendations ranked by rating.

Built with **Next.js App Router, React, strict TypeScript, and Tailwind CSS 4**.

> All ten cafés, ratings, and review counts are fictional demo data. This project currently demonstrates the discovery experience; it does not provide live café listings or verified reviews.

## Features

- **Browse all 73 Barcelona neighborhoods:** choose an official barri from an alphabetical, searchable picker, or start from Plaça de Catalunya.
- **Search near you:** “Use my location” searches immediately with the selected radius. Your retrieved location remains available so you can switch between it and a neighborhood.
- **Choose your distance:** 500 m, 1 km, 2 km, 5 km, 10 km, or Anywhere in the demo dataset.
- **Highest-rated results:** cafés rank by rating, then review count, distance, and stable ID to resolve ties.
- **Control when to search:** neighborhood and radius edits wait for “Search cafés.” The displayed results continue to describe the last applied search.
- **Responsive search pickers:** full-width controls and readable bottom sheets on mobile, with centered dialogs on desktop, large option targets, and a filter for search centers. Keyboard navigation, visible focus, and announced location/result changes support accessible browsing.

## Getting started

Use Node.js 24 LTS or newer with native TypeScript support. The recommended version is recorded in `.nvmrc`.

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js, usually [http://127.0.0.1:3000](http://127.0.0.1:3000).

No database, API keys, environment variables, or external services are needed. Browser geolocation works on localhost; a hosted version requires HTTPS and location permission.

To run a production build locally:

```sh
npm run build
npm start
```

## How discovery works

The initial search shows cafés within 2 km of Plaça de Catalunya. Selecting a barri searches around an approximate central point, so results may include cafés in neighboring barris. Distances use the Haversine calculation and represent approximate straight-line distances, not walking routes.

A finite radius includes cafés at or inside that distance. Anywhere removes the distance filter while retaining distances from the selected center. Because the demo contains only ten fictional cafés, some neighborhood searches return no results; the app never silently expands the radius.

Open either picker to choose an option. Search-center filtering narrows the list of barris; choosing an option updates the form and closes the picker. Escape or the close button dismisses it. Keyboard users can move between options with the arrow keys, Home, and End. Submit “Search cafés” to apply the chosen center and radius.

Location is requested only after clicking “Use my location.” If permission is denied, the browser cannot provide a usable location within ten seconds, or the coordinates fall outside demo coverage, the app searches around Plaça de Catalunya and explains the fallback. Choosing a center or submitting a search while locating prevents the pending response from overriding the newer choice.

## Data and privacy

Neighborhood names and administrative codes come from the **Ajuntament de Barcelona**. Approximate search centers are derived from its administrative polygons. The source data is licensed under **CC BY 4.0**; see [data attribution and derivation](docs/barcelona-barris-data.md).

Search centers are validated against an approximate demo coverage box, not an official municipal boundary. Every bundled neighborhood center fits that box.

User coordinates stay in memory. The application does not put them in URLs, persistent browser storage, logs, or external requests. Both neighborhood data and fictional café fixtures are bundled locally.

## Project structure

- `src/app` — routes, layouts, and global styles.
- `src/features/discover-cafes/ui` — search controls, café cards, and result lists.
- `src/features/discover-cafes/model` — draft/submitted search state, browser-location handling, filtering, and ranking.
- `src/features/discover-cafes/data` — fictional cafés and official neighborhood search centers.
- `src/features/discover-cafes/types` — feature-owned TypeScript contracts.
- `src/shared` — Barcelona configuration, coordinates, and shared UI.

Rendering is separate from state transitions and search calculations. The discovery reducer manages draft and applied selections; the hook manages browser requests; café results are calculated from the submitted search. The current feature needs no data-fetching library or backend.

## Development checks

```sh
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Use `npm run format` to apply Prettier formatting. Tests use Node’s built-in test runner and cover distance calculations, radius filtering, ranking ties, neighborhood data, search-state transitions, and location success, fallback, timeout, and cancellation.

Browser validation should cover keyboard interactions, pending location requests, retries, empty results, and mobile/desktop layouts. Automated location scenarios simulate browser callbacks; device accuracy and operating-system permission dialogs depend on the browser and device.

## Documentation

- [Product specification](docs/product-spec.md) — broader MVP direction; includes behavior beyond the current implementation.
- [Architecture](docs/architecture.md) — module responsibilities and conventions.
- [Domain glossary](GLOSSARY.md) — terminology used throughout the project.
- [Editable café search ticket](docs/tickets/004-editable-cafe-search.md) — implemented feature scope and validation.

Live café data, accounts, reviews, favorites, maps, and backend infrastructure are outside the current demo.
