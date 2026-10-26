# shadcn migration experiment

Branch: `experiment/shadcn-ui`.

## Agreed scope

The goal is to reduce interaction complexity maintained by Lattely. Success means
deleting application-written filtering, keyboard navigation, popup management,
and selection behavior in favor of shadcn's underlying primitives. Copied shared
component source and dependencies may increase total repository size; report that
separately rather than treating fewer lines as the only measure.

Use shadcn functionality broadly where it serves the current interface. Adopt
standard combobox/select interactions, including on mobile, rather than rebuilding
the old desktop dialogs and mobile bottom sheets. Small visual changes are
acceptable. Retain Lattely's palette, typography, illustrations, and page composition.

Use the Base UI versions of shadcn components: Combobox directly supplies searchable
selection, and Select handles the six radius choices. Adopt buttons, fields,
cards, badges, and empty-state presentation where applicable. Avoid building new
features to exercise components.

Keep draft versus submitted searches, geolocation cancellation and fallbacks,
ranking, radius calculations, privacy, and demo labels unchanged. Those are
application rules, not UI primitive responsibilities.

## Integration

- Store adapted shadcn source in `src/shared/ui`, with direct named imports and
  authored types in `src/shared/ui/types`.
- Install only dependencies needed by the adopted components. No form library,
  Zod, backend, or data-provider changes.
- Expose semantic theme variables at the document root so portaled popup content
  receives the same palette.
- Preserve accessible names, status announcements, touch targets, viewport-bound
  popup scrolling, and long Catalan place names.
- Retain only the generated component parts used by this experiment. Document
  source provenance and adaptations so updates remain reviewable.

This is a reversible UI experiment, so it does not warrant an ADR. It introduces
no new domain vocabulary for `GLOSSARY.md`.

## Validation

Run repository format, lint, type-check, unit-test, and production-build scripts.
Exercise the controls on localhost with keyboard, mobile and desktop layouts,
draft/submitted selection, filtering/empty suggestions, all radii, and location
outcomes. Record measured code changes and any limits after implementation.

## Implemented result — 22 October 2026

Migrated search centers to Combobox, radius to Select, actions/navigation links to
Button, search fields to Field/Label, featured cafés to Card, ratings and demo/rank
labels to Badge, and empty results to Empty. The hero, illustrations, semantic
result list, search reducer, and browser-location boundary retain their existing
responsibilities. Only whitespace formatting changed in the model files.

The legacy `SearchPicker` and its props contract are deleted. The feature no longer
owns picker filter state, manual arrow-key navigation, option focus movement,
dialog refs, modal opening/closing, or responsive bottom-sheet styling.

Source-size comparison against the branch's starting `HEAD`, counting physical
lines including blanks:

- Global CSS: **888 → 651 lines**, a reduction of 237 lines (about 27%). This
  includes the added document-level semantic theme.
- Legacy picker implementation: **127 lines deleted**.
- Feature UI overall: **593 → 590 lines**. Declarative component composition
  replaces the deleted interaction implementation; JSX size barely changes.
- Shared UI including authored props: **28 → 973 lines**. This includes the
  existing logo and the adapted shadcn source.
- All `src` TypeScript, TSX, and CSS, including existing tests:
  **3,167 → 3,878 lines**, a net increase of 711 lines.
- Six direct dependencies added: Base UI, class-variance-authority, clsx,
  lucide-react, tailwind-merge, and tw-animate-css. Versions are pinned and the
  npm lockfile is updated.

The experiment reduces custom behavioral responsibility, not total source size.
The copied UI layer still requires review and maintenance. No bundle-size or
performance improvement is claimed.

### Source provenance and adaptations

Component source was retrieved on 22 October 2026 from the official shadcn
`https://ui.shadcn.com/r/styles/base-nova/<component>.json` registry for Button,
Combobox, Select, InputGroup, Input, Label, Field, Card, Badge, and Empty. The MIT
license is retained in `src/shared/ui/LICENSE.shadcn`.

Adaptations are limited to direct imports, extracted authored props/types,
retaining the component parts used by this page, resolving registry icon
placeholders to Lucide, and using the standard clsx/tailwind-merge `cn` utility.
Static wrappers remain server-renderable. Registry-only font/menu marker classes
are omitted because this application uses its own explicit theme.

Default form controls are 48 px tall, option targets are at least 44 px, and input
text remains 16 px on mobile. Combobox popup width accounts for its trigger addon;
Base UI handles available viewport space and scrolling. Field and FieldLabel use
Base UI's field primitives to generate label associations automatically, including
while popups hide surrounding content. SearchControls no longer generates IDs or
manually connects labels to controls. The suggestions button has a name.
Navigation retains link semantics. Dark
variants require an explicit `.dark` ancestor instead of reacting to the operating
system without a corresponding dark palette.

On 26 October 2026, manual search-control IDs were replaced with automatic Base UI
field associations. The shared search instructions remain visible below the form;
location updates retain their live status announcements. The source-size figures
above describe the initial 22 October migration snapshot.

The 26 October data simplification uses the same `SearchLocation` object (`id`,
`name`, `center`) in the combobox, draft selection, saved browser location, and
submitted search. Existing barri objects are reused directly. The default square
has the same shape; a successful location request creates one saved/selected
object. The ID-to-name table and ID-based neighborhood searches are removed.
Stable option objects eliminate the need for custom equality comparison. Picking
a new location does not alter the submitted search until Search cafés is pressed.
Radius items use the original configuration objects, including the object whose
`meters` is `null` for Anywhere. A single numeric lookup selects the current radius
object for rendering; selection passes its `meters` straight to the existing
callback. String conversions, the `"anywhere"` sentinel, and the reverse lookup on
selection are removed. The old center-option type is replaced by a radius-option
type derived directly from the existing configuration.

Reducer tests cover reference preservation, all 73 bundled locations, saved
browser-location selection, fallback, retries, and late responses. The suite now
contains 23 tests. Browser-result coordinates still pass through the existing
validation boundary before becoming a selectable location.

### Completed checks

- Repository format check, lint, type-check, unit tests (22), production build,
  and `git diff --check` passed.
- Browser checks covered all six radii, default results, Anywhere's ten cafés,
  empty results, the complete 74-choice initial search-center list, filtered and
  empty suggestions, keyboard selection and dismissal, and edits remaining draft
  until explicit submission.
- The migrated location button showed its disabled locating state, announced the
  ten-second timeout fallback, updated results, and became available for retry.
  Other location outcomes and cancellation races remain covered by the unchanged
  reducer/browser-boundary unit tests.
- Mobile (390 × 844) and desktop (1440 × 1000) layouts were visually inspected.
  Popup bounds and scrolling fit the viewport, long Catalan names wrapped, the
  palette propagated into portals, and no horizontal overflow or browser
  warning/error logs were observed.

Limitations: physical-device keyboards, operating-system permission dialogs, and
screen-reader speech were not manually verified. The package audit reports five
high advisories in the existing Next ESLint toolchain; the affected package
versions match the starting lockfile, and none of the added UI dependencies
appears in the audit report. Updating that unrelated toolchain is outside this
experiment. No commit, push, or deployment was performed.

## Sources

- [shadcn Combobox](https://ui.shadcn.com/docs/components/base/combobox)
- [shadcn Select](https://ui.shadcn.com/docs/components/base/select)
- [shadcn theming](https://ui.shadcn.com/docs/theming)
- [Base UI Combobox](https://base-ui.com/react/components/combobox)
