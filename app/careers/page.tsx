"use client";

import { useState } from "react";
import { MapPin, Clock, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const jobs = [
  {
    id: "admin-manager",
    title: "Administrative Manager",
    type: "Full-time",
    location: "Afikpo-North, Ebonyi State (On-site)",
    salary: "Competitive — commensurate with experience",
    department: "Operations",
    summary:
      "We are seeking a highly organised and proactive Administrative Manager to oversee the day-to-day operations of the BUE Foundation. This is a pivotal role that ensures our programmes run smoothly and our team has the support they need to serve communities effectively.",
    responsibilities: [
      "Manage daily administrative operations of the foundation",
      "Coordinate schedules, meetings, and correspondence for the CEO and senior leadership",
      "Maintain accurate records, databases, and filing systems for beneficiaries and donors",
      "Oversee procurement of office supplies and manage vendor relationships",
      "Support programme teams with logistical planning and event coordination",
      "Prepare reports, presentations, and documentation for board and stakeholder meetings",
      "Manage volunteer and staff onboarding processes",
      "Ensure compliance with NGO regulations and internal policies",
    ],
    requirements: [
      "Minimum of 3 years' administrative or office management experience",
      "Excellent written and verbal communication skills",
      "Strong proficiency in Microsoft Office Suite (Word, Excel, Outlook, PowerPoint)",
      "Experience in an NGO, charity, or public sector organisation preferred",
      "Ability to prioritise and manage multiple tasks in a fast-paced environment",
      "High level of integrity, discretion, and attention to detail",
      "OND, HND, or BSc in Business Administration, Management, or related field",
    ],
    desirable: [
      "Experience with project management tools",
      "Knowledge of Nigerian NGO regulatory requirements",
      "Fluency in Igbo and English",
    ],
  },
  {
    id: "fundraiser",
    title: "Fundraising Manager",
    type: "Full-time",
    location: "Afikpo-North / Remote (Hybrid)",
    salary: "Competitive + performance incentives",
    department: "Fundraising & Development",
    summary:
      "The BUE Foundation is looking for a passionate and strategic Fundraising Manager to lead our income generation and donor engagement efforts. You will develop and implement fundraising campaigns, build lasting relationships with donors, and help ensure the sustainability of our programmes.",
    responsibilities: [
      "Develop and execute comprehensive fundraising strategies across individual giving, corporate partnerships, events, and grants",
      "Identify, cultivate, and steward relationships with individual donors, corporate sponsors, and grant-making organisations",
      "Plan and manage fundraising events, campaigns, and digital appeals",
      "Write compelling grant proposals, reports, and donor communication materials",
      "Track fundraising income and manage the donor database",
      "Represent the foundation at networking events and stakeholder engagements",
      "Collaborate with the communications team to align fundraising with brand messaging",
      "Provide regular fundraising performance reports to senior leadership",
    ],
    requirements: [
      "Minimum of 2 years' experience in fundraising, business development, or donor relations",
      "Proven track record of meeting or exceeding fundraising targets",
      "Exceptional written and verbal communication and persuasion skills",
      "Experience writing grant applications or donor proposals",
      "Strong networking ability and relationship management skills",
      "Self-motivated with the ability to work independently and manage own workload",
      "BSc in Communications, Business, Development Studies, or related field",
    ],
    desirable: [
      "Experience in the Nigerian or African NGO sector",
      "Familiarity with Paystack, GoFundMe, or other digital fundraising platforms",
      "Existing network of corporate donors or philanthropic contacts",
    ],
  },
];

function JobCard({ job }: { job: typeof jobs[0] }) {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: job.title,
    experience: "",
    linkedin: "",
    coverLetter: "",
    heardAbout: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-light overflow-hidden">
      {/* Job header */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <span className="inline-block text-xs font-semibold bg-accent text-dark px-3 py-1 rounded-full mb-3">
              {job.department}
            </span>
            <h2 className="text-2xl font-bold text-dark">{job.title}</h2>
          </div>
          <div className="flex flex-col gap-1.5 text-sm text-mid sm:text-right">
            <div className="flex items-center gap-1.5 sm:justify-end">
              <Clock size={14} className="text-primary" /> {job.type}
            </div>
            <div className="flex items-center gap-1.5 sm:justify-end">
              <MapPin size={14} className="text-primary" /> {job.location}
            </div>
          </div>
        </div>
        <p className="text-mid leading-relaxed mb-5">{job.summary}</p>
        <div className="text-sm text-mid mb-5">
          <span className="font-semibold text-dark">Salary: </span>
          {job.salary}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            {expanded ? (
              <>
                Less details <ChevronUp size={16} />
              </>
            ) : (
              <>
                View full job description <ChevronDown size={16} />
              </>
            )}
          </button>
          <button
            onClick={() => {
              setShowForm(true);
              setTimeout(
                () =>
                  document
                    .getElementById(`form-${job.id}`)
                    ?.scrollIntoView({ behavior: "smooth" }),
                100
              );
            }}
            className="px-5 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-light px-6 sm:px-8 py-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-bold text-dark mb-3">Key Responsibilities</h3>
              <ul className="space-y-2 mb-6">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-mid text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
              <h3 className="font-bold text-dark mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-mid text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-dark mb-3">Desirable Skills</h3>
              <ul className="space-y-2">
                {job.desirable.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-mid text-sm">
                    <div className="w-1.5 h-1.5 bg-mid rounded-full mt-2 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Application Form */}
      {showForm && (
        <div id={`form-${job.id}`} className="border-t border-light px-6 sm:px-8 py-8 bg-page">
          <h3 className="text-xl font-bold text-dark mb-6">
            Apply for: {job.title}
          </h3>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-dark mb-2">Application Submitted!</h4>
              <p className="text-mid">
                Thank you for applying to the <strong>{job.title}</strong> role at BUE
                Foundation. We will review your application and reach out within 10 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
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
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
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
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
                    placeholder="+234 ..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Years of Relevant Experience *
                  </label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
                  >
                    <option value="">Select</option>
                    <option value="0-1 years">0–1 years</option>
                    <option value="1-2 years">1–2 years</option>
                    <option value="2-5 years">2–5 years</option>
                    <option value="5-10 years">5–10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  Cover Letter / Motivation Statement *
                </label>
                <textarea
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all resize-none"
                  placeholder={`Tell us why you want to join the BUE Foundation as ${job.title} and what you will bring to this role...`}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-1.5">
                  How did you hear about this role?
                </label>
                <select
                  name="heardAbout"
                  value={form.heardAbout}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
                >
                  <option value="">Select</option>
                  <option value="Foundation website">Foundation website</option>
                  <option value="Social media">Social media</option>
                  <option value="Word of mouth">Word of mouth</option>
                  <option value="Job board">Job board</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-700">
                <strong>CV / Resume:</strong> Please email your CV to{" "}
                <a
                  href="mailto:info@buef.onmicrosoft.com"
                  className="font-semibold underline hover:no-underline"
                >
                  info@buef.onmicrosoft.com
                </a>{" "}
                with subject line:{" "}
                <em>&ldquo;Application – {job.title}&rdquo;</em>, alongside submission of this form.
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors text-base"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3.5 border border-light text-mid font-semibold rounded-md hover:bg-light transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default function CareersPage() {
  return (
    <>
      {/* Header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Join Our Team
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Careers at BUE Foundation</h1>
          <p className="text-white/75 text-lg">
            Build a career with purpose. We are looking for passionate individuals ready to make a
            lasting difference in Nigerian communities.
          </p>
        </div>
      </section>

      {/* Why Work with Us */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { label: "Purposeful Work", desc: "Every day, your work directly impacts vulnerable lives." },
              { label: "Growth Opportunities", desc: "We invest in our team's professional development." },
              { label: "Inclusive Culture", desc: "A warm, collaborative team united by shared values." },
            ].map((item) => (
              <div key={item.label} className="p-6">
                <h3 className="font-bold text-primary text-lg mb-2">{item.label}</h3>
                <p className="text-mid text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Open Positions
            </p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">
              Current Vacancies
            </h2>
            <p className="text-mid mt-5 max-w-xl mx-auto">
              We currently have <strong>2 open positions</strong>. Click on a role to view the full
              job description and apply.
            </p>
          </div>
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* General Application */}
      <section
        className="py-16"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #3a1757 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Don&apos;t See a Suitable Role?
          </h2>
          <p className="text-white/75 mb-6">
            We are always on the lookout for talented, passionate individuals. Send us your CV and a
            brief introduction — we will keep your details on file for future opportunities.
          </p>
          <a
            href="mailto:info@buef.onmicrosoft.com?subject=General Application – BUE Foundation"
            className="inline-block px-8 py-3.5 bg-accent text-dark font-bold rounded-md hover:opacity-90 transition-opacity"
          >
            Send a General Application
          </a>
        </div>
      </section>
    </>
  );
}
