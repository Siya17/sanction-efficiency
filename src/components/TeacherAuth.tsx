import { FormEvent, useState } from "react";
import { signInTeacher, supabase } from "../utils/supabase";

type TeacherAuthProps = {
  onAuthSuccess: () => void;
};

// Local-only fallback PIN, used only when Supabase isn't configured (e.g. local
// dev with no shared class board). This is NOT real security: Vite inlines
// VITE_ env vars into the shipped JS bundle, so the PIN is readable by anyone
// who opens devtools. When Supabase is configured, real per-teacher accounts
// (email + password via Supabase Auth) are used instead — see below.
const FALLBACK_PIN = import.meta.env.VITE_TEACHER_PIN || "9876";

function PinFallbackForm({ onAuthSuccess }: TeacherAuthProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pin === FALLBACK_PIN) {
      onAuthSuccess();
    } else {
      setError(true);
      setPin("");
    }
  }

  return (
    <form className="workflow-panel" onSubmit={handleSubmit}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2>Teacher Access</h2>
        <p className="hint">
          No shared class board is configured, so there are no teacher accounts. Enter the local PIN to access
          teacher controls on this device.
        </p>
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
  );
}

function SupabaseLoginForm({ onAuthSuccess }: TeacherAuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const { error: signInError } = await signInTeacher(email.trim(), password);

    setSubmitting(false);

    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }

    onAuthSuccess();
  }

  return (
    <form className="workflow-panel" onSubmit={handleSubmit}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h2>Teacher Access</h2>
        <p className="hint">Sign in with your teacher account to access teacher controls.</p>
      </div>

      <label className="field-label">
        Email
        <input
          type="email"
          autoFocus
          autoComplete="username"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
      </label>

      <label className="field-label">
        Password
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </label>

      {error && <p style={{ color: "#cf6f5d", textAlign: "center", margin: "0" }}>{error}</p>}

      <button className="primary-button" type="submit" disabled={submitting || !email || !password}>
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function TeacherAuth({ onAuthSuccess }: TeacherAuthProps) {
  return (
    <main className="page" style={{ maxWidth: "400px", margin: "4rem auto" }}>
      {supabase ? <SupabaseLoginForm onAuthSuccess={onAuthSuccess} /> : <PinFallbackForm onAuthSuccess={onAuthSuccess} />}
    </main>
  );
}
