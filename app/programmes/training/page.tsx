"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Clock, Users, Award, ArrowRight, Loader2 } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";
import type { TrainingProgramme } from "@/lib/types";

const categoryColors: Record<string, string> = {
  Trades: "bg-blue-100 text-blue-700",
  Business: "bg-purple-100 text-purple-700",
  Digital: "bg-cyan-100 text-cyan-700",
  Finance: "bg-green-100 text-green-700",
  Entrepreneurship: "bg-pink-100 text-pink-700",
  Health: "bg-red-100 text-red-700",
  General: "bg-gray-100 text-gray-700",
  Other: "bg-gray-100 text-gray-700",
};

export default function TrainingPage() {
  const [courses, setCourses] = useState<TrainingProgramme[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, { name: string; email: string; phone: string; address: string; state: string; lga: string; motivation: string }>>({});

  useEffect(() => {
    fetch("/api/training")
      .then(r => r.json())
      .then(data => setCourses(Array.isArray(data) ? data : []))
      .finally(() => setCoursesLoading(false));
  }, []);

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

  async function handleRegister(e: React.FormEvent, course: TrainingProgramme) {
    e.preventDefault(); setLoadingId(course.id);
    const f = getForm(course.id);
    const data = new FormData();
    data.append("programme", `Training Registration – ${course.title}`);
    data.append("name", f.name); data.append("email", f.email); data.append("phone", f.phone);
    data.append("address", f.address); data.append("state", f.state); data.append("lga", f.lga);
    data.append("course", course.title); data.append("courseStart", course.next_start);
    data.append("motivation", f.motivation);
    try {
      const res = await fetch("/api/programme-apply", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setSubmitted(course.id);
      } else {
        alert(json.error || "Something went wrong. Please try again.");
      }
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
              { icon: Award, label: "Courses Available", value: `${courses.length || "—"}` },
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

      {/* Featured: Digital Skills-Up Programme */}
      <section className="py-12 bg-page border-b border-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl overflow-hidden border-2 border-primary shadow-md"
            style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #2d1242 100%)" }}>
            <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1 text-white">
                <span className="inline-block text-xs font-bold bg-accent text-dark px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                  Now Open · Starts 7 September 2026
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
                  Six-Week Digital Skills-Up Programme
                </h2>
                <p className="text-white/75 text-sm mb-4">
                  Free online training in Power BI, Adobe, Canva, PowerPoint, and CV Writing.
                  Monday, Thursday &amp; Saturday · 4–6 PM · Fully online.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Power BI", "Adobe", "Canva", "PowerPoint", "CV Writing"].map(s => (
                    <span key={s} className="text-xs bg-white/15 text-white px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end shrink-0">
                <Link href="/programmes/training/digital-skills-up"
                  className="flex items-center gap-2 px-6 py-3 bg-accent text-dark font-bold rounded-md hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                  View Programme <ArrowRight size={15} />
                </Link>
                <Link href="/programmes/training/digital-skills-up/register"
                  className="flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-md hover:bg-white/25 transition-colors text-sm whitespace-nowrap">
                  Register Now <ArrowRight size={15} />
                </Link>
              </div>
            </div>
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

          {coursesLoading ? (
            <div className="flex justify-center py-16 text-mid gap-2">
              <Loader2 size={20} className="animate-spin" /> Loading courses…
            </div>
          ) : courses.length === 0 ? (
            <p className="text-center text-mid py-16">No courses available right now — check back soon.</p>
          ) : (
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
                      <div className="text-primary font-semibold">Next start: {course.next_start}</div>
                    </div>
                    <p className="text-mid text-sm leading-relaxed mb-4">{course.description}</p>
                    {course.outcomes.length > 0 && (
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
                    )}
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
                          <input key={f.name} type={f.type} name={f.name}
                            value={(getForm(course.id) as Record<string, string>)[f.name]}
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
                          onChange={(e) => handleChange(course.id, e)} rows={2}
                          placeholder="Why do you want to join this course?"
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
          )}
        </div>
      </section>
    </>
  );
}
