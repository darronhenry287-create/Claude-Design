import { useState, type FormEvent } from "react";
import { Button } from "../Button/Button";
import "./Newsletter.css";

export interface NewsletterProps {
  /** Section headline. */
  title: string;
  /** Supporting line under the headline. */
  subtitle?: string;
  /** Input placeholder. @default "Email address" */
  placeholder?: string;
  /** Submit button label. @default "Subscribe" */
  ctaLabel?: string;
  /** Fired with the entered email on submit. */
  onSubmit?: (email: string) => void;
}

/** Email-capture block for footers and pop-ups. */
export function Newsletter({
  title,
  subtitle,
  placeholder = "Email address",
  ctaLabel = "Subscribe",
  onSubmit,
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSubmit?.(email);
    setDone(true);
  };

  return (
    <section className="ds-news">
      <div className="ds-news__copy">
        <h2 className="ds-news__title">{title}</h2>
        {subtitle && <p className="ds-news__subtitle">{subtitle}</p>}
      </div>
      {done ? (
        <p className="ds-news__thanks">Thanks — check your inbox for 10% off.</p>
      ) : (
        <form className="ds-news__form" onSubmit={submit}>
          <input
            className="ds-news__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            required
          />
          <Button type="submit">{ctaLabel}</Button>
        </form>
      )}
    </section>
  );
}
