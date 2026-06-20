import { AnnouncementBar, ProductCard, Newsletter, Button } from "../index";
import type { Brand } from "./brand";
import "./StorePreview.css";

const products = [
  {
    title: "Renewing Night Serum",
    image: "/p1.svg",
    price: 48,
    compareAt: 62,
    badge: { label: "Sale", tone: "sale" as const },
    rating: 4.5,
    reviewCount: 214,
  },
  {
    title: "Daily Glow Moisturizer",
    image: "/p2.svg",
    price: 38,
    badge: { label: "New", tone: "new" as const },
    rating: 5,
    reviewCount: 88,
  },
  {
    title: "Gentle Foaming Cleanser",
    image: "/p3.svg",
    price: 28,
    rating: 4,
    reviewCount: 132,
  },
];

/** A compact storefront that re-skins from the CSS variables on its wrapper. */
export function StorePreview({ brand }: { brand: Brand }) {
  return (
    <div className="sp">
      <AnnouncementBar
        messages={["Free shipping over $75", "30-day guarantee"]}
        action={{ label: "Shop the set", href: "#" }}
      />

      <header className="sp-nav">
        <span className="sp-nav__links">Shop · About</span>
        <span className="sp-logo">{brand.name}</span>
        <span className="sp-nav__links sp-nav__links--right">Cart (0)</span>
      </header>

      <section
        className="sp-hero"
        style={{
          background: `linear-gradient(105deg, ${brand.ink} 0%, ${brand.accent} 118%)`,
        }}
      >
        <p className="sp-hero__eyebrow">The new collection</p>
        <h1 className="sp-hero__title">{brand.name}</h1>
        <p className="sp-hero__sub">
          Considered essentials, made in small batches.
        </p>
        <Button size="lg">Shop the collection</Button>
      </section>

      <section className="sp-section">
        <div className="sp-section__head">
          <h2 className="sp-h2">Bestsellers</h2>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div className="sp-grid">
          {products.map((p) => (
            <ProductCard key={p.title} {...p} onAddToCart={() => {}} />
          ))}
        </div>
      </section>

      <section className="sp-section">
        <Newsletter
          title="Get 10% off your first order"
          subtitle="Join the list for new drops and members-only sets."
          onSubmit={() => {}}
        />
      </section>

      <footer className="sp-footer">{brand.name}</footer>
    </div>
  );
}
