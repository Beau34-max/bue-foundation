"use client";

import { useState, useEffect } from "react";
import { Clock, MapPin, CheckCircle, Loader2, LockKeyhole } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";
import type { VolunteerRole } from "@/lib/types";

export default function VolunteerPage() {
  const [roles, setRoles] = useState<VolunteerRole[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "",
    state: "", lga: "", role: "", availability: "", message: "",
  });

  const availableLgas = NIGERIA_STATES_LGAS[form.state] || [];
  const openRoles = roles.filter(r => r.is_active);

  useEffect(() => {
    fetch("/api/volunteer-roles")
      .then(r => r.json())
      .then(data => setRoles(Array.isArray(data) ? data : []))
      .finally(() => setLoadingRoles(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "state") {
      setForm(prev => ({ ...prev, state: value, lga: "" }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleApply(title: string) {
    setSelectedRole(title);
    setForm(prev => ({ ...prev, role: title }));
    document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
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
      <section className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Give Your Time</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Volunteer with Us</h1>
          <p className="text-white/75 text-lg">
            Find the volunteer role that matches your skills, availability, and passion for service.
          </p>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Roles</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Volunteering Opportunities</h2>
            {!loadingRoles && (
              <p className="text-mid mt-5 max-w-2xl mx-auto">
                {openRoles.length > 0
                  ? <>We welcome volunteers of all backgrounds. Click any open role to apply — your time and talent can change lives.</>
                  : <>We don&apos;t have any open volunteer roles right now — check back soon.</>}
              </p>
            )}
          </div>

          {loadingRoles ? (
            <div className="flex justify-center py-16 text-mid gap-2">
              <Loader2 size={20} className="animate-spin" /> Loading roles…
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {roles.map(role => (
                <div key={role.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border border-light flex flex-col ${role.is_active ? "card-hover" : "opacity-75"}`}>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {role.category && (
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${role.is_active ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"}`}>
                        {role.category}
                      </span>
                    )}
                    {!role.is_active && (
                      <span className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">
                        <LockKeyhole size={10} /> Closed
                      </span>
                    )}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${role.is_active ? "text-dark" : "text-mid"}`}>{role.title}</h3>
                  <div className="flex flex-col gap-1 mb-3">
                    {role.commitment && (
                      <div className="flex items-center gap-2 text-mid text-sm">
                        <Clock size={14} className="text-primary flex-shrink-0" /> {role.commitment}
                      </div>
                    )}
                    {role.location && (
                      <div className="flex items-center gap-2 text-mid text-sm">
                        <MapPin size={14} className="text-primary flex-shrink-0" /> {role.location}
                      </div>
                    )}
                  </div>
                  <p className="text-mid text-sm leading-relaxed mb-4 flex-1">{role.description}</p>
                  {role.skills.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold text-dark mb-2">Skills needed:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills.map(s => (
                          <span key={s} className="text-xs bg-light text-mid px-2 py-1 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {role.is_active ? (
                    <button onClick={() => handleApply(role.title)}
                      className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-dark transition-colors mt-auto">
                      Apply for This Role
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-100 text-gray-400 text-sm font-semibold rounded-md cursor-not-allowed mt-auto">
                      <LockKeyhole size={13} /> Applications Closed
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Application Form */}
          <div id="volunteer-form" className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-dark mb-3">Register Your Interest</h2>
              <p className="text-mid">Complete the form below and our volunteer coordinator will be in touch within 5 business days.</p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Application Received!</h3>
                <p className="text-mid">Thank you for your interest in volunteering with BUE Foundation. We will review your application and contact you within 5 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-light">
                {selectedRole && (
                  <div className="mb-6 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-medium">
                    Applying for: {selectedRole}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Email Address *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm" placeholder="+234 ..." />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-dark mb-1.5">Home Address</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm" placeholder="House number, street name, area" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">State</label>
                    <select name="state" value={form.state} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white">
                      <option value="">Select state</option>
                      {NIGERIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">LGA</label>
                    <select name="lga" value={form.lga} onChange={handleChange} disabled={!form.state}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                      <option value="">{form.state ? "Select LGA" : "Select state first"}</option>
                      {availableLgas.map(lga => <option key={lga} value={lga}>{lga}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-dark mb-1.5">Volunteering Role *</label>
                  <select name="role" value={form.role} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white">
                    <option value="">Select a role</option>
                    {openRoles.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
                    <option value="General / Any role">General / Any role</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-dark mb-1.5">Availability</label>
                  <input type="text" name="availability" value={form.availability} onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm" placeholder="e.g. Weekends, 5 hours/week, Project-based..." />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark mb-1.5">Why do you want to volunteer with us?</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm resize-none"
                    placeholder="Tell us a little about yourself and your motivation to volunteer..." />
                </div>
                {error && (
                  <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
                )}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors text-base disabled:opacity-50">
                  {loading ? "Submitting…" : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
