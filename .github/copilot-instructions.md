# AI Agent Instructions for 1908 Shop

Always load and prioritize:

- `rules/workflow.mdc` (execution workflow & critical rules)
- `Docs/Implementation.md` (current stage, tasks, dependencies)

## Project Phase

- Current target: Stage 1 (Foundation & Setup) + integrate ShadCN UI early.

## Core Principles

1. Follow the workflow in `rules/workflow.mdc` before any change.
2. All new code must align with structures defined in `Docs/project_structure.md`.
3. UI components should leverage ShadCN primitives (in `src/components/ui`) and respect design tokens from `Docs/UI_UX_doc.md` (dark theme: black/red/gray).
4. Keep state minimal (React context only for cart). Use pure functions in `src/domains/*` for business logic.
5. Validate all environment variables with a Zod schema (`src/lib/env.ts`). Build should fail if required vars are missing.
6. Pricing logic isolated in `src/domains/product/price.ts` (pure, testable). No pricing logic inside components.
7. Filtering logic centralized in `src/domains/product/filters.ts`.
8. Cart persistence uses localStorage wrapper (`src/domains/cart/cart-storage.ts`). Never access `window` outside effect boundaries.
9. Each task: implement → lint/type/test locally → document noteworthy decisions (update docs if structural).
10. Accessibility is not optional: maintain focus order & aria-live updates for dynamic price/cart.

## Stage 1 Mandatory Deliverables

- Next.js (App Router) + TypeScript + pnpm setup
- Tailwind + ShadCN UI initialized (dark class strategy)
- Base layout: Header/Footer placeholders
- Cart context scaffold (empty operations + provider)
- TinaCMS minimal config stub (collections placeholder)
- Zod + React Hook Form utilities folder
- Testing stack: Vitest + Testing Library + jest-axe sample test
- ESLint + Prettier + Husky + lint-staged + commitlint
- CI workflow: install, lint, typecheck, test, build
- Env validation utility + `.env.example`

## Conventions

- Business logic: `src/domains/<domain>/<area>.ts`
- Reusable primitives: `src/components/ui/*` (from ShadCN or thin wrappers)
- Composite feature components: `src/components/product/*`, `src/components/cart/*`
- Tests mirror file path under `/tests` or colocated `*.test.ts` for pure functions.
- Use named exports; avoid default unless a page/layout component.

## Implementation Order (Stage 1)

1. Initialize Next.js + pnpm + TypeScript.
2. Add Tailwind config & ShadCN init; import base styles in `src/styles/globals.css`.
3. Scaffold `src/app/layout.tsx` + `src/app/page.tsx`.
4. Create `src/components/layout/Header.tsx` & `Footer.tsx` with placeholders.
5. Add cart context & provider in `src/domains/cart` and wrap root layout.
6. Set up `tina/config.ts` with minimal schema (Product, Category placeholders).
7. Add env validation (`src/lib/env.ts`) + `.env.example`.
8. Add `eslint` + `prettier` + configs + scripts.
9. Add Vitest + Testing Library + jest-axe; write sample price calc test stub.
10. Add Git hooks (Husky) + lint-staged + commitlint config.
11. Create GitHub Actions workflow performing lint/type/test/build.
12. Document any deltas in `Docs/Implementation.md` if scope changes.

## Key File Patterns (Example Stubs)

- `src/domains/product/price.ts`: pure functions returning computed totals with inputs `{ base, patches[], customization? }`.
- `src/domains/cart/cart-context.tsx`: context with actions: addItem, removeItem, updateCustomization, clear.
- `src/lib/env.ts`: zod schema parse(process.env) exporting typed config.

## Testing Expectations

- All domain pure functions must have at least one unit test before integration usage.
- Accessibility test at least for one initial component (e.g., Button) using jest-axe.

## When Adding Dependencies

- Check: is it essential for MVP? If not, defer.
- Update `Docs/project_structure.md` only if structure meaningfully changes.

## Non-Goals in Stage 1

- No real review system, search index, or internationalization code yet.
- No external backend (Strapi) integration.

## Failure Handling

- If a planned step is blocked (e.g., Tina credentials absent), create placeholder & mark required env var in `.env.example` with TODO comment.

## Output Discipline

- Never duplicate logic across UI and domain layers.
- Keep ShadCN overrides in CSS variables rather than editing component internals unless necessary.

End of instructions.
