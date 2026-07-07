import { Fragment, useMemo, type ReactNode } from "react";
import { glossary, type GlossaryEntry } from "../data/glossary";

// Map every surface form (the term itself plus any aliases) to its entry.
const surfaceToEntry = new Map<string, GlossaryEntry>();
for (const entry of glossary) {
  for (const form of [entry.term, ...(entry.aliases ?? [])]) {
    surfaceToEntry.set(form, entry);
  }
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Longest forms first so multi-word phrases win over their substrings.
const forms = [...surfaceToEntry.keys()].sort((a, b) => b.length - a.length);

// Case-sensitive on purpose: the terms are acronyms or capitalised proper
// nouns, so this avoids false hits like matching the word "us" as "US".
// Boundaries use letter/number lookarounds so acronyms and hyphenated/numbered
// terms (G7, M23, KALAHI-CIDSS) match cleanly.
const pattern = forms.length
  ? new RegExp(`(?<![A-Za-z0-9])(${forms.map(escapeRegExp).join("|")})(?![A-Za-z0-9])`, "g")
  : null;

function renderWithGlossary(text: string): ReactNode[] {
  if (!pattern) return [text];

  const nodes: ReactNode[] = [];
  const usedTerms = new Set<string>();
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(pattern)) {
    const surface = match[0];
    const entry = surfaceToEntry.get(surface);
    const index = match.index ?? 0;

    // Only annotate the first appearance of each concept to avoid clutter.
    if (!entry || usedTerms.has(entry.term)) continue;
    usedTerms.add(entry.term);

    if (index > lastIndex) {
      nodes.push(<Fragment key={key++}>{text.slice(lastIndex, index)}</Fragment>);
    }

    nodes.push(
      <span
        key={key++}
        className="glossary-term"
        tabIndex={0}
        role="button"
        aria-label={`${entry.term}: ${entry.definition}`}
      >
        {surface}
        <span className="glossary-tip" role="tooltip">
          <strong>{entry.term}</strong>
          {entry.definition}
        </span>
      </span>,
    );

    lastIndex = index + surface.length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}

type GlossaryTextProps = {
  text: string;
  as?: "p" | "span" | "div" | "dd" | "li";
  className?: string;
};

export function GlossaryText({ text, as: Tag = "span", className }: GlossaryTextProps) {
  const nodes = useMemo(() => renderWithGlossary(text), [text]);
  return <Tag className={className}>{nodes}</Tag>;
}
