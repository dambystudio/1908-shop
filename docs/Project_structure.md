# Project Structure - 1908 Shop

## Overview

Structure optimized for Next.js (App Router), TinaCMS content, modular domain separation (catalog, cart, customization), and future scalability (i18n, potential Strapi integration).

```
1908-shop/
├─ .editorconfig
├─ .env.local                # Local env (Tina keys, analytics IDs) - not committed
├─ .env.example              # Placeholder vars
├─ package.json
├─ pnpm-lock.yaml
├─ next.config.mjs
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ tsconfig.json
├─ lint-staged.config.mjs
├─ commitlint.config.cjs
├─ README.md
├─ /public                   # Static assets (logos, favicon, og images)
│  ├─ images/                # Rare static images (most via CMS)
│  └─ icons/
├─ /tina                     # TinaCMS config & generated files
│  ├─ config.ts              # Collections & schema
│  ├─ client/                # Tina client helpers
│  └─ types/                 # Generated types
├─ /content                  # Git-backed CMS content
│  ├─ products/              # Product JSON/MD (one per product)
│  ├─ categories/            # Category definitions
│  ├─ reviews/               # (R1) Review entries
│  ├─ pages/                 # Static marketing/FAQ MDX
│  └─ media/                 # Uploaded images (if stored in repo)
├─ /src
│  ├─ app/                   # Next.js App Router structure
│  │  ├─ layout.tsx          # Root layout
│  │  ├─ page.tsx            # Home
│  │  ├─ (catalog)/          # Route group for product navigation
│  │  │  ├─ products/
│  │  │  │  ├─ page.tsx      # Product listing w/ filters
│  │  │  │  └─ [slug]/page.tsx  # Product detail
│  │  │  ├─ categories/[category]/page.tsx
│  │  │  └─ competition/[competition]/page.tsx
│  │  ├─ mystery-box/ (R1)
│  │  ├─ reviews/ (R1)
│  │  ├─ api/                # Edge/serverless (minimal - e.g., sitemap.xml if dynamic)
│  │  │  └─ revalidate/route.ts (optional manual revalidation endpoint)
│  │  ├─ sitemap.ts          # Sitemap generator
│  │  └─ robots.txt          # Robots rules
│  ├─ components/            # Reusable UI (buttons, modals, inputs, etc.)
│  │  ├─ ui/                 # Primitive design-system components
│  │  ├─ layout/             # Header, Footer, Navigation
│  │  ├─ product/            # Product-specific components
│  │  ├─ cart/               # Cart drawer, mini-cart, summary
│  │  ├─ forms/              # Form field abstractions (RFH + Zod integration)
│  │  └─ analytics/          # Event boundary helpers
│  ├─ domains/               # Business logic modules
│  │  ├─ product/            # Parsing, price calc, validation
│  │  │  ├─ price.ts         # Price composition logic
│  │  │  ├─ schema.ts        # Zod schemas for product & customization
│  │  │  └─ filters.ts       # Filter predicate utilities
│  │  ├─ cart/
│  │  │  ├─ cart-context.tsx # React context provider
│  │  │  ├─ cart-storage.ts  # localStorage abstraction
│  │  │  └─ cart-utils.ts    # Derivations (totals, message encode)
│  │  ├─ analytics/
│  │  │  ├─ events.ts        # Event name constants
│  │  │  └─ tracker.ts       # Dispatch abstraction
│  │  └─ review/ (R1)
│  ├─ lib/                   # Generic helpers (formatting, env, logger)
│  │  ├─ env.ts
│  │  ├─ format.ts
│  │  └─ seo.ts
│  ├─ hooks/                 # Reusable hooks (e.g., useMediaQuery, useHydrated)
│  ├─ styles/
│  │  ├─ globals.css         # Tailwind base + theme tokens
│  │  └─ utilities.css       # Layered custom utilities if needed
│  ├─ analytics/             # Analytics initialization layer
│  │  └─ ga.ts
│  ├─ middleware.ts          # (If needed for redirects / headers)
│  └─ types/                 # Shared TS types (non-generated)
├─ /tests
│  ├─ unit/
│  ├─ integration/
│  └─ accessibility/
├─ /scripts                  # Build/maintenance scripts (e.g., price audits)
├─ /Docs                     # Project documentation (this folder)
│  ├─ Implementation.md
│  ├─ project_structure.md
│  └─ UI_UX_doc.md
└─ /.github/workflows        # CI pipelines
```

## Folder Purpose Details

- /content: Source of truth for CMS-managed entities. Keeps deploys atomic via Git.
- /tina: Configuration & generated types enabling strong typing at build.
- /src/domains: Encapsulates business rules separate from UI components.
- /src/components/ui: Low-level primitives that enforce design system.
- /src/components/product: Composition-focused product UI pieces.
- /src/domains/product/price.ts: Pure functions for deterministic pricing (easily unit tested).
- /src/domains/cart: Isolation for persistence & transformation logic.
- /tests: Mirrors domain & component structure for clarity.

## Naming Conventions

- Files: kebab-case for components except React components in PascalCase when co-located (e.g., ProductCard.tsx)
- Types: Suffix with `Type` or domain-specific (Product, Category)
- Hooks: usePrefix (e.g., useCart, usePricePreview)
- Tests: _.test.ts / _.test.tsx

## Styling & Theming

- Tailwind configured with custom color palette: primary-red, bg-black, gray scale tokens.
- Design tokens (spacing, font sizes) centralized in tailwind.config.cjs.
- Avoid CSS-in-JS initially—prefer Tailwind utilities; extract patterns into components.

## Data & Schema

- Product files: /content/products/<slug>.json (or .mdx if narrative needed) containing all fields from PRD (base price, patches).
- Category files: /content/categories/<slug>.json with ordering & type.
- Reviews (R1): /content/reviews/<id>.json with moderation flag.

## Environment Configuration

- .env.example includes: TINA_CLIENT_ID=, TINA_READ_KEY=, GA_MEASUREMENT_ID=
- Runtime env loaded via /src/lib/env.ts with zod validation; build fails if missing required vars.

## Build & Deployment

- Vercel handles builds; ISR configured per page (e.g., revalidate: 3600 for product listing pages).
- pnpm scripts: dev, build, start, lint, typecheck, test, test:watch, analyze (bundle analyzer optional).

## Testing Strategy

- Unit: price calculation, filter logic, cart totals.
- Integration: add-to-cart flow, DM link generation encoding.
- Accessibility: Product detail, listing page, cart overlay.

## Analytics Integration

- /src/analytics/ga.ts initializes GA; events centralized in domains/analytics/events.ts.
- Abstraction ensures swappable provider (Plausible later if desired).

## Future Expansion Points

- Strapi integration: New /src/services/api/ for networked data.
- i18n: Introduce /src/i18n/ with message catalogs; wrap layouts with IntlProvider.
- Image CDN: Optionally configure remotePatterns in next.config.mjs for external asset hosting.

## Documentation Placement

- All architectural decisions appended to /Docs/Implementation.md under Notes or new ADR files (future /Docs/adr/).

## Security & Validation

- All external input (query params) validated with zod prior to usage.
- Edge runtime considered for lightweight dynamic endpoints (e.g., incremental search suggestions) if introduced.

## Performance Considerations

- Preload key font(s) in root layout.
- Use Next/Image for all product images with defined width/height to avoid layout shifts.
- Defer non-critical analytics until after first interaction or on idle.

## Accessibility Practices

- Semantic elements; ensure alt text from product content; validation errors announced via aria-live regions.

## CI Workflow Outline

- jobs: install (pnpm fetch), lint, typecheck, test, build, upload artifacts, optional lighthouse CI on preview.

## Conclusion

This structure enforces separation of concerns, testability, and scalability while remaining lean for MVP velocity. Adjust domains as complexity grows (avoid premature abstraction).
