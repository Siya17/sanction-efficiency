import type { AppView, ActivityMode } from "../types";
import { useEvidenceLab } from "../hooks/useEvidenceLab";

type HeaderProps = {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  boardCount: number;
};

const navItems: Array<{ view: AppView; label: string }> = [
  { view: "home", label: "Home" },
  { view: "selection", label: "Cases" },
  { view: "board", label: "Class Board" },
  { view: "teacher", label: "Teacher Mode" },
];

export function Header({ currentView, onNavigate, boardCount }: HeaderProps) {
  const { activityMode, actions } = useEvidenceLab();

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

      <div className="flex items-center gap-2 bg-indigo-800 rounded-lg p-1 ml-4 self-center">
        <button
          onClick={() => actions.setActivityMode("classroom")}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            activityMode === "classroom" ? "bg-white text-indigo-900 shadow-sm" : "text-indigo-200 hover:text-white"
          }`}
        >
          Classroom
        </button>
        <button
          onClick={() => actions.setActivityMode("research")}
          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
            activityMode === "research" ? "bg-white text-indigo-900 shadow-sm" : "text-indigo-200 hover:text-white"
          }`}
        >
          Research
        </button>
      </div>
    </header>
  );
}
