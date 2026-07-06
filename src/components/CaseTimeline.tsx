import type { TimelineEvent } from "../types";

type CaseTimelineProps = {
  events: TimelineEvent[];
};

export function CaseTimeline({ events }: CaseTimelineProps) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="case-timeline" aria-label="Case timeline">
      <h3>Timeline</h3>
      <ol>
        {events.map((event) => (
          <li className={`timeline-event ${event.type}`} key={event.id}>
            <span className="timeline-year">{event.year}</span>
            <div>
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              {event.sourceUrl && event.sourceTitle ? (
                <a href={event.sourceUrl} target="_blank" rel="noreferrer">
                  {event.sourceTitle}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
