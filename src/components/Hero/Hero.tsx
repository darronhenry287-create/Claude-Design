import { Button } from "../Button/Button";
import "./Hero.css";

export interface HeroProps {
  /** Small label above the headline, e.g. "New collection". */
  eyebrow?: string;
  /** Main headline. */
  title: string;
  /** Supporting sentence under the headline. */
  subtitle?: string;
  /** Call-to-action label. When omitted, no button renders. */
  ctaLabel?: string;
  /** Background image URL. */
  image: string;
  /** Text alignment within the hero. @default "left" */
  align?: "left" | "center";
  /** Fired when the CTA is pressed. */
  onCta?: () => void;
}

/** Full-bleed brand hero with image, headline, and CTA. */
export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  image,
  align = "left",
  onCta,
}: HeroProps) {
  return (
    <section
      className={`ds-hero ds-hero--${align}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="ds-hero__scrim" />
      <div className="ds-hero__content">
        {eyebrow && <p className="ds-hero__eyebrow">{eyebrow}</p>}
        <h1 className="ds-hero__title">{title}</h1>
        {subtitle && <p className="ds-hero__subtitle">{subtitle}</p>}
        {ctaLabel && (
          <div className="ds-hero__cta">
            <Button size="lg" onClick={onCta}>
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
