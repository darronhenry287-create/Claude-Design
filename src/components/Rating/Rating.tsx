import "./Rating.css";

export interface RatingProps {
  /** Score from 0–5 (halves allowed, e.g. 4.5). */
  value: number;
  /** Optional number of reviews to show beside the stars. */
  count?: number;
  /** Star count. @default 5 */
  max?: number;
}

/** Read-only star rating with optional review count. */
export function Rating({ value, count, max = 5 }: RatingProps) {
  const clamped = Math.max(0, Math.min(max, value));
  return (
    <span className="ds-rating" aria-label={`Rated ${clamped} of ${max}`}>
      <span className="ds-rating__track">
        {"★".repeat(max)}
        <span className="ds-rating__fill" style={{ width: `${(clamped / max) * 100}%` }}>
          {"★".repeat(max)}
        </span>
      </span>
      {typeof count === "number" && <span className="ds-rating__count">({count})</span>}
    </span>
  );
}
