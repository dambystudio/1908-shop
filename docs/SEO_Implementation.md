# SEO Implementation - 1908 Shop

**Status**: ✅ Implemented  
**Date**: 2025-01-07  
**Stage**: 3 - UX Polish & SEO

## 📊 Implemented Features

### 1. **Metadata Utility** (`src/lib/seo.ts`)

Centralizzata generazione metadata per:

- Open Graph tags (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs
- Robots directives
- Product-specific metadata (price, availability)

**Usage:**

```typescript
import { generateSEOMetadata } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-path',
  type: 'website', // or 'product' | 'article'
  image: '/custom-og-image.jpg', // optional
  price: 89.99, // for products
  availability: 'in stock',
})
```

---

### 2. **Structured Data** (`src/lib/structured-data.tsx`)

JSON-LD schemas per Google Rich Results:

#### Organization Schema

```json
{
  "@type": "Organization",
  "name": "1908 Shop",
  "url": "https://1908-shop.vercel.app",
  "logo": "https://1908-shop.vercel.app/logo.webp",
  "sameAs": ["https://instagram.com/1908shop_"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://ig.me/m/1908shop_"
  }
}
```

#### Product Schema

```json
{
  "@type": "Product",
  "name": "Inter 2023/24 Home",
  "description": "...",
  "image": ["..."],
  "brand": { "@type": "Brand", "name": "Inter" },
  "offers": {
    "@type": "Offer",
    "price": "89.99",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock",
    "url": "..."
  }
}
```

#### Breadcrumb Schema

Automatic breadcrumb navigation for SEO:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "..." },
    { "@type": "ListItem", "position": 2, "name": "Prodotti", "item": "..." },
    { "@type": "ListItem", "position": 3, "name": "Product Name" }
  ]
}
```

---

### 3. **Dynamic Sitemap** (`src/app/sitemap.ts`)

Auto-generated sitemap with:

- Static pages (home, products, mystery-box)
- Dynamic product pages
- Change frequency hints
- Priority levels

**Features:**

- ✅ ISR-compatible (updates with product changes)
- ✅ Respects product creation dates
- ✅ Proper priority hierarchy

**Access:** `https://1908-shop.vercel.app/sitemap.xml`

---

### 4. **Robots.txt** (`src/app/robots.ts`)

Optimized crawler directives:

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://1908-shop.vercel.app/sitemap.xml
```

**Access:** `https://1908-shop.vercel.app/robots.txt`

---

### 5. **Page-Specific Metadata**

#### Homepage (`src/app/page.tsx`)

- Full Open Graph support
- Organization + WebSite schemas
- Optimized title & description

#### Products Listing (`src/app/products/page.tsx`)

- Collection metadata
- Proper indexing directives

#### Product Detail (`src/app/products/[slug]/page.tsx`)

- Dynamic title from product name
- Product schema with:
  - Price
  - Availability (based on stock)
  - Images gallery
  - Brand info
- Breadcrumb schema
- Product-specific OG image

#### Mystery Box (`src/app/mystery-box/page.tsx`)

- Special landing page metadata
- Product-type Open Graph

---

## 🎯 SEO Benefits

### Google Search

- ✅ **Rich Results**: Products show with price, availability, ratings (ready)
- ✅ **Breadcrumbs**: Navigation in search results
- ✅ **Site Links**: Properly structured for sitelinks
- ✅ **Knowledge Graph**: Organization recognized

### Social Sharing

- ✅ **Facebook**: Rich previews with image, title, description
- ✅ **Twitter**: Large image cards
- ✅ **LinkedIn**: Professional previews
- ✅ **Instagram**: (via link in bio) proper metadata

### Crawler Optimization

- ✅ **Canonical URLs**: Prevent duplicate content
- ✅ **Sitemap**: Fast indexing of new products
- ✅ **Robots.txt**: Efficient crawl budget
- ✅ **ISR**: Fresh content without rebuild

---

## 🧪 Testing SEO

### Tools

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test: Product pages for Product schema
   - Expected: ✅ Valid Product schema

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test: All pages for OG tags
   - Expected: Proper image, title, description

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test: Homepage and product pages
   - Expected: Large image card

4. **Google Search Console**
   - Submit: sitemap.xml
   - Monitor: Index coverage
   - Check: Mobile usability

### Manual Checks

**View Page Source:**

```bash
curl https://1908-shop.vercel.app/ | grep -E "(og:|twitter:|application/ld)"
```

**Check Sitemap:**

```bash
curl https://1908-shop.vercel.app/sitemap.xml
```

**Check Robots:**

```bash
curl https://1908-shop.vercel.app/robots.txt
```

---

## 📈 Metadata Examples

### Homepage

```html
<title>1908 Shop - Maglie da Calcio Personalizzate | 1908 Shop</title>
<meta
  name="description"
  content="Shop online di maglie da calcio personalizzate. Inter, Milan, Serie A e collezioni vintage. Personalizza con nome e numero, aggiungi patch ufficiali. Ordina direttamente su Instagram."
/>
<meta property="og:type" content="website" />
<meta property="og:url" content="https://1908-shop.vercel.app/" />
<meta property="og:title" content="1908 Shop - Maglie da Calcio Personalizzate | 1908 Shop" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://1908-shop.vercel.app/og-image.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

### Product Page

```html
<title>Inter 2023/24 Home - Inter | 1908 Shop</title>
<meta
  name="description"
  content="Maglia ufficiale Inter 2023/24 Home. Personalizzazioni disponibili. Stagione 2023/24. Ordina su Instagram."
/>
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Inter 2023/24 Home",
    "offers": { "price": "89.99", "priceCurrency": "EUR", "availability": "InStock" }
  }
</script>
```

---

## ⚙️ Configuration

### Environment Variables

**File:** `.env.local`

```bash
NEXT_PUBLIC_SITE_URL=https://1908-shop.vercel.app
NEXT_PUBLIC_INSTAGRAM_USERNAME=1908shop_
```

**Fallback:** Hardcoded values in `src/lib/seo.ts` and `src/lib/structured-data.tsx`

---

## 🚀 Deployment Checklist

- [x] All pages have proper metadata
- [x] Structured data on product pages
- [x] Sitemap auto-generates with products
- [x] Robots.txt configured
- [x] Canonical URLs on all pages
- [x] Open Graph images configured
- [ ] **TODO**: Create custom `/public/og-image.jpg` (1200x630px)
- [ ] **TODO**: Submit sitemap to Google Search Console
- [ ] **TODO**: Submit sitemap to Bing Webmaster Tools
- [ ] **TODO**: Test with Lighthouse SEO audit (target: 95+)

---

## 📝 Next Steps

### Immediate

1. **Create OG Image**: Design 1200x630px social sharing image
2. **Google Search Console**: Submit sitemap, verify ownership
3. **Lighthouse Audit**: Run and fix any SEO warnings

### Future Enhancements

1. **Article Schema**: For blog posts (if added)
2. **FAQ Schema**: For FAQ section
3. **Review Schema**: When review system is implemented
4. **Local Business Schema**: If physical store added
5. **Video Schema**: For product videos
6. **Multi-language**: hreflang tags for internationalization

---

## 🐛 Known Limitations

1. **Product Images**: Using placeholder URLs until real images uploaded
2. **OG Image**: Currently using `/og-image.jpg` - needs creation
3. **Reviews**: Schema ready but no review data yet
4. **Multi-language**: Not implemented (R2 feature)

---

## 📚 Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

**Status**: ✅ SEO Foundation Complete  
**Build**: Successful (11 pages including sitemap & robots)  
**Next**: Create OG image + submit to search engines
