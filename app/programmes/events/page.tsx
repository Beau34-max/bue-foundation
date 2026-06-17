"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, CheckCircle } from "lucide-react";
import { NIGERIA_STATES, NIGERIA_STATES_LGAS } from "@/lib/nigeria-lgas";

const events = [
  {
    id: "biz-seminar-1",
    title: "Business Foundations Seminar",
    type: "Business Seminar",
    date: "Saturday, 1 August 2026",
    time: "9:00 AM – 2:00 PM",
    location: "BUE Foundation Hall, Afikpo-North, Ebonyi State",
    description: "A practical, hands-on seminar covering the fundamentals of starting and running a profitable business in Nigeria. Topics include business registration, pricing, bookkeeping, customer acquisition, and digital marketing.",
    speakers: ["Beatrice Uchenna Egwu – BUE Foundation", "TBA – Business Development Expert"],
    price: "Free",
    seats: "Limited to 80 attendees",
    tags: ["Business", "Free Entry"],
  },
  {
    id: "enterprise-bootcamp",
    title: "Enterprise Fund Bootcamp",
    type: "Workshop",
    date: "Saturday, 15 August 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Afikpo Community Centre, Ebonyi State",
    description: "A full-day bootcamp for applicants and recipients of the BUE Enterprise Fund. Covers business planning, financial management, profit reporting, and mentorship pairing. Mandatory for approved Enterprise Fund recipients.",
    speakers: ["BUE Enterprise Committee", "Guest Mentors"],
    price: "Free (Enterprise Fund applicants only)",
    seats: "Invitation-only for shortlisted applicants",
    tags: ["Enterprise Fund", "Workshop"],
  },
  {
    id: "community-outreach",
    title: "Community Outreach Day",
    type: "Community Event",
    date: "Saturday, 29 August 2026",
    time: "8:00 AM – 1:00 PM",
    location: "Ezi Agha-Orie Ukpa, Afikpo-North",
    description: "Join us as we distribute food packages, school supplies, and hygiene kits to families in need. Volunteers welcome. Come and be a Joybringer!",
    speakers: [],
    price: "Free",
    seats: "Open to all",
    tags: ["Community", "Volunteer", "Free Entry"],
  },
  {
    id: "fundraising-gala",
    title: "Annual Joybringers Gala",
    type: "Fundraising Gala",
    date: "Saturday, 26 September 2026",
    time: "6:00 PM – 10:00 PM",
    location: "Venue TBC — Ebonyi State",
    description: "Our flagship annual fundraising dinner celebrating our impact and raising funds for the year ahead. Includes awards, live music, testimonies from beneficiaries, and a charity auction.",
    speakers: ["Beatrice Uchenna Egwu – CEO", "Guest of Honour TBA"],
    price: "₦5,000 per ticket",
    seats: "150 seats available",
    tags: ["Fundraising", "Gala", "Ticketed"],
  },
];

export default function EventsPage() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [forms, setForms] = useState<Record<string, { name: string; email: string; phone: string; address: string; state: string; lga: string; dietary: string }>>({});

  function getForm(id: string) {
    return forms[id] || { name: "", email: "", phone: "", address: "", state: "", lga: "", dietary: "" };
  }

  function handleChange(id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "state") {
      setForms((prev) => ({ ...prev, [id]: { ...getForm(id), state: value, lga: "" } }));
    } else {
      setForms((prev) => ({ ...prev, [id]: { ...getForm(id), [name]: value } }));
    }
  }

  async function handleRegister(e: React.FormEvent, event: (typeof events)[0]) {
    e.preventDefault();
    setLoadingId(event.id);
    const f = getForm(event.id);
    const data = new FormData();
    data.append("programme", `Event Registration – ${event.title}`);
    data.append("name", f.name);
    data.append("email", f.email);
    data.append("phone", f.phone);
    data.append("address", f.address);
    data.append("state", f.state);
    data.append("lga", f.lga);
    data.append("event", event.title);
    data.append("eventDate", event.date);
    data.append("dietaryRequirements", f.dietary);
    try {
      const res = await fetch("/api/programme-apply", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) setSubmitted(event.id);
    } catch { /* silent */ }
    finally { setLoadingId(null); }
  }

  return (
    <>
      <section className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">Programmes</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Events</h1>
          <p className="text-white/75 text-lg">
            Business seminars, community outreach, training workshops, and fundraising galas.
            Connect, learn, and be part of the Joybringers movement.
          </p>
        </div>
      </section>

      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Coming Up</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Upcoming Events</h2>
          </div>
          <div className="space-y-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-light overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((tag) => (
                      <span key={tag} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        tag === "Free Entry" || tag === "Free" ? "bg-green-100 text-green-700" :
                        tag === "Ticketed" ? "bg-amber-100 text-amber-700" :
                        "bg-primary/10 text-primary"
                      }`}>{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-dark mb-2">{event.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-mid mb-4">
                    <div className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" />{event.date}</div>
                    <div className="flex items-center gap-1.5"><Clock size={14} className="text-primary" />{event.time}</div>
                    <div className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" />{event.location}</div>
                  </div>
                  <p className="text-mid leading-relaxed mb-4">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span><strong className="text-dark">Price:</strong> <span className="text-primary font-semibold">{event.price}</span></span>
                    <span><strong className="text-dark">Availability:</strong> {event.seats}</span>
                  </div>
                </div>

                {/* Registration */}
                <div className="border-t border-light px-6 sm:px-8 py-6 bg-page">
                  {submitted === event.id ? (
                    <div className="flex items-center gap-3 text-green-600">
                      <CheckCircle size={22} />
                      <p className="font-semibold">You&apos;re registered! We&apos;ll send confirmation to {getForm(event.id).email}</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleRegister(e, event)}>
                      <h3 className="font-semibold text-dark mb-4">Register for this event</h3>
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Full Name *</label>
                          <input type="text" name="name" value={getForm(event.id).name}
                            onChange={(e) => handleChange(event.id, e)} required
                            className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all bg-white" placeholder="Your name" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Email *</label>
                          <input type="email" name="email" value={getForm(event.id).email}
                            onChange={(e) => handleChange(event.id, e)} required
                            className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all bg-white" placeholder="your@email.com" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">Phone *</label>
                          <input type="tel" name="phone" value={getForm(event.id).phone}
                            onChange={(e) => handleChange(event.id, e)} required
                            className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all bg-white" placeholder="+234 ..." />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-dark mb-1">Home Address</label>
                        <input type="text" name="address" value={getForm(event.id).address}
                          onChange={(e) => handleChange(event.id, e)}
                          className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all bg-white" placeholder="House number, street name, area" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">State</label>
                          <select name="state" value={getForm(event.id).state}
                            onChange={(e) => handleChange(event.id, e)}
                            className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all bg-white">
                            <option value="">Select state</option>
                            {NIGERIA_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-dark mb-1">LGA</label>
                          <select name="lga" value={getForm(event.id).lga}
                            onChange={(e) => handleChange(event.id, e)}
                            disabled={!getForm(event.id).state}
                            className="w-full px-3 py-2 border border-light rounded-lg text-dark text-sm transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value="">{getForm(event.id).state ? "Select LGA" : "Select state first"}</option>
                            {(NIGERIA_STATES_LGAS[getForm(event.id).state] || []).map((lga) => <option key={lga} value={lga}>{lga}</option>)}
                          </select>
                        </div>
                      </div>
                      <button type="submit" disabled={loadingId === event.id}
                        className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50">
                        {loadingId === event.id ? "Registering…" : "Register Now"}
                      </button>
                    </form>
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
