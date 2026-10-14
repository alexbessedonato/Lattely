# Lattely homepage prototype

Throwaway UI exploration: three layouts with a header/logo, hero, three featured café cards, ranks 4–10, and a footer. All café data, ratings, reviews, and example distances are fictional. Search controls are a disabled preview; the only interactions are navigation and design switching.

## Run locally

Recommended runtime: Node.js 24 LTS (`.nvmrc`). This preview was checked on the available Node.js 26.10.0 runtime. The scripts use Webpack because Turbopack compiler-worker permissions were blocked in this environment.

```sh
npm install
npm run prototype
```

Open the Local URL printed by Next.js, then `/prototype/homepage?variant=A`.

- `A`: Editorial with warm palette — A's layout with C's cream, ochre, and brown colors, following the user's selected direction; three equal featured cards above the ranked list.
- `B`: Night roast — bold dark hero, dominant first place, stacked runners-up.
- `C`: Neighborhood guide — printed-guide layout with featured cards beside the list.

Use the floating arrows or your keyboard's left/right arrows to switch. The selected design is stored in the URL. The switcher is hidden in production builds. The root route redirects to the prototype.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

No database, credentials, external images, or paid APIs are needed. TanStack Query and all backend infrastructure are deferred. Unit/browser test tooling is not installed for this throwaway exploration.

The selected direction is A’s structure with C’s palette. The full exploration is preserved on the `prototype/homepage` Git branch. Rewrite the chosen design as the real homepage in a separate implementation step; no implementation issue is linked yet.
