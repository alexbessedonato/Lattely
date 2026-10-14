# Lattely

A static Barcelona café discovery demo built with Next.js, React, TypeScript, and Tailwind CSS 4. The homepage uses the selected editorial layout and warm cream/ochre/brown palette.

It displays ten fictional cafés: three featured cards, then ranks 4–10 in a list. Ratings, review counts, and example distances are simulated. Location, radius, sort, and search controls are disabled and labeled “Preview — search coming next.” Navigation links only move between sections of the page.

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
npm run build
```

No database, API keys, external assets, or additional services are required. Geolocation, filtering, sorting behavior, TanStack Query, and all backend infrastructure remain deferred beyond ticket 001.

## Prototype reference

The original UI exploration is preserved in Git commit `946c3f1` (`chore: initial UI prototype`). Inspect it with `git show 946c3f1:src/features/discover-cafes/ui/homepage-prototype.tsx`. No separate prototype branch is needed.
