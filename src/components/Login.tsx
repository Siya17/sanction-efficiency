import { useState } from "react";

type LoginProps = {
  onLogin: (groupName: string) => void;
};

export function Login({ onLogin }: LoginProps) {
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = groupName.trim();
    if (name.length < 3) {
      setError("Please enter a group name of at least 3 characters.");
      return;
    }
    onLogin(name);
  };

  return (
    <main className="page login-page">
      <div className="login-card">
        <div className="login-head">
          <span className="brand-mark">?</span>
          <h1>Did It Work?</h1>
          <p className="subtitle">Evidence Lab</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="field-label">
            Your group name (e.g. your first names)
            <input
              id="groupName"
              type="text"
              required
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                setError("");
              }}
              placeholder="e.g. Alex and Sam"
              autoFocus
            />
          </label>
          {error && <p className="hint login-error">{error}</p>}

          <button type="submit" className="primary-button full-width">
            Enter the lab
          </button>
        </form>

        <p className="hint login-foot">Each case can be claimed by one group — first come, first served.</p>
      </div>
    </main>
  );
}
