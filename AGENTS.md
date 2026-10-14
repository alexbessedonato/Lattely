# Lattely — agent rules

Applies throughout this repository. Build one complete ticket at a time; planned technology is not permission to implement future features.

## Always-on rules

- Use Next.js App Router, React, strict TypeScript, and Tailwind CSS 4. TanStack Query is selected for asynchronous data when needed. Leave Zod out.
- Use lightweight feature-based organization. Separate rendering from orchestration and business rules; keep meaningful utilities in individually named files and tiny private helpers with their owner.
- Keep authored TypeScript types and interfaces in the owning feature or backend domain's `types` folder, including component props. Put types shared across modules in `src/shared/types`; use named files and direct `import type` imports.
- Use direct imports from named files. No barrel files, re-export wrappers, or files named `index` with any extension in repository-authored code.
- Create only folders, abstractions, dependencies, and tests needed for the current ticket. Keep local mock development independent of future infrastructure.
- Do not implement or provision a local database, including PostgreSQL, SQLite, or containers. Wait for the user's Neon URL before database integration, migrations, or seeding.
- Keep credentials out of committed files and logs, and keep server-only dependencies out of browser code.
- Run checks appropriate to the slice using actual repository scripts. Report changes, validation, and remaining limitations; stop at the ticket's scope.

## Read on demand

- Before implementing the next slice, read `docs/tickets/001-static-page.md`. It is the current ticket; update this pointer when a later ticket becomes current.
- When defining user-visible behavior or checking MVP requirements, read `docs/product-spec.md`. The full MVP scope does not expand the current ticket.
- When placing code, designing data/provider interfaces, or changing module dependencies, read `docs/architecture.md`. Its folder guide is created incrementally.
- Before work involving Neon/Prisma, notifications, tracing, live café providers, or deployment, read `docs/decisions/future-stack.md`. Those integrations remain deferred until requested.

Commands belong in `package.json` and local setup in `README.md`; keep these rules short rather than copying implementation details here.

## Required context

Before planning or implementing work:
1. Read `docs/product-spec.md`.
2. Read the current ticket named in the user request under `docs/tickets/`.
3. Read `docs/architecture.md` only when the ticket changes application structure,
   data flow, or a provider boundary.
4. Read `docs/decisions/` only when the ticket concerns the decision’s subject.
