"use client";

import { useState } from "react";
import { CheckCircle, Lightbulb, TrendingUp, RefreshCw, ShieldCheck, ArrowRight } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";

const steps = [
  { step: "01", title: "Apply Online", desc: "Submit your business idea, funding request, and personal details through our application form below." },
  { step: "02", title: "Attend BUE Training", desc: "Shortlisted applicants must complete our free Business Foundations training before funding is awarded." },
  { step: "03", title: "Review & Approval", desc: "Our Enterprise Committee reviews your plan. Successful applicants are notified within 4 weeks." },
  { step: "04", title: "Sign Agreement", desc: "You sign a Profit-Sharing Agreement: 10% of net monthly profit returned to the foundation for 24 months." },
  { step: "05", title: "Receive Capital", desc: "Startup capital is disbursed directly to your account — ready to launch or grow your business." },
  { step: "06", title: "Grow & Report", desc: "Build your business. Submit quarterly profit reports and return 10% of profits. Your success funds the next entrepreneur." },
];

const fundDetails = [
  { label: "Minimum Grant", value: "₦50,000" },
  { label: "Maximum Grant", value: "₦500,000" },
  { label: "Profit Share", value: "10% of net profit" },
  { label: "Duration", value: "24 months" },
  { label: "Interest", value: "Zero — profit-share only" },
  { label: "Training Required", value: "Yes — free BUE programme" },
];

const eligibility = [
  "Nigerian resident aged 18 and above",
  "Business idea that is legal, viable, and community-serving",
  "No existing bank loan or outstanding debt exceeding ₦200,000",
  "Ability to attend BUE Business Foundations training",
  "Willingness to submit quarterly profit reports",
  "Two character references from trusted community members",
];

const sectors = [
  "Fashion & Tailoring", "Food & Catering", "Agriculture & Farming",
  "Technology & Digital Services", "Retail & Trade", "Beauty & Wellness",
  "Crafts & Manufacturing", "Transport & Logistics", "Education & Tutoring", "Any viable sector",
];

export default function EnterpriseFundPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", state: "", lga: "",
    businessName: "", businessSector: "", businessStage: "",
    fundingAmount: "", businessDescription: "", revenueModel: "",
    profitEstimate: "", whyBUE: "",
  });

  const availableLgas = NIGERIA_STATES_LGAS[form.state] || [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "state") {
      setForm((prev) => ({ ...prev, state: value, lga: "" }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const data = new FormData();
    data.append("programme", "BUE Enterprise Fund");
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
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">BUE Enterprise Fund</h1>
          <p className="text-white/75 text-lg">
            Start-up capital for entrepreneurs with vision. Zero interest — just a commitment to share
            your success with the next generation of Joybringers.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">The Model</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">How It Works</h2>
            <p className="text-mid mt-5 max-w-2xl mx-auto">
              We provide interest-free startup capital. In return, you share <strong>10% of your net
              monthly profit</strong> with the foundation for <strong>24 months</strong>. Those returns
              fund the next entrepreneur — creating a perpetual cycle of empowerment.
            </p>
          </div>

          {/* Impact flow diagram */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 text-center">
            {[
              { icon: Lightbulb, label: "Your Idea" },
              { icon: TrendingUp, label: "BUE Capital" },
              { icon: ShieldCheck, label: "Business Grows" },
              { icon: RefreshCw, label: "10% Returns" },
              { icon: Lightbulb, label: "Next Entrepreneur" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                      <Icon size={24} className="text-white" />
                    </div>
                    <p className="text-xs font-semibold text-dark">{item.label}</p>
                  </div>
                  {i < 4 && <ArrowRight size={20} className="text-primary flex-shrink-0" />}
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-xl p-6 border border-light shadow-sm">
                <div className="text-3xl font-extrabold text-primary/20 mb-2">{s.step}</div>
                <h3 className="font-bold text-dark mb-2">{s.title}</h3>
                <p className="text-mid text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fund details + Eligibility */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6 section-heading">Fund Details</h2>
              <div className="space-y-3">
                {fundDetails.map((d) => (
                  <div key={d.label} className="flex items-center justify-between p-4 bg-page rounded-xl border border-light">
                    <span className="text-mid text-sm font-medium">{d.label}</span>
                    <span className="font-bold text-primary">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-dark mb-6 section-heading">Eligibility</h2>
              <ul className="space-y-3">
                {eligibility.map((e, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-mid text-sm leading-relaxed">{e}</p>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-dark mt-10 mb-4 section-heading">Sectors We Fund</h2>
              <div className="flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <span key={s} className="text-xs bg-primary/10 text-primary font-medium px-3 py-1.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Apply Now</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Enterprise Fund Application</h2>
            <p className="text-mid mt-5">Applications are reviewed quarterly. All fields marked * are required.</p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark mb-2">Application Received!</h3>
              <p className="text-mid">Thank you, <strong>{form.name}</strong>! We will review your enterprise application and contact you within 4 weeks. If shortlisted, you will be invited to our free BUE Business Foundations training.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-light space-y-5">
              <h3 className="font-bold text-dark text-base border-b border-light pb-3">Personal Details</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { name: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
                  { name: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
                  { name: "phone", label: "Phone Number", placeholder: "+234 ...", type: "tel" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-sm font-semibold text-dark mb-1.5">{f.label} *</label>
                    <input type={f.type} name={f.name} value={(form as Record<string,string>)[f.name]} onChange={handleChange} required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder={f.placeholder} />
                  </div>
                ))}
              </div>
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
                    {NIGERIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Local Government Area (LGA) *</label>
                  <select name="lga" value={form.lga} onChange={handleChange} required disabled={!form.state}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">{form.state ? "Select LGA" : "Select state first"}</option>
                    {availableLgas.map((lga) => <option key={lga} value={lga}>{lga}</option>)}
                  </select>
                </div>
              </div>

              <h3 className="font-bold text-dark text-base border-b border-light pb-3 pt-2">Business Details</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Business Name *</label>
                  <input type="text" name="businessName" value={form.businessName} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all" placeholder="Name of your business" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Business Sector *</label>
                  <select name="businessSector" value={form.businessSector} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                    <option value="">Select sector</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Business Stage *</label>
                  <select name="businessStage" value={form.businessStage} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                    <option value="">Select stage</option>
                    <option value="Idea stage — not yet started">Idea stage — not yet started</option>
                    <option value="Early stage — started but pre-revenue">Early stage — started but pre-revenue</option>
                    <option value="Growth stage — generating some revenue">Growth stage — generating some revenue</option>
                    <option value="Expansion stage — looking to scale">Expansion stage — looking to scale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">Funding Amount Requested (₦) *</label>
                  <select name="fundingAmount" value={form.fundingAmount} onChange={handleChange} required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                    <option value="">Select amount</option>
                    <option value="₦50,000 – ₦100,000">₦50,000 – ₦100,000</option>
                    <option value="₦100,001 – ₦200,000">₦100,001 – ₦200,000</option>
                    <option value="₦200,001 – ₦350,000">₦200,001 – ₦350,000</option>
                    <option value="₦350,001 – ₦500,000">₦350,001 – ₦500,000</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">Describe Your Business Idea *</label>
                <textarea name="businessDescription" value={form.businessDescription} onChange={handleChange} required rows={4}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                  placeholder="What does your business do? Who are your customers? What problem does it solve?" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">How Will You Make Money? (Revenue Model) *</label>
                <textarea name="revenueModel" value={form.revenueModel} onChange={handleChange} required rows={3}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                  placeholder="How will the business generate income? e.g. product sales, service fees, subscriptions..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">Estimated Monthly Profit After 6 Months</label>
                <input type="text" name="profitEstimate" value={form.profitEstimate} onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                  placeholder="e.g. ₦30,000 – ₦50,000 per month" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">Why Should BUE Fund Your Business? *</label>
                <textarea name="whyBUE" value={form.whyBUE} onChange={handleChange} required rows={4}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                  placeholder="Tell us about yourself, your commitment, and why your business deserves this opportunity..." />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
                <strong>By submitting this form</strong>, you agree that if approved, you will sign a
                Profit-Sharing Agreement committing to return 10% of net monthly profit to BUE Foundation
                for 24 months, and attend the mandatory BUE Business Foundations training.
              </div>
              {error && <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors text-base disabled:opacity-50">
                {loading ? "Submitting…" : "Submit Enterprise Fund Application"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
