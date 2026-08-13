import Link from "next/link";
import { Calendar, Clock, Monitor, Users, ArrowRight, BookOpen, BarChart2, Layers, PenTool, Presentation, FileText, CheckCircle } from "lucide-react";

const MODULES = [
  {
    slug: "power-bi",
    title: "Power BI",
    subtitle: "Data Visualisation",
    icon: BarChart2,
    accent: "#F59E0B",
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
    accentBorder: "border-amber-200",
    description:
      "Introduction to data visualisation, importing and organising data, creating reports and dashboards, and presenting information effectively.",
    outcomes: [
      "Connect and clean data sources",
      "Build interactive dashboards",
      "Create professional reports",
      "Present data insights clearly",
    ],
  },
  {
    slug: "adobe",
    title: "Adobe",
    subtitle: "Graphic Design & Editing",
    icon: Layers,
    accent: "#EF4444",
    accentBg: "bg-red-50",
    accentText: "text-red-700",
    accentBorder: "border-red-200",
    description:
      "Practical Adobe tools for graphic design, visual content creation, photo editing, and creative digital production.",
    outcomes: [
      "Edit and enhance photos professionally",
      "Create graphics for print and digital",
      "Design marketing materials",
      "Build a design portfolio",
    ],
  },
  {
    slug: "canva",
    title: "Canva",
    subtitle: "Visual Content Creation",
    icon: PenTool,
    accent: "#06B6D4",
    accentBg: "bg-cyan-50",
    accentText: "text-cyan-700",
    accentBorder: "border-cyan-200",
    description:
      "Graphic design fundamentals, social media graphics, flyers, presentations, branding materials, and other visual content.",
    outcomes: [
      "Design social media graphics",
      "Create flyers and posters",
      "Build brand identity assets",
      "Produce presentation decks",
    ],
  },
  {
    slug: "powerpoint",
    title: "PowerPoint",
    subtitle: "Professional Presentations",
    icon: Presentation,
    accent: "#F97316",
    accentBg: "bg-orange-50",
    accentText: "text-orange-700",
    accentBorder: "border-orange-200",
    description:
      "Creating professional presentations, organising content effectively, using visual elements, and delivering engaging slide decks.",
    outcomes: [
      "Design professional slide decks",
      "Use animations and transitions",
      "Structure content for impact",
      "Deliver compelling presentations",
    ],
  },
  {
    slug: "cv-writing",
    title: "CV Writing",
    subtitle: "Employability Skills",
    icon: FileText,
    accent: "#10B981",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    description:
      "Create a clear, professional CV without AI assistance — covering structure, personal profile, skills, experience, and tailoring for opportunities.",
    outcomes: [
      "Write a standout personal profile",
      "Present skills and experience clearly",
      "Tailor your CV for each role",
      "Avoid common CV mistakes",
    ],
  },
];

const SUMMARY = [
  { label: "Duration",        value: "6 Weeks" },
  { label: "Start Date",      value: "Monday, 7 September 2026" },
  { label: "End Date",        value: "Saturday, 17 October 2026" },
  { label: "Training Days",   value: "Monday, Thursday & Saturday" },
  { label: "Time",            value: "4:00 PM – 6:00 PM" },
  { label: "Mode",            value: "Online (Live Sessions)" },
  { label: "Hours Per Week",  value: "6 Hours" },
  { label: "Cost",            value: "Free" },
];

export default function DigitalSkillsUpPage() {
  return (
    <>
      {/* Header */}
      <section className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-block text-xs font-bold bg-accent text-dark px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            Registrations Now Open
          </span>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">BUE Foundation Training</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Six-Week Digital Skills-Up Programme
          </h1>
          <p className="text-white/75 text-lg mb-8">
            Free online training to equip young people with practical digital skills for
            employability, entrepreneurship, and remote work.
          </p>
          <Link href="/programmes/training/digital-skills-up/register"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-dark font-bold rounded-md hover:opacity-90 transition-opacity text-base">
            Register Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Programme summary */}
      <section className="py-14 bg-white border-b border-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Calendar, label: "Start Date",  value: "7 Sep 2026"     },
              { icon: Clock,    label: "Time",        value: "4:00 – 6:00 PM" },
              { icon: Monitor,  label: "Mode",        value: "Online · Free"  },
              { icon: Users,    label: "Open To",     value: "All Ages"       },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-page rounded-xl p-4 border border-light">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-mid">{label}</p>
                  <p className="font-bold text-dark text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-light">
            <table className="w-full text-sm">
              <tbody>
                {SUMMARY.map(({ label, value }, i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-page" : "bg-white"}>
                    <td className="px-5 py-3 font-semibold text-dark w-48">{label}</td>
                    <td className="px-5 py-3 text-mid">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">What You Will Learn</p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Choose Your Module</h2>
            <p className="text-mid mt-5 max-w-2xl mx-auto">
              Each module has its own registration link — share it directly so participants know
              exactly which skill they are signing up for.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(mod => {
              const Icon = mod.icon;
              return (
                <div key={mod.slug}
                  className="bg-white rounded-2xl border border-light shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  {/* Coloured top bar */}
                  <div className="h-1.5 w-full" style={{ background: mod.accent }} />

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Icon + title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${mod.accentBg} ${mod.accentBorder} border flex items-center justify-center shrink-0`}>
                        <Icon size={22} style={{ color: mod.accent }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-dark text-xl leading-tight">{mod.title}</h3>
                        <p className={`text-xs font-semibold mt-0.5 ${mod.accentText}`}>{mod.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-mid text-sm leading-relaxed mb-5">{mod.description}</p>

                    {/* Outcomes */}
                    <div className="mb-6 flex-1">
                      <p className="text-xs font-bold text-dark uppercase tracking-wide mb-3">What you&apos;ll gain</p>
                      <ul className="space-y-2">
                        {mod.outcomes.map(o => (
                          <li key={o} className="flex items-start gap-2.5 text-sm text-mid">
                            <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: mod.accent }} />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="border-t border-light pt-5">
                      <Link href={`/programmes/training/digital-skills-up/register?module=${mod.slug}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                        Register for {mod.title} <ArrowRight size={14} />
                      </Link>
                      <p className="text-xs text-mid text-center mt-2.5 break-all leading-relaxed">
                        Share link: …/register?module={mod.slug}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Register for all */}
          <div className="mt-10 bg-primary rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Want to learn all four digital skills?</h3>
              <p className="text-white/75 text-sm max-w-lg">
                You can register for each module separately using the links above, or use the general
                registration and select your preferred skill areas in the form.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/programmes/training/digital-skills-up/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-dark font-bold rounded-md hover:opacity-90 transition-opacity text-sm whitespace-nowrap">
                General Registration <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-dark mb-3">How the Programme Works</h2>
            <p className="text-mid text-sm max-w-xl mx-auto">
              A practical, project-based approach so every participant leaves with real skills they can use.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Monitor,   title: "Live Online Sessions",   desc: "Two-hour live training sessions every Monday, Thursday, and Saturday throughout the programme." },
              { icon: FileText,  title: "Weekly Assignments",     desc: "Practical projects and exercises after each session to reinforce and apply your learning." },
              { icon: CheckCircle, title: "Final Assessment",     desc: "Demonstrate your skills through a final project and receive a certificate of completion." },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-page border border-light">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
