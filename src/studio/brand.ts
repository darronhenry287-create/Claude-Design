import type { CSSProperties } from "react";

export type ButtonShape = "pill" | "rounded" | "sharp";

/** The single source of truth for a brand. Everything else is derived from this. */
export interface Brand {
  name: string;
  accent: string;
  ink: string;
  paper: string;
  displayFont: string;
  bodyFont: string;
  buttonShape: ButtonShape;
  radius: number;
}

export interface FontDef {
  label: string;
  family: string;
  google: string;
}

/** Selectable fonts. All are preloaded in studio.html so switching is instant. */
export const FONTS: FontDef[] = [
  { label: "Fraunces", family: "'Fraunces', Georgia, serif", google: "Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400" },
  { label: "Playfair Display", family: "'Playfair Display', Georgia, serif", google: "Playfair+Display:wght@400;600;700" },
  { label: "DM Serif Display", family: "'DM Serif Display', Georgia, serif", google: "DM+Serif+Display:ital@0;1" },
  { label: "Space Grotesk", family: "'Space Grotesk', system-ui, sans-serif", google: "Space+Grotesk:wght@400;500;700" },
  { label: "Inter", family: "'Inter', system-ui, sans-serif", google: "Inter:wght@400;500;600" },
  { label: "Poppins", family: "'Poppins', system-ui, sans-serif", google: "Poppins:wght@400;500;600" },
  { label: "DM Sans", family: "'DM Sans', system-ui, sans-serif", google: "DM+Sans:wght@400;500;700" },
];

export function fontLabel(family: string): string {
  return FONTS.find((f) => f.family === family)?.label ?? family;
}
export function googleParamFor(family: string): string {
  return FONTS.find((f) => f.family === family)?.google ?? "";
}

export const DEFAULT_BRAND: Brand = {
  name: "Maison",
  accent: "#c0552e",
  ink: "#1b1714",
  paper: "#f6f1ea",
  displayFont: "'Fraunces', Georgia, serif",
  bodyFont: "'Inter', system-ui, sans-serif",
  buttonShape: "pill",
  radius: 12,
};

export interface Preset {
  id: string;
  label: string;
  brand: Brand;
}

/** Starting points — a vibe in one click, then tweak. */
export const PRESETS: Preset[] = [
  { id: "maison", label: "Maison", brand: DEFAULT_BRAND },
  {
    id: "luxe",
    label: "Luxe",
    brand: {
      name: "Aurelle",
      accent: "#b08d57",
      ink: "#1a1a1a",
      paper: "#f3efe9",
      displayFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Inter', system-ui, sans-serif",
      buttonShape: "sharp",
      radius: 2,
    },
  },
  {
    id: "organic",
    label: "Organic",
    brand: {
      name: "Fern & Field",
      accent: "#5d7460",
      ink: "#23211c",
      paper: "#f1eee4",
      displayFont: "'Fraunces', Georgia, serif",
      bodyFont: "'DM Sans', system-ui, sans-serif",
      buttonShape: "rounded",
      radius: 16,
    },
  },
  {
    id: "bold",
    label: "Bold",
    brand: {
      name: "VOLT",
      accent: "#e4572e",
      ink: "#0e0e0e",
      paper: "#faf7f2",
      displayFont: "'Space Grotesk', system-ui, sans-serif",
      bodyFont: "'Space Grotesk', system-ui, sans-serif",
      buttonShape: "pill",
      radius: 22,
    },
  },
  {
    id: "clean",
    label: "Clean",
    brand: {
      name: "Northbound",
      accent: "#2f6bff",
      ink: "#101317",
      paper: "#ffffff",
      displayFont: "'Inter', system-ui, sans-serif",
      bodyFont: "'Inter', system-ui, sans-serif",
      buttonShape: "rounded",
      radius: 10,
    },
  },
];

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(n, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

/** Pick a legible text color (dark or white) for text sitting on `hex`. */
export function readableOn(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#1b1714" : "#ffffff";
}

export function pillRadius(shape: ButtonShape): string {
  return shape === "pill" ? "999px" : shape === "rounded" ? "12px" : "3px";
}

/** Map a Brand onto the design-system CSS variables the components read. */
export function cssVarsFor(brand: Brand): CSSProperties {
  const vars: Record<string, string> = {
    "--ds-color-accent": brand.accent,
    "--ds-color-accent-ink": readableOn(brand.accent),
    "--ds-color-ink": brand.ink,
    "--ds-color-paper": brand.paper,
    "--ds-font-display": brand.displayFont,
    "--ds-font-body": brand.bodyFont,
    "--ds-radius-sm": `${Math.max(2, Math.round(brand.radius * 0.6))}px`,
    "--ds-radius-md": `${brand.radius}px`,
    "--ds-radius-lg": `${Math.round(brand.radius * 1.6)}px`,
    "--ds-radius-pill": pillRadius(brand.buttonShape),
  };
  return vars as unknown as CSSProperties;
}

export function slug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "").trim() || "brand";
}
