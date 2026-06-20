import "./AnnouncementBar.css";

export interface AnnouncementBarProps {
  /** One or more short messages, separated by a dot when multiple. */
  messages: string[];
  /** Optional inline call-to-action link. */
  action?: { label: string; href: string };
}

/** Slim promo bar pinned above the header — shipping offers, returns, drops. */
export function AnnouncementBar({ messages, action }: AnnouncementBarProps) {
  return (
    <div className="ds-announce" role="status">
      <span className="ds-announce__inner">
        {messages.join("  ·  ")}
        {action && (
          <a className="ds-announce__action" href={action.href}>
            {action.label}
          </a>
        )}
      </span>
    </div>
  );
}
