# Future stack decisions

Status: selected technologies, implementation deferred. These decisions do not authorize adding infrastructure to the current ticket. Hosting and deployment remain undecided.

## Neon and Prisma

Neon PostgreSQL is the selected database, with Prisma ORM for access, persisted models, and migrations. Follow the database-URL gate in `AGENTS.md` before implementing integration.

Application contracts, configuration (`prisma.config.ts`), and seeds use TypeScript; database models use Prisma syntax in `prisma/schema.prisma`. Keep migration history in `prisma/migrations` and the client in `src/server/infrastructure/database/prisma.ts`.

- Use the Prisma schema as the source of truth for persisted models and generate the TypeScript client after schema changes. Define TypeScript search inputs and UI response contracts separately where they differ from persistence; serialize database-specific values at the server boundary.
- Add a Neon-backed provider behind the same search interface when database work begins. Keep the mock provider available for development and tests, and select it explicitly; database errors must not silently switch users to mock results.
- Use a pooled Neon connection for application queries and a direct connection for migration tooling, configured according to the installed Prisma version. Document the required environment variables with placeholders when wiring the database.
- Version schema changes with Prisma Migrate and commit the generated SQL migration history. Use a dedicated development database or Neon branch for migration work. Review migration SQL for data loss before applying it; use migrations rather than untracked schema synchronization for shared databases.
- Make the TypeScript mock-data seed repeatable using stable IDs and preserve its simulated-rating labels. Test database queries and migrations against a separate test database when implementing persistence; ordinary mock tests remain independent of Neon credentials.

## Redis and Socket.IO

- Keep the initial mock experience independent of Redis and Socket.IO. Decide notification triggers, recipients, and history requirements when this feature begins.
- Use Redis Pub/Sub for backend notification events and `socket.io` on the server with `socket.io-client` in the browser. Keep Redis connections and credentials server-only; browsers connect to Socket.IO rather than Redis.
- Run the Socket.IO server in a long-lived Node.js process. Define its local startup command when implementing it; keep hosting decisions deferred.
- Use `@socket.io/redis-adapter` to broadcast across Socket.IO server instances when needed, with separate publishing and subscribing connections. Separate application notification channels from adapter channels and ensure each event is emitted once by the application before adapter fan-out.
- Define shared TypeScript event contracts with an event ID, event type, creation timestamp, recipient scope, and payload. Validate incoming payloads with explicit runtime checks and authorize room membership on the server before delivering private notifications.
- Redis Pub/Sub and default Socket.IO delivery are at-most-once: disconnected recipients can miss events. If notification history or unread state is required, persist notifications in Neon through Prisma and fetch missed records on reconnect; deduplicate by event ID. Treat Pub/Sub as transient delivery, not durable storage.
- Clean up client listeners on unmount and handle reconnects without duplicate listeners. When implementing notifications, test recipient isolation, Redis unavailability, disconnect/reconnect behavior, and event deduplication.

Notification references: [Redis Pub/Sub](https://redis.io/docs/latest/develop/pubsub/), [Socket.IO Redis adapter](https://socket.io/docs/v4/redis-adapter/), [Socket.IO delivery guarantees](https://socket.io/docs/v4/delivery-guarantees/).

## Jaeger

- Use OpenTelemetry to instrument server search requests, Prisma database operations, and Redis/Socket.IO notification flows as they are introduced. Export traces to Jaeger through OTLP; Jaeger covers tracing, while logging and metrics choices remain undecided.
- Propagate trace context across backend calls and notification events so related operations can be inspected together. Correlate structured logs with trace IDs when logging is introduced.
- Keep secrets, precise user coordinates, and private notification payloads out of trace attributes. Configure sampling and exporter settings when integrating tracing, and ensure exporter failures do not break application requests.
- Keep tracing optional for local development and ordinary tests. When implemented, verify that a representative backend flow appears in Jaeger with connected spans and useful timing/error information; document local startup separately from any future hosting decision.

Observability reference: [Jaeger OTLP APIs](https://www.jaegertracing.io/docs/2.20/architecture/apis/).

## Live café data

No live provider or map provider is selected. Verify Barcelona coverage, rating/review-count availability, costs, attribution, retention, and applicable regional terms before choosing one. Preserve mock data for development and deterministic tests, but show live failures honestly rather than substituting simulated ratings.

If evaluating Google Places, consult [Nearby Search](https://developers.google.com/maps/documentation/places/web-service/nearby-search), [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies), and [EEA guidance](https://developers.google.com/maps/comms/eea/places). Nearby Search returns up to 20 candidates and ranks by popularity/distance; client rating sorting would rank those returned candidates. Check current restrictions before designing storage, caching, attribution, or maps. Validate future server inputs and decide quotas and request limits during integration.

References: [Prisma schema](https://docs.prisma.io/docs/orm/prisma-schema/overview), [Prisma configuration](https://docs.prisma.io/docs/orm/reference/prisma-config-reference). Consult current version-matched Neon/Prisma connection guidance when implementing.
