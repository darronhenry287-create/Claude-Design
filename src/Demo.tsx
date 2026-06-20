import {
  AnnouncementBar,
  Hero,
  ProductCard,
  Newsletter,
  Button,
} from "./index";
import "./Demo.css";

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
  {
    title: "Hydra-Mist Toner",
    image: "/p4.svg",
    price: 32,
    rating: 4.5,
    reviewCount: 57,
    soldOut: true,
  },
];

export function Demo() {
  return (
    <div className="ds-root demo">
      <AnnouncementBar
        messages={["Free shipping over $75", "30-day happy-skin guarantee"]}
        action={{ label: "Shop the set", href: "#" }}
      />

      <header className="demo-nav">
        <nav className="demo-nav__links">
          <a href="#">Shop</a>
          <a href="#">Bestsellers</a>
          <a href="#">About</a>
        </nav>
        <a href="#" className="demo-logo">
          MAISON
        </a>
        <div className="demo-nav__links demo-nav__links--right">
          <a href="#">Account</a>
          <a href="#">Cart (0)</a>
        </div>
      </header>

      <Hero
        eyebrow="New collection"
        title="Skincare, distilled to the essentials."
        subtitle="Clinically-backed formulas, clean ingredients, and nothing you don't need. Made in small batches."
        ctaLabel="Shop the collection"
        image="/hero.svg"
      />

      <main className="demo-main">
        <section>
          <div className="demo-section-head">
            <h2 className="demo-h2">Bestsellers</h2>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <div className="demo-grid">
            {products.map((p) => (
              <ProductCard
                key={p.title}
                {...p}
                onAddToCart={() => alert(`Added: ${p.title}`)}
              />
            ))}
          </div>
        </section>

        <section className="demo-news">
          <Newsletter
            title="Get 10% off your first order"
            subtitle="Join the list for new drops, skin tips, and members-only sets."
            onSubmit={(email) => console.log("subscribe:", email)}
          />
        </section>
      </main>

      <footer className="demo-footer">
        <span className="demo-logo demo-logo--sm">MAISON</span>
        <p>© 2026 Maison. A demo storefront built with the Maison UI kit.</p>
      </footer>
    </div>
  );
}
