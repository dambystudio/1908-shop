# TinaCMS Admin - Guida alla Configurazione

## Panoramica

L'admin di TinaCMS è accessibile all'indirizzo `/admin/index.html` e permette di gestire i contenuti del sito (prodotti, categorie, recensioni).

## Sviluppo Locale

### Avviare l'admin in locale

```bash
pnpm dev:tina
# oppure
npm run dev:tina
```

Questo comando avvia sia Next.js che il server TinaCMS locale. L'admin sarà accessibile su:

- **http://localhost:3000/admin/index.html**

In modalità locale, le modifiche vengono salvate direttamente nei file JSON nella cartella `content/`.

## Configurazione Tina Cloud (Produzione)

Per abilitare l'editing sul sito in produzione, devi configurare Tina Cloud.

### 1. Crea un progetto su Tina Cloud

1. Vai su [app.tina.io](https://app.tina.io/)
2. Accedi con GitHub
3. Crea un nuovo progetto
4. Collega il repository GitHub `dambystudio/1908-shop`

### 2. Ottieni le credenziali

Dal dashboard di Tina Cloud, ottieni:

- **Client ID** - Identificatore del progetto
- **Token** - Token di autenticazione (Read-Only è sufficiente per il frontend)

### 3. Configura le variabili ambiente su Vercel

Vai su Vercel → Progetto → Settings → Environment Variables e aggiungi:

```
TINA_CLIENT_ID=<il-tuo-client-id>
TINA_TOKEN=<il-tuo-token>
TINA_BRANCH=main

NEXT_PUBLIC_TINA_CLIENT_ID=<il-tuo-client-id>
NEXT_PUBLIC_TINA_TOKEN=<il-tuo-token>
NEXT_PUBLIC_TINA_BRANCH=main
```

> **Nota**: Le variabili `NEXT_PUBLIC_*` sono esposte al browser e necessarie per l'admin.

### 4. Redeploy

Dopo aver salvato le variabili, esegui un nuovo deploy su Vercel.

## Collezioni Configurate

### Products (Prodotti)

Campi principali:

- `name` - Nome del prodotto
- `slug` - URL slug (es: "inter-2024-25-home")
- `description` - Descrizione
- `productType` - Tipo (standard, longsleeve, retro, kids-set, etc.)
- `basePrice` - Prezzo base in EUR
- `category` - Categoria (retro, competition, mystery-box, etc.)
- `images` - Immagine principale e galleria
- `sizes` - Taglie disponibili con stock
- `allowCustomization` - Abilita personalizzazione nome/numero
- `patches` - Patch disponibili (Serie A, Champions League, etc.)
- `featured` - Mostra in homepage
- `published` - Visibile sul sito

### Categories (Categorie)

- `name` - Nome categoria
- `slug` - URL slug
- `description` - Descrizione
- `image` - Immagine categoria
- `order` - Ordine di visualizzazione

### Reviews (Recensioni)

- `author` - Nome autore
- `rating` - Valutazione (1-5 stelle)
- `content` - Testo recensione
- `productSlug` - Prodotto associato
- `status` - draft/published/rejected
- `createdAt` - Data creazione

## Struttura File

```
content/
├── products/       # File JSON dei prodotti
├── categories/     # File JSON delle categorie
└── reviews/        # File JSON delle recensioni

public/
├── admin/          # Admin generato (ignorato da git)
└── uploads/        # Media caricati via Tina

tina/
├── config.ts       # Configurazione e schema
└── __generated__/  # File generati automaticamente
```

## Troubleshooting

### "Client not configured properly"

Questo errore appare quando mancano le credenziali Tina Cloud durante la build. Assicurati che:

- `TINA_CLIENT_ID` e `TINA_TOKEN` siano configurati
- Le variabili siano disponibili durante la build

### L'admin non si carica su Vercel

1. Verifica che tutte le variabili `NEXT_PUBLIC_*` siano configurate
2. Controlla che il branch sia corretto (`NEXT_PUBLIC_TINA_BRANCH`)
3. Esegui un nuovo deploy dopo aver modificato le variabili

### Le modifiche non vengono salvate

- In locale: verifica che il server Tina sia attivo (`pnpm dev:tina`)
- In produzione: Tina Cloud crea un commit su GitHub per ogni modifica
