"use client";

import { useState } from "react";
import { Clock, MapPin, CheckCircle } from "lucide-react";

const opportunities = [
  {
    title: "Community Outreach Volunteer",
    commitment: "Flexible / Weekends",
    location: "Afikpo-North, Ebonyi State",
    description:
      "Join our team at community outreach events, distributing essential items and providing direct support to beneficiaries.",
    skills: ["Interpersonal skills", "Physical fitness", "Compassion"],
    category: "Field",
  },
  {
    title: "Education Support Volunteer",
    commitment: "2–4 hours per week",
    location: "Afikpo-North & Remote",
    description:
      "Support children and youth in our scholarship programme through tutoring, mentoring, and educational guidance.",
    skills: ["Teaching or tutoring", "Patience", "Subject expertise"],
    category: "Education",
  },
  {
    title: "Administrative Volunteer",
    commitment: "Part-time (flexible)",
    location: "Office / Remote",
    description:
      "Help with data entry, filing, communications, and general office administration to keep our operations running smoothly.",
    skills: ["Microsoft Office", "Organisation", "Attention to detail"],
    category: "Admin",
  },
  {
    title: "Fundraising Support Volunteer",
    commitment: "Project-based",
    location: "Remote / Afikpo-North",
    description:
      "Help plan and execute fundraising campaigns, events, and donor outreach activities that sustain our programmes.",
    skills: ["Communication", "Events experience", "Persuasion"],
    category: "Fundraising",
  },
  {
    title: "Digital & Social Media Volunteer",
    commitment: "3–5 hours per week",
    location: "Remote",
    description:
      "Create engaging content, manage our social media presence, and help tell our story to a wider audience.",
    skills: ["Social media", "Content creation", "Graphic design"],
    category: "Digital",
  },
  {
    title: "Skills Trainer / Facilitator",
    commitment: "Flexible / Workshop-based",
    location: "Afikpo-North, Ebonyi State",
    description:
      "Deliver vocational training sessions in your area of expertise — from tailoring and baking to IT and finance.",
    skills: ["Vocational expertise", "Teaching ability", "Organisation"],
    category: "Training",
  },
];

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    availability: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleApply(role: string) {
    setSelectedRole(role);
    setForm((prev) => ({ ...prev, role }));
    document.getElementById("volunteer-form")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Give Your Time
          </p>
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
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Open Roles
            </p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">
              Volunteering Opportunities
            </h2>
            <p className="text-mid mt-5 max-w-2xl mx-auto">
              We welcome volunteers of all ages, backgrounds, and skill sets. Click any role below
              to apply — your time and talent can change lives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {opportunities.map((opp) => (
              <div
                key={opp.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-light card-hover flex flex-col"
              >
                <span className="inline-block text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full mb-4 w-fit">
                  {opp.category}
                </span>
                <h3 className="font-bold text-dark text-lg mb-2">{opp.title}</h3>
                <div className="flex flex-col gap-1 mb-3">
                  <div className="flex items-center gap-2 text-mid text-sm">
                    <Clock size={14} className="text-primary flex-shrink-0" />
                    {opp.commitment}
                  </div>
                  <div className="flex items-center gap-2 text-mid text-sm">
                    <MapPin size={14} className="text-primary flex-shrink-0" />
                    {opp.location}
                  </div>
                </div>
                <p className="text-mid text-sm leading-relaxed mb-4 flex-1">{opp.description}</p>
                <div className="mb-5">
                  <p className="text-xs font-semibold text-dark mb-2">Skills needed:</p>
                  <div className="flex flex-wrap gap-1">
                    {opp.skills.map((s) => (
                      <span key={s} className="text-xs bg-light text-mid px-2 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleApply(opp.title)}
                  className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary-dark transition-colors"
                >
                  Apply for This Role
                </button>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div id="volunteer-form" className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-dark mb-3">Register Your Interest</h2>
              <p className="text-mid">
                Complete the form below and our volunteer coordinator will be in touch within 5
                business days.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-dark mb-2">Application Received!</h3>
                <p className="text-mid">
                  Thank you for your interest in volunteering with BUE Foundation. We will review
                  your application and contact you within 5 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-sm border border-light"
              >
                {selectedRole && (
                  <div className="mb-6 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-medium">
                    Applying for: {selectedRole}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                      placeholder="+234 ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Volunteering Role *
                    </label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all bg-white"
                    >
                      <option value="">Select a role</option>
                      {opportunities.map((o) => (
                        <option key={o.title} value={o.title}>
                          {o.title}
                        </option>
                      ))}
                      <option value="General / Any role">General / Any role</option>
                    </select>
                  </div>
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Availability
                  </label>
                  <input
                    type="text"
                    name="availability"
                    value={form.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                    placeholder="e.g. Weekends, 5 hours/week, Project-based..."
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Why do you want to volunteer with us?
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                    placeholder="Tell us a little about yourself and your motivation to volunteer..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors text-base"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
