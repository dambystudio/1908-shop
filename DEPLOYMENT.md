# Deployment Guide - 1908 Shop

## Vercel Deployment (Recommended)

### Prerequisites

- GitHub repository connected
- Vercel account (free tier works for MVP)

### Step 1: Import Project to Vercel

1. Vai su https://vercel.com/new
2. Importa il repository GitHub `1908-shop`
3. Vercel rileverà automaticamente Next.js

### Step 2: Configure Build Settings

Vercel dovrebbe auto-rilevare:

- **Framework Preset**: Next.js
- **Build Command**: `pnpm build`
- **Output Directory**: `.next` (default)
- **Install Command**: `pnpm install`
- **Node Version**: 20.x

Se necessario, configura manualmente da Project Settings → General.

### Step 3: Environment Variables

Aggiungi queste variabili in Project Settings → Environment Variables:

#### Required (None for Stage 1 MVP)

Nessuna variabile obbligatoria per lo Stage 1.

#### Optional

**TinaCMS** (necessario solo per `/admin` route):

```
TINA_CLIENT_ID=your_client_id_from_tina_cloud
TINA_TOKEN=your_read_token_from_tina_cloud
TINA_BRANCH=main
```

**Analytics** (se usi Google Analytics):

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Site URL** (auto-configurato da Vercel):

```
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

### Step 4: Deploy

1. Clicca **Deploy**
2. Attendi ~2-3 minuti per il primo build
3. Vercel fornirà:
   - Production URL: `https://1908-shop.vercel.app`
   - Preview URLs per ogni PR

### Step 5: Verify Deployment

Testa questi endpoint:

- `https://your-app.vercel.app/` → Homepage
- `https://your-app.vercel.app/api/health` → (se implementato)

### Post-Deployment

#### Custom Domain (Optional)

1. Project Settings → Domains
2. Aggiungi dominio personalizzato
3. Configura DNS secondo istruzioni Vercel

#### CI/CD Automatico

- Push su `main` → deploy production
- Push su branch / PR → preview deployment
- GitHub Actions workflow esegue lint/test prima del merge

## TinaCMS Cloud Setup (Optional - Stage 2)

Se vuoi abilitare l'editor `/admin`:

1. Vai su https://app.tina.io
2. Crea nuovo progetto
3. Collega repo GitHub
4. Copia `TINA_CLIENT_ID` e `TINA_TOKEN`
5. Aggiungi variabili in Vercel
6. Redeploy

## Monitoring & Analytics

### Vercel Analytics (Built-in)

- Automatico su tutti i piani
- Web Vitals tracking
- Performance insights

### Google Analytics Setup

1. Crea proprietà GA4
2. Copia Measurement ID
3. Aggiungi `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel
4. Redeploy

## Troubleshooting

### Build Fails

- Verifica `pnpm-lock.yaml` sia committato
- Controlla Node version (20.x)
- Leggi build logs in Vercel dashboard

### Environment Variables Not Working

- Assicurati scope sia Production + Preview + Development
- Redeploy dopo aver aggiunto env vars
- Client vars devono avere prefisso `NEXT_PUBLIC_`

### ISR/SSG Issues (Stage 2+)

- Verifica `revalidate` nelle page config
- Controlla Vercel Functions logs per errori runtime

## Rollback

Se deploy ha problemi:

1. Vercel Dashboard → Deployments
2. Trova deployment funzionante precedente
3. Clicca "Promote to Production"

## Performance Optimization (Post-MVP)

- Edge Functions per API routes
- Image Optimization (automatico)
- Vercel KV per cache (se necessario)
- Analytics + Speed Insights (Vercel addon)

---

**Note**: Per Stage 1, il deploy è semplice (nessun database, nessuna env var obbligatoria). Le variabili TinaCMS servono solo quando vorrai usare l'editor visuale in Stage 2+.
