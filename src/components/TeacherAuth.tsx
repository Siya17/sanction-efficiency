import { FormEvent, useState } from "react";

type TeacherAuthProps = {
  onAuthSuccess: () => void;
};

// Use an environment variable for the PIN, falling back to 9876 if not set
const CORRECT_PIN = import.meta.env.VITE_TEACHER_PIN || "9876";

export function TeacherAuth({ onAuthSuccess }: TeacherAuthProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin === CORRECT_PIN) {
      onAuthSuccess();
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <main className="page" style={{ maxWidth: "400px", margin: "4rem auto" }}>
      <form className="workflow-panel" onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h2>Teacher Access</h2>
          <p className="hint">Enter the 4-digit PIN to access teacher controls.</p>
        </div>

        <label className="field-label">
          PIN Code
          <input
            type="password"
            autoFocus
            inputMode="numeric"
            pattern="[0-9]*"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            placeholder="****"
            style={{ textAlign: "center", letterSpacing: "0.5em", fontSize: "1.5rem" }}
          />
        </label>

        {error && <p style={{ color: "#cf6f5d", textAlign: "center", margin: "0" }}>Incorrect PIN.</p>}

        <button className="primary-button" type="submit" disabled={pin.length < 4}>
          Unlock
        </button>
      </form>
    </main>
  );
}
