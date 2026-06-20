import "./Price.css";

export interface PriceProps {
  /** Current price in major units (e.g. 38 for $38.00). */
  amount: number;
  /** Optional original price; when higher than `amount`, renders as a strikethrough sale. */
  compareAt?: number;
  /** ISO currency code. @default "USD" */
  currency?: string;
  /** BCP-47 locale for formatting. @default "en-US" */
  locale?: string;
}

/** Formatted price with optional compare-at (sale) styling. */
export function Price({
  amount,
  compareAt,
  currency = "USD",
  locale = "en-US",
}: PriceProps) {
  const fmt = (v: number) =>
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(v);
  const onSale = typeof compareAt === "number" && compareAt > amount;

  return (
    <span className="ds-price">
      <span className={onSale ? "ds-price__now ds-price__now--sale" : "ds-price__now"}>
        {fmt(amount)}
      </span>
      {onSale && <span className="ds-price__was">{fmt(compareAt!)}</span>}
    </span>
  );
}
