import type { StudentSubmission } from "../types";
import { verdictLabels, confidenceLabels, trackLabels } from "./labels";

export function formatResearchMarkdown(submission: StudentSubmission): string {
  const isResearch = submission.activityMode === "research";

  let md = `# Did Sanctions Work? Evidence Lab — ${isResearch ? "Research " : ""}Submission\n\n`;
  md += `## Case\n`;
  md += `- **Country**: ${submission.country}\n`;
  md += `- **Track**: ${trackLabels[submission.track] || submission.track}\n`;
  md += `- **Policy**: ${submission.policy}\n\n`;

  if (isResearch && submission.researchQuestion) {
    md += `## Research Question\n${submission.researchQuestion}\n\n`;
  } else {
    md += `## Policy Aim\n${submission.policyAim}\n\n`;
  }

  md += `## Success Criterion\n${submission.successCriterion}\n\n`;

  md += `## Verdict\n`;
  md += `**${verdictLabels[submission.verdict] || submission.verdict}** (Confidence: ${confidenceLabels[submission.confidence] || submission.confidence})\n\n`;

  if (isResearch && submission.finalExplanation) {
    md += `## Final Explanation\n${submission.finalExplanation}\n\n`;
  }

  md += `## Supporting Evidence\n${submission.strongestEvidence || submission.supportingEvidence}\n\n`;
  md += `## Complicating Evidence\n${submission.biggestComplication || submission.complicatingEvidence}\n\n`;

  if (isResearch && submission.counterargument) {
    md += `## Counterargument\n${submission.counterargument}\n\n`;
  }

  if (isResearch && submission.remainingUncertainty) {
    md += `## Remaining Uncertainty\n${submission.remainingUncertainty}\n\n`;
  } else {
    md += `## Missing Evidence\n${submission.missingEvidence}\n\n`;
  }

  if (isResearch && submission.evidenceThatWouldChangeMind) {
    md += `## What would change your mind?\n${submission.evidenceThatWouldChangeMind}\n\n`;
  }

  if (submission.dataSnapshotReflection) {
    md += `## Data Snapshot Reflection\n${submission.dataSnapshotReflection}\n\n`;
  }

  if (isResearch && submission.studentEvidenceCards && submission.studentEvidenceCards.length > 0) {
    md += `## Student-Added Evidence\n`;
    submission.studentEvidenceCards.forEach((card, idx) => {
      md += `### ${idx + 1}. ${card.title}\n`;
      md += `- **Summary**: ${card.summary}\n`;
      md += `- **Source**: ${card.sourceTitle} ${card.sourceUrl ? `(${card.sourceUrl})` : ""}\n`;
      md += `- **Reliability**: ${card.reliability}\n`;
      md += `- **Explanation**: ${card.explanation}\n`;
      md += `- **Limitation**: ${card.limitation}\n\n`;
    });
  }

  if (isResearch && submission.citationList && submission.citationList.length > 0) {
    md += `## Citations\n`;
    submission.citationList.forEach((cit, idx) => {
      md += `${idx + 1}. ${cit.authorOrOrganization || "Unknown"} (${cit.publicationYear || "n.d."}). *${cit.title}*. ${cit.url ? cit.url : ""} ${cit.note ? `[${cit.note}]` : ""}\n`;
    });
    md += `\n`;
  }

  return md;
}

export function exportResearchAsMarkdown(submission: StudentSubmission): void {
  const md = formatResearchMarkdown(submission);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `did-it-work-${submission.caseId}-submission.md`;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportResearchAsJson(submission: StudentSubmission): void {
  const json = JSON.stringify(submission, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `did-it-work-${submission.caseId}-submission.json`;
  link.click();
  URL.revokeObjectURL(url);
}
