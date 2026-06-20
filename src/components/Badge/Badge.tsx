import type { ReactNode } from "react";
import "./Badge.css";

export type BadgeTone = "sale" | "new" | "soldout" | "neutral";

export interface BadgeProps {
  /** Color treatment. @default "neutral" */
  tone?: BadgeTone;
  children: ReactNode;
}

/** Small status pill for product imagery — "Sale", "New", "Sold out". */
export function Badge({ tone = "neutral", children }: BadgeProps) {
  return <span className={`ds-badge ds-badge--${tone}`}>{children}</span>;
}
