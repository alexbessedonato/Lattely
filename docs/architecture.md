# Architecture

Use these conventions when implementing a ticket. This is a placement guide, not a requirement to build every folder or adapter now. The current nearby-results slice needs routes, feature UI, typed fixtures, and pure distance/filtering functions. Its local calculation needs no provider or query wiring.

## Modules and responsibilities

- Use a lightweight feature-based architecture inspired by Feature-Sliced Design. Group frontend code by user capability and backend code by domain; the repository does not adopt the full formal FSD layer hierarchy.
- Keep Next.js routing, layouts, provider wiring, and thin HTTP handlers in `src/app`. Route files compose features or delegate to backend use cases; features and backend modules do not import route files.
- Keep café discovery in `src/features/discover-cafes`. Within each feature, use `ui` for React components, `model` for hooks, state orchestration, and business rules, `api` for query definitions and data-provider adapters, `lib` for feature-local helpers, `types` for TypeScript declarations, and `data` for mock fixtures. Create only the segments needed by that feature.
- Use `ui` as the component folder, without a parallel `components` folder. Presentational components receive data and callbacks through props. Components may own visual state such as expanded panels; geolocation orchestration, fetching, filtering, and ranking live outside rendering code.
- Give independently meaningful utility functions separate descriptively named files, such as `calculate-haversine-distance.ts` and `rank-cafes.ts`. Keep tiny private helpers beside their owning function. Place domain-specific logic with its feature or backend domain; move genuinely reusable utilities into focused `src/shared/lib` folders rather than a global miscellaneous utilities file.
- Keep generic reusable controls in `src/shared/ui`, browser-safe configuration in `src/shared/config`, and serializable TypeScript contracts shared by frontend and backend in `src/shared/types`. Barcelona coverage, fallback coordinates, and radius options belong in `src/shared/config/barcelona.ts`. Shared modules do not import features, routes, or backend modules.
- Place authored type aliases and interfaces, including component props, search inputs, and repository contracts, in the nearest owning `types` folder. Use descriptive files such as `types/prototype-cafe.ts` and `types/cafe-card-props.ts`, with direct `import type` imports. Shared declarations belong in `src/shared/types`; types exclusive to a shared UI module can live in that module's own `types` folder. Keep runtime implementations outside these folders. Prisma schema and generated client types remain in their tool-managed locations.
- Keep each feature's externally consumed components, hooks, and contracts explicit through named files; internal helpers remain owned by that feature. Compose cooperating features at the route level and avoid circular feature dependencies.
- Group backend code under `src/server/modules/<domain>`, beginning with `cafes` when persistence is introduced and adding `notifications` later. Keep `entities`, `types`, `use-cases`, and `repositories` inside each domain as needed, rather than global folders containing every domain's entities or services.
- Backend entities express domain data and meaningful business rules. Begin with typed data and pure functions; introduce richer objects only when behavior warrants them. Prisma models describe persistence, and browser response contracts describe transferred data; map between these representations where their shapes differ rather than duplicating models mechanically.
- Backend use cases coordinate domain behavior and data access; repository interfaces and adapters belong to their domain. Introduce a repository seam when implementations actually vary or persistence needs isolation, and avoid layers that only forward calls unchanged.
- Keep cross-domain infrastructure in `src/server/infrastructure`, including the Prisma client in `database/prisma.ts` and later Redis, Socket.IO setup, and tracing. Mark server entry modules with `server-only`; browser features reach backend use cases through HTTP rather than importing server code. Shared contracts contain no Prisma client imports or infrastructure dependencies.
- Define a `Cafe` model with `id`, `name`, `latitude`, `longitude`, `address`, `neighborhood`, `rating`, `reviewCount`, and `source`. Mock IDs are stable; `source` is `mock`. Ratings are finite values from 1 to 5; review counts are positive integers; coordinates are valid WGS84 values.
- Define one provider boundary: `searchNearby({ center, radiusMeters })` returns café candidates and coverage metadata, with `radiusMeters` typed as `number | null`. Validate finite values against the configured radius options and accept `null` only as “Anywhere”. Keep provider loading separate from pure distance, radius filtering, and ranking functions. The mock provider should support an asynchronous interface without artificial production delays.
- Return coverage as `mock-dataset` for fixtures; the UI must make clear that results only cover the demo dataset. A later provider must describe its own limits rather than imply an exhaustive city ranking.
- Validate data when it enters the application. UI components consume the normalized domain model, not provider-specific payloads. Treat malformed data as an actionable error rather than silently manufacturing ratings.
- Keep browser geolocation and interactive controls in client components; keep Prisma, database credentials, future secrets, and live-provider requests on the server. Keep form selections in React state and derive sorted results from TanStack Query data rather than copying results into local state.
- Provide a stable browser QueryClient through a client-side QueryClientProvider. Query the asynchronous mock provider now and the server search endpoint later. Include provider identity, submitted center coordinates, and radius (including `null` for “Anywhere”) in query keys; keep sorting local while the provider returns all candidates for that search.
- Enable café queries only after the initial location resolves or search inputs are submitted. Separate draft controls from submitted search parameters. Configure caching and refetch behavior explicitly so window focus or reconnect does not trigger unsolicited searches; allow an explicit resubmission to refresh results. Keep query caches in memory and give tests isolated QueryClients.

## Folder guide

```text
src/
├── app/                         Next.js routes, layouts, and provider wiring
│   └── api/                     Later: thin HTTP handlers calling backend use cases
├── features/
│   └── discover-cafes/
│       ├── ui/                  Café cards and search controls; rendering
│       ├── model/               Hooks, state orchestration, filtering, ranking
│       ├── api/                 Query options and mock/server data adapters
│       ├── lib/                 Helpers used only by café discovery
│       ├── types/               Feature types, interfaces, and component props
│       └── data/                Typed fictional café fixtures
├── shared/
│   ├── ui/                      Generic controls reused across features
│   ├── config/barcelona.ts      Coverage, fallback coordinates, radius options
│   ├── types/                   Shared browser-safe types and data contracts
│   └── lib/geo/                 Reusable distance calculations
└── server/                      Later: server-only code
    ├── modules/
    │   ├── cafes/
    │   │   ├── entities/        Domain objects and meaningful business rules
    │   │   ├── types/           Domain types and repository contracts
    │   │   ├── use-cases/       Backend actions coordinating domain behavior
    │   │   └── repositories/    Domain-owned persistence interfaces/adapters
    │   └── notifications/      Later: notification behavior
    └── infrastructure/         Later: Prisma, Redis, Socket.IO, tracing setup
prisma/                         Later: schema, SQL migrations, TypeScript seed
prisma.config.ts                Later: Prisma configuration in TypeScript
tests/e2e/                      Browser journeys; unit tests live beside source
```

## Dependency direction

Routes compose feature modules. Features consume shared modules. Shared modules stay independent of features and routes. Browser features call backend HTTP handlers; they never import server modules. Backend use cases coordinate domain logic and repositories, with infrastructure kept server-only.

Keep feature entry points explicit through named files. The direct-import rules in `AGENTS.md` apply throughout this structure.

## Tooling

Use npm with a committed lockfile. At scaffolding, select compatible stable releases and an active Node.js LTS supported by Next.js, recording the runtime version. Tailwind CSS 4 uses CSS-first configuration and the Next.js PostCSS integration. Use small explicit runtime checks where data enters the application; TypeScript alone does not validate incoming data.

TanStack Query is selected for asynchronous café-data searches when that slice begins. The current synchronous fixture calculation does not need query/provider wiring. Use Node's built-in test runner for the current pure distance/filtering behavior; introduce Vitest or Playwright when a later ticket needs their additional capabilities. Record actual commands in `package.json` and `README.md`.
