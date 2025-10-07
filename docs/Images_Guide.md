# Guida Immagini - 1908 Shop

## 📸 Immagini da Aggiungere

### 1. Logo ✅

**File:** `public/logo.png`  
**Dimensioni consigliate:** 512x512px (o proporzioni 1:1)  
**Formato:** PNG con sfondo trasparente  
**Uso:** Header, Footer, Favicon

---

### 2. Immagini Prodotti (PRIORITÀ ALTA)

#### Naming Convention:

```
public/products/
  {slug}-main.jpg      (immagine principale - vista frontale)
  {slug}-front.jpg     (dettaglio frontale)
  {slug}-back.jpg      (retro)
  {slug}-detail.jpg    (dettaglio patch/logo)
```

#### Prodotti Attuali da Fotografare:

**a) Inter 2023-24 Home** (`inter-2023-24-home`)

- `inter-2023-24-home-main.jpg` - Maglia appesa o su manichino
- `inter-2023-24-home-front.jpg` - Fronte con logo Inter
- `inter-2023-24-home-back.jpg` - Retro (con numero/nome se presente)
- `inter-2023-24-home-detail.jpg` - Dettaglio patch Scudetto/stemma

**b) Milan Retro 1994** (`milan-retro-1994`)

- `milan-retro-1994-main.jpg`
- `milan-retro-1994-front.jpg`
- `milan-retro-1994-back.jpg`
- `milan-retro-1994-detail.jpg`

**c) Mystery Box Serie A** (`mystery-box-serie-a`)

- `mystery-box-serie-a-main.jpg` - Box chiusa o teaser
- `mystery-box-serie-a-front.jpg` - Contenuto parzialmente visibile
- `mystery-box-serie-a-detail.jpg` - Dettaglio prodotti dentro

#### Specifiche Tecniche:

- **Formato:** JPG (qualità 85-90%)
- **Dimensioni:** 1200x1200px minimo (proporzione 1:1)
- **Background:** Neutro (bianco, grigio chiaro, o nero per dark theme)
- **Lighting:** Luce diffusa, senza ombre dure
- **Focus:** Nitido su logo e dettagli

---

### 3. Immagini Homepage (PRIORITÀ MEDIA)

#### Hero Background (opzionale):

**File:** `public/hero-bg.jpg`  
**Dimensioni:** 1920x1080px  
**Uso:** Background hero section (con overlay scuro)

#### Category Images:

```
public/categories/
  competition-hero.jpg  (1200x800px - azione di gioco Serie A)
  retro-hero.jpg        (1200x800px - maglia vintage anni '90)
  mystery-box-hero.jpg  (1200x800px - box misteriosa)
```

---

### 4. Placeholder Images (GENERATI AUTOMATICAMENTE)

Per i prodotti senza foto, usiamo placeholder generati con:

- Gradiente primary-red + black
- Testo "1908 Shop" + nome prodotto
- Icon SVG maglietta

---

### 5. Favicon & Meta Images

**Favicon:**

```
public/favicon.ico       (32x32px)
public/icon.png          (180x180px per Apple)
```

**Open Graph (Social Sharing):**

```
public/og-image.jpg      (1200x630px - per Facebook/Twitter)
public/og-logo.png       (512x512px - logo per preview)
```

---

## 🎨 Linee Guida Fotografiche

### Setup Consigliato:

1. **Sfondo:** Pannello nero opaco o bianco per contrasto
2. **Illuminazione:** 2 softbox laterali + luce dall'alto
3. **Camera:** Smartphone recente (modalità ritratto disattivata)
4. **Composizione:**
   - Maglia centrata
   - Riempi 80% del frame
   - Lascia spazio per crop

### Post-Produzione:

- Ritaglio 1:1 (quadrato)
- Correzione bilanciamento bianco
- Leggero aumento contrasto
- Ridimensiona a 1200x1200px
- Esporta JPG qualità 85%

---

## 🔄 Aggiornamento Dati Prodotto

Dopo aver caricato le immagini, aggiorna i file JSON:

**Esempio:** `content/products/inter-2023-24-home.json`

```json
{
  "images": {
    "main": "/products/inter-2023-24-home-main.jpg",
    "gallery": [
      "/products/inter-2023-24-home-front.jpg",
      "/products/inter-2023-24-home-back.jpg",
      "/products/inter-2023-24-home-detail.jpg"
    ]
  }
}
```

---

## ⚡ Quick Actions

### Se non hai foto professionali:

1. **Usa AI image generation:** Midjourney, DALL-E con prompt "product photography soccer jersey on black background"
2. **Stock photos:** Unsplash/Pexels (cerca "soccer jersey" + modifica con Photoshop)
3. **Mockup templates:** Placeit.net o Smartmockups per jersey mockup

### Temporaneo (per development):

Usa placeholder service: `https://placehold.co/1200x1200/000000/D40000?text=1908+Shop`

---

## 📋 Checklist Upload

- [ ] Logo 1908 Shop in `/public/logo.png`
- [ ] Favicon in `/public/favicon.ico`
- [ ] Inter 2023-24 Home (4 immagini)
- [ ] Milan Retro 1994 (4 immagini)
- [ ] Mystery Box Serie A (3 immagini)
- [ ] Category heroes (3 immagini - opzionali)
- [ ] OG image per social sharing
- [ ] Aggiornamento JSON prodotti con path corretti

---

**Nota:** Next.js ottimizza automaticamente le immagini in `/public` quando usi il componente `<Image>` - non serve pre-ottimizzarle troppo!
