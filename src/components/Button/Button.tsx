import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** Control size. @default "md" */
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  fullWidth?: boolean;
  children: ReactNode;
}

/** Primary call-to-action control. Used for "Add to cart", "Shop now", etc. */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "ds-btn",
    `ds-btn--${variant}`,
    `ds-btn--${size}`,
    fullWidth ? "ds-btn--block" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
