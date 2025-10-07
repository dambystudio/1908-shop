# Logo Assets - Conversion Guide

## Source File

- **Current:** `logo.jpg` (1024x1024px)
- **Original:** Square format, high resolution

---

## Required Conversions

### 1️⃣ Main Logo (WebP)

```bash
# Using ImageMagick or online converter
convert logo.jpg -resize 512x512 -quality 90 public/logo.webp
```

**Output:** `/public/logo.webp`

- Dimensioni: 512x512px
- Formato: WebP
- Qualità: 90%
- Uso: Header, Footer, pagine sito

---

### 2️⃣ Favicons

#### Multi-size ICO

```bash
# Combina 16x16, 32x32, 48x48 in un solo .ico
convert logo.jpg -resize 16x16 favicon-16.png
convert logo.jpg -resize 32x32 favicon-32.png
convert logo.jpg -resize 48x48 favicon-48.png
convert favicon-16.png favicon-32.png favicon-48.png public/favicon.ico
```

**Output:** `/public/favicon.ico`

#### PNG Favicons

```bash
convert logo.jpg -resize 32x32 public/favicon-32x32.png
convert logo.jpg -resize 16x16 public/favicon-16x16.png
```

---

### 3️⃣ Apple Touch Icons

```bash
convert logo.jpg -resize 180x180 public/apple-touch-icon.png
cp public/apple-touch-icon.png public/apple-touch-icon-precomposed.png
```

**Output:**

- `/public/apple-touch-icon.png`
- `/public/apple-touch-icon-precomposed.png`
- Dimensioni: 180x180px
- Uso: iOS home screen, Safari

---

### 4️⃣ Android/PWA Icons

```bash
convert logo.jpg -resize 192x192 public/android-chrome-192x192.png
convert logo.jpg -resize 512x512 public/android-chrome-512x512.png
```

**Output:**

- `/public/android-chrome-192x192.png` (192x192px)
- `/public/android-chrome-512x512.png` (512x512px)
- Uso: Android home screen, PWA manifest

---

### 5️⃣ Open Graph / Social Sharing

```bash
# Crea canvas 1200x630 nero, posiziona logo al centro
convert -size 1200x630 xc:black \
  \( logo.jpg -resize 400x400 \) \
  -gravity center -composite \
  public/og-image.png
```

**Output:** `/public/og-image.png`

- Dimensioni: 1200x630px (formato landscape)
- Logo centrato su sfondo nero
- Uso: Facebook, Twitter, LinkedIn preview

**Alternativa (con testo):**

```bash
convert -size 1200x630 xc:black \
  \( logo.jpg -resize 300x300 \) \
  -gravity north -geometry +0+100 -composite \
  -gravity south -pointsize 60 -fill white -annotate +0+100 "1908 Shop" \
  public/og-image.png
```

---

## Online Converters (se non hai ImageMagick)

### Per WebP:

- https://convertio.co/jpg-webp/
- https://cloudconvert.com/jpg-to-webp

### Per Favicon ICO:

- https://www.favicon-generator.org/
- https://realfavicongenerator.net/ (genera TUTTI i formati automaticamente!)

### Per OG Image:

- https://www.canva.com/ (template 1200x630)
- https://www.figma.com/ (free)

---

## Quick Checklist

Dopo le conversioni, verifica che esistano:

```
/public/
  ├── logo.webp                      ✅ Main logo (512x512)
  ├── favicon.ico                    ✅ Multi-size favicon
  ├── favicon-16x16.png              ✅ Small favicon
  ├── favicon-32x32.png              ✅ Standard favicon
  ├── apple-touch-icon.png           ✅ iOS icon (180x180)
  ├── apple-touch-icon-precomposed.png ✅ iOS fallback
  ├── android-chrome-192x192.png     ✅ Android small (192x192)
  ├── android-chrome-512x512.png     ✅ Android large (512x512)
  └── og-image.png                   ✅ Social share (1200x630)
```

---

## Next.js Metadata Config

Dopo aver creato tutti i file, aggiorna `/src/app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: '1908 Shop',
  description: 'Maglie da calcio personalizzate',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: '1908 Shop',
    description: 'Maglie da calcio personalizzate',
    images: ['/og-image.png'],
    siteName: '1908 Shop',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '1908 Shop',
    description: 'Maglie da calcio personalizzate',
    images: ['/og-image.png'],
  },
}
```

---

## Priority Order

1. **Urgente:** `logo.webp` (512x512) → per Header funzionante
2. **Importante:** `favicon.ico` → per tab browser
3. **Raccomandato:** Apple touch icon → per iOS users
4. **Nice-to-have:** OG image → per social sharing
5. **Opzionale:** Android icons → per PWA (futuro)

---

**Tool Consigliato:** https://realfavicongenerator.net/
→ Upload logo.jpg, scarica ZIP con TUTTI i formati pronti!
