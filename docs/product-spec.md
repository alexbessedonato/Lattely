# Product specification

## Purpose and scope

Lattely helps coffee enjoyers discover highly rated cafés near a selected location. Barcelona is the initial service area. The MVP uses local fictional café data, with simulated ratings on every record; live café data is undecided.

This describes the complete mock MVP. The current ticket implements only its first static page; later behavior is not part of that ticket.

## MVP behavior

- On first load, automatically attempt browser geolocation before choosing the initial search center. Show a locating state while waiting, and use the user's coordinates when available within Barcelona coverage. Avoid duplicate requests during React development remounts.
- If permission is denied, location is unavailable, the request times out, or geolocation is unsupported, automatically use Plaça de Catalunya as the fallback center. Set a finite timeout and clearly label the fallback and its reason. Offer a small set of named Barcelona locations, a “Use Plaça de Catalunya” option while locating, and a “Use my location” button for an explicit retry. Use localhost for local development with browser geolocation.
- Keep Barcelona coverage in one configuration module. For the mock MVP, use a documented approximate service-area bounding box for validating search centers, not a claimed municipal boundary. If the retrieved location is outside coverage, automatically fall back to Plaça de Catalunya with a visible explanation. Manual selections must be within coverage.
- Offer radius options of 500 m, 1 km, 2 km, 5 km, 10 km, and “Anywhere”; default to 2 km. Keep these options and the default in the shared configuration module. Store and calculate finite distances in meters; represent “Anywhere” explicitly as `radiusMeters: null`, rather than zero or an arbitrary large number.
- Run the initial search once geolocation or the fallback resolves, then search on explicit form submission. Ignore late geolocation responses after the user selects a location or chooses the fallback, and cancel or ignore obsolete searches so an earlier response cannot overwrite a newer selection.
- Include cafés at or inside a finite radius using Haversine distance from the search center. “Anywhere” removes the distance filter and includes all cafés in the Barcelona dataset; Barcelona coverage still applies. Continue calculating distances for display and “Nearest” sorting. Display distance as approximate straight-line distance; walking time is outside the MVP.
- Sort by rating descending, review count descending, distance ascending, and ID ascending for deterministic ties. Offer “Nearest” as an alternative, using rating and ID as tie-breakers. Explain the selected sort in the interface.
- Show name, rating out of 5, review count, address or neighborhood, and distance on each result. Include an empty state with a way to increase the radius, plus loading and error states.
- Label the experience visibly as demo data and label ratings as simulated. Mock ratings never represent verified public reviews or endorsements of real businesses.
- Start with English UI copy, keep strings easy to extract, and preserve Catalan/Spanish place names. Use the Europe/Madrid timezone if opening-hour features are introduced.
- Accounts, user-written reviews, favorites, embedded maps, arbitrary address autocomplete, payments, live opening hours, and notifications are outside this first version.

## Mock data

Create at least 20 fictional cafés across several Barcelona neighborhoods for the complete mock MVP. Each has a rating and review count, geographically plausible coordinates, and a stable ID. Use varied locations and scores to demonstrate radius changes and ranking. Avoid copying real reviews or photos.

## Acceptance checks for the complete mock MVP

- Verify exact-radius inclusion, exclusion outside the radius, ranking ties, coordinate validation, and consistent distance units.
- Verify “Anywhere” returns the complete mock Barcelona dataset while retaining distance display and sorting.
- Cover the default 2 km selection and every radius option.
- Cover automatic geolocation, success, fallback for denial/unavailability/timeout/unsupported browsers/outside coverage, explicit retry, and manual selection overriding a pending location request.
- Check loading, errors, empty results, mobile and desktop layouts, keyboard navigation, visible focus, labeled inputs, and announced result/status changes.

## Privacy

Keep user coordinates in memory for the current search. Exclude them from URLs, persistent browser storage, application logs, and trace attributes. The mock version searches locally and needs no external café-data request.
