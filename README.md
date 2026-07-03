# BioDiff — Skincare Website (React + Vite)

Fully responsive, fully functional storefront UI built with React + Vite (plain CSS, no
external UI library). Built with your real BioDiff product photos as assets.

## Run locally

```bash
npm install
npm run dev
```
Open http://localhost:5173

Production build:
```bash
npm run build
npm run preview
```

## What's functional

- **Cart** — "+" buttons add real products to a global cart (React Context +
  localStorage persistence). Cart icon in the header shows a live item count; clicking it
  opens a slide-in drawer where you can change quantity, remove items, and see the total.
- **Search** — search icon in the header expands into an input; submitting scrolls to the
  product section (wire it up to real search/filter logic whenever you have a product API).
- **Filter by concern** — the pills in "Find What Your Skin Needs?" actually filter the
  visible product grid by category.
- **Carousels** — Hero banner, "Real Results", and "Her Stories" all have working
  prev/next controls (real slide-state for the hero, smooth-scroll snap carousels for the
  results/stories rows). Also swipeable on mobile/touch out of the box.
- **Responsive** — every section has mobile breakpoints (nav collapses to a hamburger
  menu, grids restack, hero/offer text resizes, cart drawer becomes full-width, etc).
  Test by resizing the browser or opening dev tools' device toolbar.

## Folder structure

```
biodiff/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/
│       ├── products/       ← your real BioDiff product photos (already added)
│       │   ├── spectra-block-spf100.jpeg
│       │   ├── spectra-block-spf60.jpeg
│       │   ├── acne-away-facewash.jpeg
│       │   └── glutathion-facewash.jpeg
│       ├── marketing/       ← campaign / lifestyle photos (already added)
│       │   ├── natural-glow-duo.jpeg
│       │   ├── influencers-banner.jpeg
│       │   └── model-glutathione.jpeg
│       ├── results/         ← PLACEHOLDER before/after images — replace with real
│       │                       customer photos when you have them
│       ├── stories/         ← PLACEHOLDER video-testimonial thumbnails — replace with
│       │                       real customer video posters/clips
│       └── whatsapp-icon.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                    ← global colors/fonts/variables + toast styles
    ├── context/
    │   └── CartContext.jsx          ← cart state, add/remove/qty, localStorage
    └── components/
        ├── AnnouncementBar          → top scrolling offer strip
        ├── Header                   → logo, nav, search, cart (badge + drawer trigger)
        ├── CartDrawer                → slide-in cart panel
        ├── HeroBanner                → real product photos, working slide/dots/arrows
        ├── ShopCategories            → "Shop / Fan Fave / Radiant Care..." strip
        ├── RealResults                → before/after scroll-carousel
        ├── FeatureGrid                → bento grid using your product photos
        ├── Philosophy                 → brand statement section
        ├── SkinNeeds                  → filterable product grid wired to the cart
        ├── HerStories                  → video-testimonial scroll-carousel
        ├── Influencers                 → your "Recommended by Influencers" banner asset
        ├── Newsletter                  → email subscribe (hook up your ESP in the
        │                                  handleSubmit function)
        ├── Footer
        └── WhatsAppButton              → update the number in the href
```

## Things to finish before going live

1. **Real before/after photos** — drop them into `public/images/results/` using the
   existing filenames (`result-1-before.jpg`, `result-1-after.jpg`, etc.), or edit the
   paths in `src/components/RealResults.jsx`.
2. **Real testimonial video thumbnails / clips** — same idea, in `public/images/stories/`.
   `HerStories.jsx` currently just shows a poster image with play/mute buttons; wire an
   actual `<video>` element in there once you have clips.
3. **WhatsApp number** — set your real number in `src/components/WhatsAppButton.jsx`.
4. **Prices/products** — edit the `products` array in `src/components/SkinNeeds.jsx` to
   match your real catalog, categories, and prices.
5. **Checkout** — the "Checkout" button in the cart drawer is currently a placeholder;
   connect it to your payment/checkout flow (Shopify, custom API, etc).

## Design tokens

All colors/fonts live in `src/index.css` under `:root` (lime green, dark green, cream,
blue, teal accents). Fonts: **Playfair Display** (headings) + **Poppins** (body), loaded
from Google Fonts in `index.html`.
