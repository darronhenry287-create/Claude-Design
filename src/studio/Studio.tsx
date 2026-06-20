import { useMemo, useState, type ReactNode, type CSSProperties } from "react";
import {
  type Brand,
  type ButtonShape,
  FONTS,
  PRESETS,
  DEFAULT_BRAND,
  cssVarsFor,
  slug,
} from "./brand";
import { EXPORTS } from "./export";
import { StorePreview } from "./StorePreview";
import "./Studio.css";

function download(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="fld">
      <span className="fld__label">{label}</span>
      {children}
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <span className="color">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
        <input
          className="color__hex"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      </span>
    </Field>
  );
}

function FontField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {FONTS.map((f) => (
          <option key={f.label} value={f.family}>
            {f.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

const SHAPES: ButtonShape[] = ["pill", "rounded", "sharp"];

export function Studio() {
  const [brand, setBrand] = useState<Brand>(DEFAULT_BRAND);
  const [exportOpen, setExportOpen] = useState(false);
  const [tab, setTab] = useState(EXPORTS[0].id);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Brand>(key: K, val: Brand[K]) =>
    setBrand((b) => ({ ...b, [key]: val }));

  const active = EXPORTS.find((e) => e.id === tab) ?? EXPORTS[0];
  const content = useMemo(() => active.build(brand), [active, brand]);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — download still works */
    }
  };

  return (
    <div className="studio">
      <header className="studio__top">
        <div className="studio__title">
          <strong>Brand Studio</strong>
          <span>Define a brand once → live preview + a Claude-ready kit for your Shopify build</span>
        </div>
        <button className="studio__cta" onClick={() => setExportOpen(true)}>
          Export brand kit ↓
        </button>
      </header>

      <div className="studio__body">
        <aside className="panel">
          <div className="panel__group">
            <div className="panel__heading">Start from a vibe</div>
            <div className="presets">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  className="preset"
                  onClick={() => setBrand(p.brand)}
                  style={{ "--swatch": p.brand.accent } as CSSProperties}
                >
                  <span className="preset__dot" />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="panel__group">
            <div className="panel__heading">Brand</div>
            <Field label="Name">
              <input
                value={brand.name}
                onChange={(e) => set("name", e.target.value)}
                spellCheck={false}
              />
            </Field>
            <ColorField label="Accent" value={brand.accent} onChange={(v) => set("accent", v)} />
            <ColorField label="Ink (text)" value={brand.ink} onChange={(v) => set("ink", v)} />
            <ColorField label="Paper (bg)" value={brand.paper} onChange={(v) => set("paper", v)} />
          </div>

          <div className="panel__group">
            <div className="panel__heading">Type</div>
            <FontField label="Display" value={brand.displayFont} onChange={(v) => set("displayFont", v)} />
            <FontField label="Body" value={brand.bodyFont} onChange={(v) => set("bodyFont", v)} />
          </div>

          <div className="panel__group">
            <div className="panel__heading">Shape</div>
            <Field label="Buttons">
              <div className="seg">
                {SHAPES.map((s) => (
                  <button
                    key={s}
                    className={s === brand.buttonShape ? "seg__btn seg__btn--on" : "seg__btn"}
                    onClick={() => set("buttonShape", s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={`Card roundness — ${brand.radius}px`}>
              <input
                type="range"
                min={0}
                max={28}
                value={brand.radius}
                onChange={(e) => set("radius", Number(e.target.value))}
              />
            </Field>
          </div>
        </aside>

        <main className="stage">
          <div className="frame">
            <div className="frame__bar">
              <span className="frame__dot" />
              <span className="frame__dot" />
              <span className="frame__dot" />
              <span className="frame__url">{slug(brand.name)}.com</span>
            </div>
            <div className="frame__view ds-root" style={cssVarsFor(brand)}>
              <StorePreview brand={brand} />
            </div>
          </div>
        </main>
      </div>

      {exportOpen && (
        <div className="modal" onClick={() => setExportOpen(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet__top">
              <strong>Brand kit — {brand.name}</strong>
              <button className="sheet__x" onClick={() => setExportOpen(false)}>
                ✕
              </button>
            </div>
            <div className="tabs">
              {EXPORTS.map((e) => (
                <button
                  key={e.id}
                  className={e.id === tab ? "tab tab--on" : "tab"}
                  onClick={() => setTab(e.id)}
                >
                  {e.filename}
                </button>
              ))}
            </div>
            <pre className="code">{content}</pre>
            <div className="sheet__actions">
              <span className="sheet__hint">
                {active.filename} — drop into your repo / Shopify theme.
              </span>
              <div className="sheet__btns">
                <button className="btn-ghost" onClick={doCopy}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
                <button className="btn-solid" onClick={() => download(active.filename, content)}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
