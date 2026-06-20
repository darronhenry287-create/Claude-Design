// Maison UI — public library entry.
// Importing tokens here means consumers get the design variables bundled
// into the library stylesheet (dist/maison-ui.css).
import "./styles/tokens.css";

export { Button } from "./components/Button/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button/Button";

export { Badge } from "./components/Badge/Badge";
export type { BadgeProps, BadgeTone } from "./components/Badge/Badge";

export { Price } from "./components/Price/Price";
export type { PriceProps } from "./components/Price/Price";

export { Rating } from "./components/Rating/Rating";
export type { RatingProps } from "./components/Rating/Rating";

export { ProductCard } from "./components/ProductCard/ProductCard";
export type { ProductCardProps } from "./components/ProductCard/ProductCard";

export { Hero } from "./components/Hero/Hero";
export type { HeroProps } from "./components/Hero/Hero";

export { AnnouncementBar } from "./components/AnnouncementBar/AnnouncementBar";
export type { AnnouncementBarProps } from "./components/AnnouncementBar/AnnouncementBar";

export { Newsletter } from "./components/Newsletter/Newsletter";
export type { NewsletterProps } from "./components/Newsletter/Newsletter";
