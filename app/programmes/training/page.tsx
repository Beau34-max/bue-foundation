"use client";

import { useState } from "react";
import { CheckCircle, Clock, Users, Award } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";

const courses = [
  {
    id: "fashion",
    title: "Fashion Design & Tailoring",
    duration: "12 weeks",
    schedule: "Mon, Wed, Fri — 9am–12pm",
    format: "In-person · Afikpo-North",
    level: "Beginner to Intermediate",
    cost: "Free (BUE Sponsored)",
    nextStart: "3 August 2026",
    description: "Learn pattern drafting, fabric selection, garment construction, and business skills to launch your own fashion label or tailoring service.",
    outcomes: ["Sew complete garments from scratch", "Pattern cutting and drafting", "Business pricing and marketing", "Certificate of completion"],
    category: "Trades",
  },
  {
    id: "catering",
    title: "Catering & Food Business",
    duration: "8 weeks",
    schedule: "Tues & Thurs — 10am–2pm",
    format: "In-person · Afikpo-North",
    level: "All levels",
    cost: "Free (BUE Sponsored)",
    nextStart: "11 August 2026",
    description: "Master commercial cooking, food hygiene, packaging, pricing, and how to market and grow a catering or food business.",
    outcomes: ["Commercial food preparation", "NAFDAC & hygiene compliance basics", "Menu planning & costing", "Certificate of completion"],
    category: "Trades",
  },
  {
    id: "business-foundations",
    title: "Business Foundations",
    duration: "6 weeks",
    schedule: "Saturdays — 9am–1pm",
    format: "In-person + Online resources",
    level: "Beginner",
    cost: "Free (required for Enterprise Fund)",
    nextStart: "1 August 2026",
    description: "Essential knowledge for anyone starting or running a business — covers business planning, registration, bookkeeping, marketing, and customer service.",
    outcomes: ["Write a simple business plan", "Register a business in Nigeria", "Basic bookkeeping & financial management", "Digital marketing fundamentals", "Certificate (required for Enterprise Fund)"],
    category: "Business",
  },
  {
    id: "digital-skills",
    title: "Digital Skills & ICT",
    duration: "10 weeks",
    schedule: "Mon & Wed — 2pm–5pm",
    format: "In-person · Afikpo-North",
    level: "Beginner to Intermediate",
    cost: "Free (BUE Sponsored)",
    nextStart: "17 August 2026",
    description: "Learn practical computer skills, Microsoft Office, internet use, social media for business, and introduction to freelancing online.",
    outcomes: ["Confident computer & internet use", "Microsoft Word, Excel, PowerPoint", "Social media for business", "Basic freelancing skills"],
    category: "Digital",
  },
  {
    id: "financial-literacy",
    title: "Financial Literacy & Savings",
    duration: "4 weeks",
    schedule: "Saturdays — 2pm–5pm",
    format: "In-person · Afikpo-North",
    level: "All levels",
    cost: "Free",
    nextStart: "8 August 2026",
    description: "Build strong financial habits — budgeting, saving, banking, investment basics, and how to avoid common money traps.",
    outcomes: ["Personal budget creation", "Savings strategies", "Understanding bank products", "Avoiding debt traps"],
    category: "Finance",
  },
  {
    id: "entrepreneurship",
    title: "Women in Entrepreneurship",
    duration: "8 weeks",
    schedule: "Fridays — 10am–1pm",
    format: "In-person · Afikpo-North",
    level: "All levels",
    cost: "Free (women only)",
    nextStart: "7 August 2026",
    description: "A dedicated programme empowering women to start and grow businesses — covering leadership, mindset, networking, funding access, and balancing business with family.",
    outcomes: ["Business idea validation", "Access to funding sources", "Leadership & confidence building", "Peer network of women entrepreneurs"],
    category: "Entrepreneurship",
  },
];

const categoryColors: Record<string, string> = {
  Trades: "bg-blue-100 text-blue-700",
  Business: "bg-purple-100 text-purple-700",
  Digital: "bg-cyan-100 text-cyan-700",
  Finance: "bg-green-100 text-green-700",
  Entrepreneurship: "bg-pink-100 text-pink-700",
};

export default function TrainingPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, { name: string; email: string; phone: string; address: string; state: string; lga: string; motivation: string }>>({});

  function getForm(id: string) {
    return forms[id] || { name: "", email: "", phone: "", address: "", state: "", lga: "", motivation: "" };
  }

  function handleChange(id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "state") {
      setForms((prev) => ({ ...prev, [id]: { ...getForm(id), state: value, lga: "" } }));
    } else {
      setForms((prev) => ({ ...prev, [id]: { ...getForm(id), [name]: value } }));
    }
  }

  async function handleRegister(e: React.FormEvent, course: (typeof courses)[0]) {
    e.preventDefault(); setLoadingId(course.id);
    const f = getForm(course.id);
    const data = new FormData();
    data.append("programme", `Training Registration – ${course.title}`);
    data.append("name", f.name); data.append("email", f.email); data.append("phone", f.phone);
    data.append("address", f.address); data.append("state", f.state); data.append("lga", f.lga);
    data.append("course", course.title); data.append("courseStart", course.nextStart);
    data.append("motivation", f.motivation);
    try {
      const res = await fetch("/api/programme-apply", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) setSubmitted(course.id);
    } catch { /* silent */ }
    finally { setLoadingId(null); }
  }

  return (
    <>
      <section className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Programmes</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Training Programmes</h1>
          <p className="text-white/75 text-lg">
            Free, practical, skills-based training designed to equip individuals with tools for
            sustainable livelihoods — from trades and tech to business and finance.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 border-b border-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { icon: Award, label: "Courses Available", value: "6" },
              { icon: Users, label: "Learners Trained", value: "200+" },
              { icon: Clock, label: "All Courses Free", value: "100%" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon size={24} className="text-primary mx-auto mb-2" />
                <div className="text-2xl font-extrabold text-primary">{value}</div>
                <div className="text-mid text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Enrol Today</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Available Courses</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-light card-hover flex flex-col overflow-hidden">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[course.category] || "bg-gray-100 text-gray-600"}`}>
                      {course.category}
                    </span>
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                      {course.cost.startsWith("Free") ? "Free" : course.cost}
                    </span>
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-2">{course.title}</h3>
                  <div className="space-y-1 mb-3 text-xs text-mid">
                    <div className="flex items-center gap-1.5"><Clock size={12} className="text-primary" />{course.duration} · {course.schedule}</div>
                    <div>{course.format}</div>
                    <div className="text-primary font-semibold">Next start: {course.nextStart}</div>
                  </div>
                  <p className="text-mid text-sm leading-relaxed mb-4">{course.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-dark mb-2">What you&apos;ll gain:</p>
                    <ul className="space-y-1">
                      {course.outcomes.map((o, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-mid">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />{o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  {submitted === course.id ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                      <CheckCircle size={18} /> Registered successfully!
                    </div>
                  ) : openForm === course.id ? (
                    <form onSubmit={(e) => handleRegister(e, course)} className="space-y-3">
                      {[
                        { name: "name", placeholder: "Full name", type: "text" },
                        { name: "email", placeholder: "Email address", type: "email" },
                        { name: "phone", placeholder: "Phone number", type: "tel" },
                      ].map((f) => (
                        <input key={f.name} type={f.type} name={f.name} value={(getForm(course.id) as Record<string,string>)[f.name]}
                          onChange={(e) => handleChange(course.id, e)} required placeholder={f.placeholder}
                          className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all" />
                      ))}
                      <input type="text" name="address" value={getForm(course.id).address}
                        onChange={(e) => handleChange(course.id, e)} placeholder="Home address"
                        className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all" />
                      <div className="grid grid-cols-2 gap-2">
                        <select name="state" value={getForm(course.id).state}
                          onChange={(e) => handleChange(course.id, e)}
                          className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm bg-white transition-all">
                          <option value="">State</option>
                          {NIGERIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <select name="lga" value={getForm(course.id).lga}
                          onChange={(e) => handleChange(course.id, e)}
                          disabled={!getForm(course.id).state}
                          className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                          <option value="">{getForm(course.id).state ? "LGA" : "State first"}</option>
                          {(NIGERIA_STATES_LGAS[getForm(course.id).state] || []).map((lga) => <option key={lga} value={lga}>{lga}</option>)}
                        </select>
                      </div>
                      <textarea name="motivation" value={getForm(course.id).motivation}
                        onChange={(e) => handleChange(course.id, e)} rows={2} placeholder="Why do you want to join this course?"
                        className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all resize-none" />
                      <div className="flex gap-2">
                        <button type="submit" disabled={loadingId === course.id}
                          className="flex-1 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50">
                          {loadingId === course.id ? "Sending…" : "Enrol Now"}
                        </button>
                        <button type="button" onClick={() => setOpenForm(null)}
                          className="px-3 py-2 border border-light text-mid text-sm rounded-md hover:bg-light transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button onClick={() => setOpenForm(course.id)}
                      className="w-full py-2.5 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-colors">
                      Register for This Course
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
