# 1908 Shop

E-commerce vetrina per abbigliamento da calcio con personalizzazioni e ordini via Instagram DM.

## Stack Tecnologico

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **CMS**: TinaCMS (file-based)
- **State Management**: React Context (cart)
- **Forms & Validation**: React Hook Form + Zod
- **Testing**: Vitest + Testing Library + jest-axe
- **Package Manager**: pnpm

## Comandi Disponibili

```bash
# Development
pnpm dev                  # Start dev server (localhost:3000)
pnpm dev:tina            # Start with TinaCMS admin (/admin)

# Build & Production
pnpm build               # Production build
pnpm build:tina          # Build with Tina
pnpm start               # Start production server

# Quality & Testing
pnpm lint                # Run ESLint
pnpm typecheck           # TypeScript check
pnpm test                # Run tests
pnpm test:watch          # Watch mode
pnpm format              # Format with Prettier

# Git hooks (automatic)
pre-commit: lint-staged
commit-msg: commitlint
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── ui/          # ShadCN primitives
│   └── layout/      # Header, Footer
├── domains/         # Business logic
│   ├── cart/        # Cart context & storage
│   └── product/     # Price calc, filters
├── lib/             # Utilities (env, format)
└── styles/          # Global CSS

tina/                # TinaCMS config
content/             # Git-backed content (products, categories)
tests/               # Test files
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NODE_ENV=development

# TinaCMS (optional for local mode)
TINA_CLIENT_ID=
TINA_TOKEN=

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Development Workflow

1. Consulta `/Docs/Implementation.md` per task corrente
2. Segui `/Docs/UI_UX_doc.md` per design system
3. Rispetta `/Docs/project_structure.md` per organizzazione file
4. Documenta bug in `/Docs/Bug_tracking.md`

## Stage 1 Completato ✅

- [x] Next.js + TypeScript + pnpm setup
- [x] Tailwind + ShadCN UI configurati
- [x] Layout base (Header/Footer)
- [x] Cart context + localStorage persistence
- [x] Env validation (Zod)
- [x] TinaCMS config placeholder
- [x] Testing stack (Vitest + RTL + jest-axe)
- [x] ESLint + Prettier + Husky + commitlint
- [x] CI workflow (lint/typecheck/test/build)

## Prossimi Passi (Stage 2)

- Definire schema completo Tina (Product, Category)
- Implementare product listing & detail pages
- Sistema filtri dinamici
- Modulo personalizzazione (nome/numero)
- Integrazione Instagram DM link
- Analytics events

## Risorse

- [Next.js Docs](https://nextjs.org/docs)
- [TinaCMS Docs](https://tina.io/docs)
- [ShadCN UI](https://ui.shadcn.com)
- [Project Docs](/Docs)

---

**Nota**: Questo è un progetto vetrina. Gli ordini vengono completati tramite Instagram DM, non tramite pagamenti online.
