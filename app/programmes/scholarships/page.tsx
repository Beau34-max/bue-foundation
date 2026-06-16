"use client";

import { useState } from "react";
import { CheckCircle, GraduationCap, AlertCircle } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";

const scholarships = [
  {
    id: "primary",
    level: "Primary School",
    title: "Primary Education Bursary",
    amount: "Up to ₦30,000 / term",
    deadline: "Rolling applications",
    description: "Covers school fees, uniforms, and stationery for children in primary school from low-income families.",
    criteria: ["Child aged 5–12 in a registered primary school", "Family income below ₦50,000/month", "Proof of school enrolment", "Application by parent or guardian"],
  },
  {
    id: "secondary",
    level: "Secondary School",
    title: "Secondary Education Scholarship",
    amount: "Up to ₦60,000 / term",
    deadline: "Rolling applications",
    description: "Supports JSS and SSS students with school fees, boarding costs, textbooks, and exam registration fees.",
    criteria: ["Student aged 10–18 in a registered secondary school", "Academic performance (minimum 60% average)", "Family financial hardship documentation", "Two teacher references"],
  },
  {
    id: "university",
    level: "University / Polytechnic",
    title: "Tertiary Education Award",
    amount: "Up to ₦150,000 / session",
    deadline: "Quarterly — check form",
    description: "Supports undergraduate and HND students with tuition fees, accommodation, and essential academic materials.",
    criteria: ["Enrolled in an accredited Nigerian university or polytechnic", "Minimum 3.5 GPA (Second Class Upper / Distinction)", "Financial need demonstrated", "Community service or volunteer experience preferred"],
  },
  {
    id: "vocational",
    level: "Vocational / Trade",
    title: "Skills & Trade Scholarship",
    amount: "Full programme fee covered",
    deadline: "Rolling applications",
    description: "Funds full enrolment in a vocational training programme — tailoring, catering, welding, plumbing, ICT, and more.",
    criteria: ["Aged 15 and above", "Identified vocational training programme", "Demonstrated financial need", "Commitment to complete training and report outcomes"],
  },
];

export default function ScholarshipsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", guardianName: "", guardianPhone: "",
    scholarshipType: "", schoolName: "", yearLevel: "", studentAge: "",
    familyIncome: "", financialNeed: "", academicHistory: "",
    address: "", state: "", lga: "",
  });

  const availableLgas = form.state ? (NIGERIA_STATES_LGAS[form.state] || []) : [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "state") {
      setForm((prev) => ({ ...prev, state: value, lga: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const data = new FormData();
    data.append("programme", `Scholarship Application – ${form.scholarshipType}`);
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      const res = await fetch("/api/programme-apply", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) setSubmitted(true);
      else setError(json.error || "Something went wrong.");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <>
      <section className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Programmes</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Scholarships</h1>
          <p className="text-white/75 text-lg">
            Every child deserves a quality education. Our scholarships remove financial barriers for
            students from primary school through university.
          </p>
        </div>
      </section>

      {/* Available scholarships */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Available Awards</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Current Scholarships</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {scholarships.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl p-6 border border-light shadow-sm card-hover">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={20} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold bg-accent text-dark px-2 py-0.5 rounded-full">{s.level}</span>
                    <h3 className="font-bold text-dark mt-1">{s.title}</h3>
                  </div>
                </div>
                <div className="flex gap-4 mb-3 text-sm">
                  <span className="text-primary font-bold">{s.amount}</span>
                  <span className="text-mid">Deadline: {s.deadline}</span>
                </div>
                <p className="text-mid text-sm leading-relaxed mb-4">{s.description}</p>
                <div>
                  <p className="text-xs font-semibold text-dark mb-2">Eligibility:</p>
                  <ul className="space-y-1">
                    {s.criteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-mid text-xs">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Application form */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-dark mb-3">Apply for a Scholarship</h2>
              <p className="text-mid">Complete the form below. We will review and contact you within 3 weeks.</p>
            </div>

            {/* Exam/interview notice */}
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>Please Note:</strong> Successful applicants may be invited to attend the{" "}
                <strong>BUEF Scholarship Examination and/or Interview</strong> as part of the
                selection process. Shortlisted candidates will be contacted with further details.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Application Submitted!</h3>
                <p className="text-mid">Thank you, <strong>{form.name}</strong>! Your scholarship application has been received. We will be in touch within 3 weeks.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-light space-y-5">
                <h3 className="font-bold text-dark border-b border-light pb-3">Applicant Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Student Full Name *</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="Student's full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Student Age *</label>
                    <input type="number" name="studentAge" value={form.studentAge} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="Age" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Parent / Guardian Name *</label>
                    <input type="text" name="guardianName" value={form.guardianName} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="Guardian's full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Guardian Phone *</label>
                    <input type="tel" name="guardianPhone" value={form.guardianPhone} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="+234 ..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Contact Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Phone Number *</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="+234 ..." />
                  </div>
                </div>

                {/* Address section */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Home Address *</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                    placeholder="House number, street name, area" />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">State *</label>
                    <select name="state" value={form.state} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                      <option value="">Select state</option>
                      {NIGERIA_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Local Government Area (LGA) *</label>
                    <select name="lga" value={form.lga} onChange={handleChange} required
                      disabled={!form.state}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      <option value="">{form.state ? "Select LGA" : "Select state first"}</option>
                      {availableLgas.map((lga) => (
                        <option key={lga} value={lga}>{lga}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h3 className="font-bold text-dark border-b border-light pb-3 pt-2">Educational Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Scholarship Type *</label>
                    <select name="scholarshipType" value={form.scholarshipType} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                      <option value="">Select scholarship</option>
                      {scholarships.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">School / Institution Name *</label>
                    <input type="text" name="schoolName" value={form.schoolName} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="Name of school or institution" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Year / Level</label>
                    <input type="text" name="yearLevel" value={form.yearLevel} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="e.g. JSS2, Year 2, 100 Level" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">Estimated Family Monthly Income</label>
                    <select name="familyIncome" value={form.familyIncome} onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                      <option value="">Select range</option>
                      <option value="Below ₦20,000">Below ₦20,000</option>
                      <option value="₦20,000 – ₦50,000">₦20,000 – ₦50,000</option>
                      <option value="₦50,001 – ₦100,000">₦50,001 – ₦100,000</option>
                      <option value="Above ₦100,000">Above ₦100,000</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Describe Your Financial Need *</label>
                  <textarea name="financialNeed" value={form.financialNeed} onChange={handleChange} required rows={3}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                    placeholder="Tell us about your financial situation and why you need this scholarship..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Academic Background & Achievements</label>
                  <textarea name="academicHistory" value={form.academicHistory} onChange={handleChange} rows={3}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                    placeholder="Recent grades, achievements, awards, or any relevant information..." />
                </div>
                {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors text-base disabled:opacity-50">
                  {loading ? "Submitting…" : "Submit Scholarship Application"}
                </button>
                <p className="text-xs text-mid text-center">
                  Shortlisted applicants may be invited to the BUEF Scholarship Exam / Interview.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
