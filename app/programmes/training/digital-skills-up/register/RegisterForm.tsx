"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";

const MODULE_LABELS: Record<string, string> = {
  "power-bi":   "Power BI",
  "adobe":      "Adobe",
  "canva":      "Canva",
  "powerpoint": "PowerPoint",
  "cv-writing": "CV Writing & Employability Skills",
};

const ALL_MODULES = [
  "Power BI",
  "Adobe",
  "Canva",
  "PowerPoint",
  "CV Writing & Employability Skills",
];

const inputCls = "w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm focus:outline-none focus:border-primary transition-colors bg-white";

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const moduleSlug = searchParams.get("module") ?? "";
  const moduleLabel = MODULE_LABELS[moduleSlug] ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    lga: "",
    address: "",
    module: moduleLabel,
    device: "",
    experience: "",
    motivation: "",
  });

  const availableLgas = NIGERIA_STATES_LGAS[form.state] || [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "state") {
      setForm(prev => ({ ...prev, state: value, lga: "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = new FormData();
      const programmeName = form.module
        ? `Digital Skills-Up Programme – ${form.module}`
        : "Digital Skills-Up Programme (General)";
      data.append("programme", programmeName);
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("address", form.address);
      data.append("state", form.state);
      data.append("lga", form.lga);
      data.append("module", form.module);
      data.append("device_access", form.device);
      data.append("digital_experience", form.experience);
      data.append("motivation", form.motivation);
      data.append("programme_start", "Monday, 7 September 2026");
      data.append("programme_end", "Saturday, 17 October 2026");

      const res = await fetch("/api/programme-apply", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
      } else {
        setError(json.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Header */}
      <section className="py-16 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            BUE Foundation · Digital Skills-Up Programme
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
            {moduleLabel ? `Register for ${moduleLabel}` : "General Registration"}
          </h1>
          <p className="text-white/75">
            Six-week free online programme · Starts 7 September 2026
          </p>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link href="/programmes/training/digital-skills-up"
            className="inline-flex items-center gap-1.5 text-sm text-mid hover:text-dark transition-colors mb-8">
            <ArrowLeft size={14} /> Back to programme overview
          </Link>

          {submitted ? (
            <div className="bg-white rounded-2xl border border-light shadow-sm p-12 text-center">
              <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-dark mb-3">You&apos;re Registered!</h2>
              <p className="text-mid mb-2">
                Thank you, <strong>{form.name}</strong>! Your registration for the{" "}
                <strong>
                  {form.module
                    ? `${form.module} module`
                    : "Digital Skills-Up Programme"}
                </strong>{" "}
                has been received.
              </p>
              <p className="text-mid text-sm mb-6">
                We will send joining details to <strong>{form.email}</strong> closer to the start date.
                The programme begins <strong>Monday, 7 September 2026</strong>.
              </p>
              <Link href="/programmes/training/digital-skills-up"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-md hover:opacity-90 transition-opacity text-sm">
                View Programme Overview
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-light shadow-sm p-8">
              {moduleLabel && (
                <div className="mb-6 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-semibold">
                  Registering for: {moduleLabel}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className={inputCls} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className={inputCls} placeholder="your@email.com" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Phone / Contact Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                    className={inputCls} placeholder="+234 ..." />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Home Address</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange}
                    className={inputCls} placeholder="House number, street, area" />
                </div>

                {/* State & LGA */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">State *</label>
                    <select name="state" value={form.state} onChange={handleChange} required className={inputCls}>
                      <option value="">Select state</option>
                      {NIGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">LGA</label>
                    <select name="lga" value={form.lga} onChange={handleChange}
                      disabled={!form.state}
                      className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed`}>
                      <option value="">{form.state ? "Select LGA" : "Select state first"}</option>
                      {availableLgas.map(lga => <option key={lga} value={lga}>{lga}</option>)}
                    </select>
                  </div>
                </div>

                {/* Module selection (only shown if no module pre-selected) */}
                {!moduleLabel && (
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Preferred Skill Module *</label>
                    <select name="module" value={form.module} onChange={handleChange} required className={inputCls}>
                      <option value="">Select a module…</option>
                      {ALL_MODULES.map(m => <option key={m} value={m}>{m}</option>)}
                      <option value="All modules">All modules (general registration)</option>
                    </select>
                  </div>
                )}

                {/* Device access */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Do you have access to a smartphone or computer? *
                  </label>
                  <select name="device" value={form.device} onChange={handleChange} required className={inputCls}>
                    <option value="">Select…</option>
                    <option value="Smartphone only">Smartphone only</option>
                    <option value="Computer / Laptop">Computer / Laptop</option>
                    <option value="Both smartphone and computer">Both smartphone and computer</option>
                    <option value="No — will need to make arrangements">No — will need to make arrangements</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Previous Digital Skills Experience
                  </label>
                  <select name="experience" value={form.experience} onChange={handleChange} className={inputCls}>
                    <option value="">Select…</option>
                    <option value="None — complete beginner">None — complete beginner</option>
                    <option value="Basic — I can use a phone/computer for everyday tasks">Basic — I can use a phone/computer for everyday tasks</option>
                    <option value="Intermediate — I have used some digital tools before">Intermediate — I have used some digital tools before</option>
                    <option value="Advanced — I am comfortable with multiple tools">Advanced — I am comfortable with multiple tools</option>
                  </select>
                </div>

                {/* Motivation */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Why do you want to join this programme?
                    <span className="text-mid font-normal ml-1">(optional)</span>
                  </label>
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} rows={3}
                    className={inputCls + " resize-none"}
                    placeholder="Tell us briefly what you hope to gain…" />
                </div>

                {error && (
                  <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-md hover:opacity-90 transition-opacity text-base disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Submitting…" : "Complete Registration"}
                </button>

                <p className="text-xs text-mid text-center">
                  Confirmation will be sent to your email address. The programme is free and online.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
