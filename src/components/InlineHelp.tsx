import { useState } from "react";

type InlineHelpProps = {
  term: string;
  children: React.ReactNode;
};

export function InlineHelp({ term, children }: InlineHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="inline-help-container" style={{ display: "inline-block", position: "relative", marginLeft: "4px" }}>
      <button
        type="button"
        className="inline-help-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`What does ${term} mean?`}
        style={{
          background: "#e2e8f0",
          color: "#475569",
          border: "none",
          borderRadius: "50%",
          width: "16px",
          height: "16px",
          fontSize: "11px",
          fontWeight: "bold",
          lineHeight: "16px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ?
      </button>

      {isOpen && (
        <span
          className="inline-help-popup"
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "8px",
            background: "#1e293b",
            color: "#f8fafc",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            lineHeight: "1.4",
            width: "max-content",
            maxWidth: "250px",
            zIndex: 50,
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            textAlign: "left",
          }}
        >
          <strong style={{ display: "block", marginBottom: "4px", color: "#cbd5e1" }}>{term}</strong>
          {children}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              background: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </span>
      )}
    </span>
  );
}
