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
      setError("Please enter a valid group name (at least 3 characters).");
      return;
    }
    onLogin(name);
  };

  return (
    <main className="page min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Did Sanctions Work?</h1>
          <p className="text-gray-600">Evidence Lab Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
              Group Name (e.g., your first names)
            </label>
            <input
              id="groupName"
              type="text"
              required
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                setError("");
              }}
              placeholder="e.g., Alex and Sam"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full primary-button py-3 text-lg font-semibold"
          >
            Enter Lab
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          First come, first served on claiming cases!
        </div>
      </div>
    </main>
  );
}
