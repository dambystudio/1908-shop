# Implementation Plan for 1908 Shop

## Feature Analysis

### Identified Features

1. Product catalog (listing, detail pages)
2. Category hierarchy & navigation (competitions, mystery box, retro, reviews, contacts, home)
3. Product filtering (competition, club, season, size, availability)
4. Product customization (name + number, patches, variants)
5. Dynamic pricing (base + customization + surcharges)
6. Virtual cart (client-side, persistent)
7. Instagram DM handoff with prefilled message
8. TinaCMS integration (products, categories, reviews content editing)
9. Review management & moderation (post-MVP R1)
10. SEO essentials (metadata, OG tags, sitemap, structured data)
11. Performance optimizations (SSG/ISR, image optimization, lazy loading)
12. Accessibility compliance (focus states, ARIA, contrast)
13. Analytics event tracking (view_item, add_to_cart, begin_checkout_DM, click_igme)
14. Disclaimers & legal notices (footer + product pages)
15. Pricing rules & validation (name length, number range, patch compatibility)
16. Stock by size display & validation
17. Mystery Box landing (R1)
18. Advanced search & filtering (R1)
19. Internationalization (R2)
20. Seasonal collections (R2)
21. Optional future Strapi integration (R2+)
22. Image handling & responsive variants (MVP baseline, improved R1)
23. Editor /admin route with protected Tina dashboard
24. Sitemap & robots.txt generation
25. Build pipeline & CI (lint, test, type check, deploy)

### Feature Categorization

- Must-Have (MVP): 1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,22,23,24,25
- Should-Have (R1): 9,17,18
- Nice-to-Have (R2+): 19,20,21

## Recommended Tech Stack

### Frontend

- Framework: Next.js (App Router) + TypeScript — Hybrid SSG/ISR, file-based routing, strong ecosystem.
  Docs: https://nextjs.org/docs
- Styling: Tailwind CSS — Rapid utility-first styling & dark theme support.
  Docs: https://tailwindcss.com/docs
- State Mgmt: Lightweight (React Context + custom hooks) for cart & pricing; no Redux overhead initially.
- Forms/Validation: Zod + React Hook Form for robust schema validation.
  Docs: https://zod.dev/ / https://react-hook-form.com/
- Image Optimization: Next.js Image component.

### CMS

- TinaCMS / Tina Cloud — Visual editing, Git-backed content.
  Docs: https://tina.io/docs

### Data Persistence

- File-based (JSON/MD/MDX) stored in repo for products/categories (MVP) via Tina collections.
- Potential future: Strapi + Postgres (R2+).
  Docs: https://docs.strapi.io/

### Analytics

- Plausible or Google Analytics (choose one; start with GA if attribution needed).
  GA Docs: https://developers.google.com/analytics

### Testing & Quality

- Unit/Integration: Vitest + Testing Library React.
  Docs: https://vitest.dev/ | https://testing-library.com/docs/react-testing-library/intro/
- Linting: ESLint + Prettier + TypeScript ESLint.
- Accessibility: axe-core (jest-axe) for component-level checks.
  Docs: https://github.com/nickcolley/jest-axe

### Tooling & Dev Experience

- Package Manager: pnpm (performance & consistency)
  Docs: https://pnpm.io/motivation
- Commit Hooks: Husky + lint-staged.
- CI: GitHub Actions (lint, type-check, test, build).

### Deployment & Hosting

- Vercel (native Next.js support, ISR, image optimization).
  Docs: https://vercel.com/docs

### Optional / Future

- i18n: next-intl when R2 begins.
  Docs: https://next-intl-docs.vercel.app/

## Implementation Stages

### Stage 1: Foundation & Setup

Duration: ~4 days
Dependencies: None
Status: ✅ COMPLETED

Sub-steps:

- [x] Initialize repository with pnpm + TypeScript + Next.js App Router
- [x] Configure Tailwind (dark theme tokens: black/red/gray palette)
- [x] Initialize ShadCN UI (init wizard, add core primitives: button, input, form, dialog, sheet, badge, alert, skeleton)
- [x] Add ESLint, Prettier, editorconfig, commitlint, Husky hooks
- [x] Set up basic layout (Header/Nav/Footer skeleton with placeholder links & disclaimer)
- [x] Implement theme colors & typography scale
- [x] Configure TinaCMS basic schema placeholder (products, categories draft)
- [x] Set up cart context (empty implementation + persistence via localStorage)
- [x] Add Zod + React Hook Form utilities folder
- [x] Add testing framework (Vitest + RTL + jest-axe) with example test
- [x] CI pipeline (lint, typecheck, test)
- [x] Vercel project & environment config (preview + production) - TODO: Deploy to Vercel

### Stage 2: Core Features (MVP Functional)

Duration: ~8–10 days
Dependencies: Stage 1

Sub-steps:

- [ ] Define Tina collections: Product, Category with full schema & field validations
- [ ] Implement product data loading (static generation w/ fallback or ISR)
- [ ] Product listing pages (categories, competition filters)
- [ ] Dynamic filters (competition, club, season, size availability)
- [ ] Product detail page layout (gallery, details panel, disclaimers)
- [ ] Customization module (name+number fields, validation, surcharge calculation)
- [ ] Patch selection UI & price accumulation rules
- [ ] Dynamic price calculator hook (base + surcharges + customization)
- [ ] Virtual cart add/remove/update with persistence
- [ ] IG DM link generator (encoded text) with fallback copy panel
- [ ] Analytics events instrumentation (view_item, add_to_cart, begin_checkout_DM, click_igme)
- [ ] Accessibility review (keyboard nav, ARIA labels, contrast checks)
- [ ] Sitemap & robots, basic SEO metadata utilities

### Stage 3: Advanced (R1 Scope)

Duration: ~6–7 days
Dependencies: Stage 2

Sub-steps:

- [ ] Reviews collection & moderation workflow (status field, only published rendered)
- [ ] Review component & rating display
- [ ] Mystery Box landing page (curated content + CTA)
- [ ] Advanced search (client-side index by competition/season/club)
- [ ] Enhanced image optimization (blur placeholders, aspect ratio component)
- [ ] Performance pass (LCP tuning, prefetch, bundle analysis)

### Stage 4: Polish & Optimization / R2 Prep

Duration: ~5 days
Dependencies: Stage 3

Sub-steps:

- [ ] Internationalization scaffold (abstract text, prepare namespaces)
- [ ] Seasonal collections grouping logic
- [ ] Evaluate Strapi integration spike (tech note only)
- [ ] Refine analytics dashboard definitions (doc + custom dimensions)
- [ ] Comprehensive accessibility audit (axe scan + manual)
- [ ] Lighthouse performance & SEO improvements
- [ ] Final documentation pass & handover checklist

## Task Dependencies Overview

- Stage 2 hinges on working schema + layout primitives from Stage 1.
- Pricing calc depends on schema field consistency (priceBase, patch surcharges, customization flags).
- IG link generation depends on cart & pricing.
- Reviews depend on extended Tina schema.
- i18n preparation depends on extraction of static strings.

## Effort & Resource Assumptions

- Team: 1–2 devs + 1 part-time content editor
- Velocity: ~6–8 substantial tasks per week per dev
- Buffer: 15% reserved for refactors & unforeseen issues

## Risks & Mitigations

- Risk: Schema churn causing rework → Mitigate by finalizing schema early with editor feedback.
- Risk: Performance regressions (images) → Use Next Image + WebP early.
- Risk: DM prefill inconsistencies → Provide on-page copy fallback of cart summary.
- Risk: Over-engineering state mgmt → Keep context minimal; escalate to Zustand only if needed.

## Quality & Acceptance Gates

- LCP < 2.5s on mobile listing & product pages (test with WebPageTest + Lighthouse CI)
- All forms accessible & validated client-side
- No console errors/warnings in production build
- 90+ Lighthouse Perf / Best Practices / SEO / Accessibility baseline

## Resource Links

- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TinaCMS: https://tina.io/docs
- React Hook Form: https://react-hook-form.com/
- Zod: https://zod.dev/
- Vitest: https://vitest.dev/
- Testing Library: https://testing-library.com/
- jest-axe: https://github.com/nickcolley/jest-axe
- Vercel: https://vercel.com/docs
- pnpm: https://pnpm.io/
- Google Analytics: https://developers.google.com/analytics
- Lighthouse: https://developer.chrome.com/docs/lighthouse/overview/

## Notes

This plan focuses on rapid MVP delivery with a content-first approach leveraging Git-backed CMS. Future backend/API complexity deferred until validated need (R2).
