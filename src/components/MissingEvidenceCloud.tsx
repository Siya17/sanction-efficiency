type MissingEvidenceCloudProps = {
  keywords: Array<{ word: string; count: number }>;
};

export function MissingEvidenceCloud({ keywords }: MissingEvidenceCloudProps) {
  const max = Math.max(...keywords.map((keyword) => keyword.count), 1);

  return (
    <section className="comparison-panel">
      <h2>Missing Evidence Patterns</h2>
      {keywords.length === 0 ? (
        <p className="empty-text">Missing evidence keywords will appear after students submit verdicts.</p>
      ) : (
        <div className="keyword-cloud">
          {keywords.map((keyword) => {
            const level = Math.ceil((keyword.count / max) * 3);

            return (
              <span className={`keyword level-${level}`} key={keyword.word}>
                {keyword.word} <strong>{keyword.count}</strong>
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
