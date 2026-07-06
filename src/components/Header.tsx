import type { View } from "../App";

type HeaderProps = {
  currentView: View;
  onNavigate: (view: View) => void;
  boardCount: number;
};

const navItems: Array<{ view: View; label: string }> = [
  { view: "home", label: "Home" },
  { view: "selection", label: "Cases" },
  { view: "board", label: "Class Board" },
];

export function Header({ currentView, onNavigate, boardCount }: HeaderProps) {
  return (
    <header className="app-header">
      <button className="brand-button" type="button" onClick={() => onNavigate("home")}>
        <span className="brand-mark">?</span>
        <span>
          <strong>Did It Work?</strong>
          <small>Evidence Lab</small>
        </span>
      </button>

      <nav className="top-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            className={currentView === item.view ? "nav-button active" : "nav-button"}
            key={item.view}
            type="button"
            onClick={() => onNavigate(item.view)}
          >
            {item.label}
            {item.view === "board" && boardCount > 0 ? (
              <span className="count-badge">{boardCount}</span>
            ) : null}
          </button>
        ))}
      </nav>
    </header>
  );
}
