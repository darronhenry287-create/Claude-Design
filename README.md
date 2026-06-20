# Maison UI

A small, brand-able **DTC ecommerce component library** — React + TypeScript, themed entirely through CSS design tokens. Re-skin the whole kit by overriding a handful of variables.

This repo is structured to be consumed by **[claude.ai/design](https://claude.ai/design)** via `/design-sync`: it compiles to a real `dist/` (ESM + UMD + types + CSS), so the design agent can build on-brand storefront UI from these exact components.

## Brand Studio

An interactive **brand-kit builder** (`studio.html`) built on top of these components. Dial in a brand — colors, fonts, button shape, roundness — watch a storefront re-skin **live**, then export a ready-to-use kit that unifies your whole pipeline:

| Export | Plugs into |
| --- | --- |
| `CLAUDE.md` | **Claude Code** — a brand spec it reads so every task builds on-brand. Drop into your project repo. |
| `brand.liquid` | your **Shopify theme** — fonts + CSS variables + base styling, via `{% render 'brand' %}`. |
| `brand.tokens.css` / `brand.json` | design tokens + machine-readable source of truth. |

```bash
npm run dev   # then open http://localhost:5173/studio.html
```

The idea: **define a brand once**, and feed the same definition to your design, your Shopify build, and Claude Code — instead of re-deriving it (and re-explaining it to the AI) on every project.

## Components

| Component | What it's for |
| --- | --- |
| `Button` | Primary CTA — "Add to cart", "Shop now". Variants: primary / secondary / ghost. |
| `Badge` | Status pill — "Sale", "New", "Sold out". |
| `Price` | Formatted price with compare-at (sale) styling. |
| `Rating` | Read-only star rating + review count. |
| `ProductCard` | Collection-grid tile: image, title, price, rating, add-to-cart. |
| `Hero` | Full-bleed brand hero with image, headline, CTA. |
| `AnnouncementBar` | Slim promo bar — shipping offers, drops. |
| `Newsletter` | Email-capture block for footers / pop-ups. |

## Develop

```bash
npm install
npm run dev          # live demo storefront at localhost:5173
npm run build        # library  -> dist/   (what design-sync consumes)
npm run build:demo   # demo site -> dist-demo/
```

## Theming

Every component reads from CSS variables defined in `src/styles/tokens.css`.
Override them on `:root` (or any wrapper) to re-brand:

```css
:root {
  --ds-color-accent: #2e6b5e; /* swap terracotta for forest green */
  --ds-font-display: "Playfair Display", serif;
}
```

## Usage

```tsx
import { ProductCard } from "@maison/ui";
import "@maison/ui/styles.css";

<ProductCard
  title="Renewing Night Serum"
  image="/serum.jpg"
  price={48}
  compareAt={62}
  badge={{ label: "Sale", tone: "sale" }}
  rating={4.5}
  reviewCount={214}
  onAddToCart={() => {}}
/>;
```
