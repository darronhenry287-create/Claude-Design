import { Badge } from "../Badge/Badge";
import { Price } from "../Price/Price";
import { Rating } from "../Rating/Rating";
import { Button } from "../Button/Button";
import "./ProductCard.css";

export interface ProductCardProps {
  /** Product title. */
  title: string;
  /** Image URL for the product shot. */
  image: string;
  /** Current price in major units. */
  price: number;
  /** Optional original price for sale display. */
  compareAt?: number;
  /** Optional corner badge, e.g. "New" or "Sale". */
  badge?: { label: string; tone?: "sale" | "new" | "soldout" | "neutral" };
  /** Optional average star rating (0–5). */
  rating?: number;
  /** Optional review count shown next to the rating. */
  reviewCount?: number;
  /** Disables the CTA and dims the card. */
  soldOut?: boolean;
  /** Fired when the add-to-cart button is pressed. */
  onAddToCart?: () => void;
}

/** Product tile for collection grids: image, title, price, rating, add-to-cart. */
export function ProductCard({
  title,
  image,
  price,
  compareAt,
  badge,
  rating,
  reviewCount,
  soldOut = false,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article className={`ds-card${soldOut ? " ds-card--soldout" : ""}`}>
      <div className="ds-card__media">
        <img className="ds-card__img" src={image} alt={title} loading="lazy" />
        {badge && (
          <span className="ds-card__badge">
            <Badge tone={badge.tone}>{badge.label}</Badge>
          </span>
        )}
      </div>
      <div className="ds-card__body">
        <h3 className="ds-card__title">{title}</h3>
        {typeof rating === "number" && (
          <Rating value={rating} count={reviewCount} />
        )}
        <div className="ds-card__foot">
          <Price amount={price} compareAt={compareAt} />
          <Button
            size="sm"
            variant={soldOut ? "ghost" : "primary"}
            disabled={soldOut}
            onClick={onAddToCart}
          >
            {soldOut ? "Sold out" : "Add to cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}
