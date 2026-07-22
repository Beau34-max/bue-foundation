"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/setup")
      .then(r => r.json())
      .then(d => {
        if (!d.needsSetup) router.replace("/admin");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });
    if (res.ok) {
      router.push("/admin");
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

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-dark">Create Your Admin Account</h1>
          <p className="text-mid text-sm mt-2">
            This page only appears once — when no admin accounts exist yet.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-light p-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Full Name</label>
            <input
              type="text" required value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-3 border border-light rounded-lg text-dark focus:outline-none focus:border-primary transition-colors"
              placeholder="Beatrice Uchenna Egwu"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Email Address</label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-4 py-3 border border-light rounded-lg text-dark focus:outline-none focus:border-primary transition-colors"
              placeholder="beatrice.ue@joybringerscharity.org"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-dark mb-1.5">Password</label>
            <input
              type="password" required value={form.password}
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
            {loading ? "Creating account…" : "Create Account & Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
