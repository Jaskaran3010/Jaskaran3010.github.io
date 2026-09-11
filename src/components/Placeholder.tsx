import type { ReactNode } from "react";

const TOKEN_RE = /(\[ADD [^\]]+\]|\[[A-Z][A-Z0-9 _/&—–-]*\])/g;
const TOKEN_TEST = /^(\[ADD [^\]]+\]|\[[A-Z][A-Z0-9 _/&—–-]*\])$/;

/**
 * Renders a string, styling any [ADD ...] / [TITLE]-style placeholder tokens
 * distinctly so unfinished content is obvious and never reads as a claim.
 */
export function withPlaceholders(text: string): ReactNode {
  const parts = text.split(TOKEN_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    TOKEN_TEST.test(part) ? (
      <span key={i} className="placeholder-token">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** True if the whole string is just a placeholder token. */
export function isPlaceholder(text: string): boolean {
  return /^\[[^\]]+\]$/.test(text.trim());
}
