import { appConfig } from "../config/app";
import { InlineHelp } from "./InlineHelp";

type HomeProps = {
  onStart: () => void;
  onBoard: () => void;
};

export function Home({ onStart, onBoard }: HomeProps) {
  return (
    <main className="page home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Classroom investigation</p>
          <h1>{appConfig.title}</h1>
          <p className="subtitle">{appConfig.subtitle}</p>
          <div className="intro">
            <p>
              Many people ask whether 
              <strong> sanctions</strong>
              <InlineHelp term="Sanctions">
                Economic or political penalties, like trade bans or frozen assets, used by countries to pressure a target government or group to change its behavior.
              </InlineHelp>
              {" "}or{" "}
              <strong>foreign aid</strong>
              <InlineHelp term="Foreign aid">
                Money, food, or resources given by one country or organization to help another country, often to support development, health, or security.
              </InlineHelp>
              {" "} "worked." This app helps you answer that question carefully.
            </p>
            <ol style={{ textAlign: "left", marginTop: "1rem", marginBottom: "1rem", paddingLeft: "1.5rem" }}>
              <li><strong>Choose a real case</strong></li>
              <li><strong>Decide what "worked" means</strong></li>
              <li><strong>Use evidence to make a cautious verdict</strong></li>
            </ol>
            <p style={{ background: "#fef3c7", padding: "10px", borderRadius: "6px", color: "#92400e", fontSize: "0.95rem" }}>
              <strong>Note:</strong> There may not be one correct answer. A good answer explains the evidence and the uncertainty.
            </p>
          </div>
          <div className="button-row" style={{ marginTop: "2rem" }}>
            <button className="primary-button" type="button" onClick={onStart}>
              Start with a case
            </button>
            <button className="secondary-button" type="button" onClick={onBoard}>
              View class board
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
