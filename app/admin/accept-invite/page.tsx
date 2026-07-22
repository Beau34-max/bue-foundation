"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, CheckCircle } from "lucide-react";

function AcceptInviteContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    fetch(`/api/admin/accept-invite?token=${token}`)
      .then(r => r.json())
      .then(d => {
        setValid(d.valid);
        setName(d.name ?? "");
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/accept-invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: form.password }),
    });
    if (res.ok) {
      setDone(true);
      setTimeout(() => router.push("/admin"), 2000);
    } else {
      const d = await res.json();
      setError(d.error || "Something went wrong");
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-dark mb-2">Invalid or Expired Link</h1>
          <p className="text-mid text-sm">
            This invitation link is no longer valid. Please ask your admin to send a new invite.
          </p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-page flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-dark mb-2">Account activated!</h1>
          <p className="text-mid text-sm">Redirecting you to the dashboard…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark">Welcome, {name}!</h1>
          <p className="text-mid text-sm mt-2">
            Set your password to activate your BUE Foundation admin account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-light p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">New Password</label>
            <input
              type="password" required autoFocus value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full px-4 py-3 border border-light rounded-lg text-dark focus:outline-none focus:border-primary transition-colors"
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Confirm Password</label>
            <input
              type="password" required value={form.confirm}
              onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
              className="w-full px-4 py-3 border border-light rounded-lg text-dark focus:outline-none focus:border-primary transition-colors"
              placeholder="Repeat your password"
            />
          </div>
          {error && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Activating…" : "Set Password & Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-page flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
