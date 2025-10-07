# UI & UX Design Documentation - 1908 Shop

## Brand & Visual Identity

- Palette (Dark Theme First):
  - Background: #000000 (pure black)
  - Primary Red: #D40000 (accent) & darker hover #A00000
  - Gray Scale: #111, #1A1A1A, #222, #444, #666, #999, #CCC
  - Success: #16A34A | Warning: #D97706 | Error: #DC2626
- Typography:
  - Headings: Condensed athletic (e.g., 'Anton' or 'Oswald')
  - Body: Modern sans (e.g., 'Inter')
  - Numeric (price, number input): Tabular variant
- Spacing Scale: 4px base (4,8,12,16,24,32,40,48,64)
- Radii: Subtle (4px default, 8px for modals/cards)
- Shadows: Minimal; rely on contrast and subtle borders (#222) for separation.

## Design System Components (Primitives)

- Buttons: Variants (primary, secondary, ghost). Loading state + accessible label.
- Input Fields: Unified style (border-gray-600 focus:ring-red)
- Select / Size Pills: Toggle group with active + disabled states.
- Modal / Drawer: Cart overlay, accessible focus trap.
- Badge: For stock status, new arrivals, customization applied.
- Price Block: Base price + dynamic adjustments with subtle motion (fade/slide number change).
- Alert / Note: Disclaimer & personalization warnings.
- Divider: 1px gray line with spacing tokens.

## Product Page Layout

Left column: Image gallery (main + thumbnails). Right column: Title, price, size selector, patch options, customization form, add-to-cart, disclaimer, DM CTA.

Viewport Behavior:

- Mobile: Gallery top (carousel), details below; CTA sticky bottom bar with price + Add.
- Tablet: Two-column stacked with pinned CTA as user scrolls.
- Desktop: Two fixed columns (gallery scroll within viewport if tall).

## Interaction Flows

1. Add to Cart:
   - User selects size → optional patches → enters name/number → dynamic price updates → clicks Add.
   - Success toast/snackbar: "Aggiunto al carrello" + View Cart link.
2. Customization Validation:
   - Name > 12 chars: inline error + disabled Add.
   - Number outside 0–99: inline error.
   - Missing size: highlight size grid + message.
3. IG DM Handoff:
   - Cart summary panel shows encoded message preview with copy button.
   - CTA opens new tab ig.me link; fallback tooltip: "Se il testo non appare, copia il riepilogo."
4. Patches Compatibility:
   - Incompatible patch selection disables other conflicting options with tooltip explanation.

## Accessibility Standards

- Minimum contrast ratio WCAG AA for text on dark (use #CCC+ for body, white for headings).
- Focus states: High-contrast outline (outline-red-500 offset-2) for all interactive elements.
- Skip to Content link at top.
- aria-live polite region for price updates & cart changes.
- Forms: Associate labels, use fieldset + legend for grouped size/patch options.

## Responsive Breakpoints (Tailwind defaults)

- sm: 640 — Collapse filters into disclosure.
- md: 768 — Two-column product starts.
- lg: 1024 — Enhance gallery (thumbnails side).
- xl: 1280 — Increase max-width container.

## Motion & Feedback

- Use CSS transitions (150–200ms ease) for hover, selection, price change animation.
- Avoid large parallax or performance-heavy scroll effects.
- Reduce motion preference respected (no animated number transitions if prefers-reduced-motion).

## Component Library Organization

- /components/ui: primitives (Button, Input, SelectGroup, Dialog, Badge, Alert, Skeleton)
- /components/product: ProductCard, ProductGallery, SizeSelector, PatchSelector, CustomizationForm, PriceDisplay, AddToCartPanel
- /components/cart: CartDrawer, CartItemRow, TotalsSummary, DMButton
- /components/layout: Header, NavMenu, Footer, CategoryBar

## Filters UX

- Desktop: Left sidebar with sticky position; mobile: top bar filter button → slide-over panel.
- Apply button closes panel; active filters summarized as removable chips above product grid.

## Error & Empty States

- Product not found: Friendly message + back to catalog button.
- No stock for selected size: Badge "Esaurito"; size pill disabled.
- Cart empty: Illustration + CTA to browse categories.

## Review (R1) UX

- Display average rating + count near title.
- Individual review cards with star icons (aria-label for screen readers).
- Moderated: Only published reviews visible; placeholder when none.

## Mystery Box (R1) UX

- Hero section with bold typography, limited-time style accent.
- Steps section (1. Scegli taglia, 2. Ricevi sorpresa ...). CTA integrated.

## Internationalization Prep (R2)

- Text extracted to dictionary keys (it only initially) under domain namespaces (product, cart, common).
- Price formatting via Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).

## Wireframe References (Conceptual)

(Describe, to be matched later with Figma assets)

- Home: Hero banner, category tiles grid, featured retro section, CTA strip.
- Product Listing: Filter bar, responsive 3–4 column grid.
- Product Detail: Two-column, emphasis on gallery quality.

## Accessibility Testing Checklist

- Keyboard tab order logical.
- Screen reader reads dynamic price updates.
- All images include alt; decorative images have empty alt.
- Form errors announced (aria-describedby).

## Analytics Event Mapping

- view_item: Product detail mount.
- add_to_cart: Add action with payload (id, name, price_total, customizations flags).
- begin_checkout_DM: User opens DM link from cart.
- click_igme: Raw link click (redundant but useful for funnel cross-check).

## Copy Tone & Microcopy

- Direct, concise, Italian localized.
- Action verbs: "Aggiungi", "Personalizza", "Contatta".
- Validation: "Max 12 caratteri", "Numero tra 0 e 99".

## Disclaimers Placement

- Product Page: Inline small text under Add area.
- Footer: Persistent legal disclaimer.

## Performance UX

- Use skeletons for gallery & cards; show aspect-ratio placeholders to reduce layout shift.
- Lazy load below-the-fold images using Next/Image default.

## User Journey Summary

1. Discover (Home > Category/Competition)
2. Browse (Filter / Scroll)
3. Evaluate (Read product, view patches/customization)
4. Customize (Add name/number, patches)
5. Decide (Add to cart)
6. Commit (Open DM, send prefilled message)
7. Follow-up (Conversation on Instagram)

## Future Enhancements Notes

- Consider variant price diff animations (diff blink then settle) if accepted by performance.
- Potential upsell: Suggest patches after size selected via inline prompt.

## Implementation Alignment

All UI tasks in Implementation plan should reference these component names to ensure consistency. Update this doc before adding new variants to primitives.
