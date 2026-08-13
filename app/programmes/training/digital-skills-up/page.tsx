import Link from "next/link";
import { Calendar, Clock, Monitor, Users, ArrowRight, BookOpen } from "lucide-react";

const MODULES = [
  {
    slug: "power-bi",
    title: "Power BI",
    emoji: "📊",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
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
    emoji: "🎨",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
    description:
      "Practical Adobe tools for graphic design, visual content creation, photo editing, and creative digital production.",
    outcomes: [
      "Edit and enhance photos",
      "Create professional graphics",
      "Design marketing materials",
      "Build a digital portfolio",
    ],
  },
  {
    slug: "canva",
    title: "Canva",
    emoji: "✏️",
    color: "bg-cyan-50 border-cyan-200",
    badge: "bg-cyan-100 text-cyan-800",
    description:
      "Graphic design fundamentals, social media designs, flyers, presentations, branding materials, and other visual content.",
    outcomes: [
      "Design social media graphics",
      "Create flyers and posters",
      "Build brand identity assets",
      "Design presentations",
    ],
  },
  {
    slug: "powerpoint",
    title: "PowerPoint",
    emoji: "📽️",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    description:
      "Creating professional presentations, organising content effectively, using visual elements, and delivering engaging slide decks.",
    outcomes: [
      "Design professional slide decks",
      "Use animations and transitions",
      "Structure content clearly",
      "Deliver compelling presentations",
    ],
  },
  {
    slug: "cv-writing",
    title: "CV Writing",
    emoji: "📄",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
    description:
      "Employability session: create a clear, professional CV without relying on AI tools — covering structure, personal profile, skills, and tailoring.",
    outcomes: [
      "Write a standout personal profile",
      "Present skills and experience clearly",
      "Tailor your CV for opportunities",
      "Avoid common CV mistakes",
    ],
  },
];

const SUMMARY = [
  { label: "Duration", value: "6 Weeks" },
  { label: "Start Date", value: "Monday, 7 September 2026" },
  { label: "End Date", value: "Saturday, 17 October 2026" },
  { label: "Training Days", value: "Monday, Thursday & Saturday" },
  { label: "Time", value: "4:00 PM – 6:00 PM" },
  { label: "Mode", value: "Online (Live Sessions)" },
  { label: "Hours Per Week", value: "6 Hours" },
  { label: "Cost", value: "Free" },
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
              { icon: Calendar, label: "Start Date", value: "7 Sep 2026" },
              { icon: Clock,    label: "Time",       value: "4 – 6 PM Daily" },
              { icon: Monitor,  label: "Mode",       value: "Online (Free)" },
              { icon: Users,    label: "Open To",    value: "All Ages" },
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
              Each module has its own registration link. Register for the specific skill you want to learn,
              or sign up for multiple modules individually.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(mod => (
              <div key={mod.slug}
                className={`bg-white rounded-2xl border-2 ${mod.color} shadow-sm flex flex-col overflow-hidden`}>
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{mod.emoji}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${mod.badge}`}>
                      {mod.title}
                    </span>
                  </div>
                  <h3 className="font-bold text-dark text-xl mb-3">{mod.title}</h3>
                  <p className="text-mid text-sm leading-relaxed mb-4">{mod.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-dark mb-2">What you&apos;ll gain:</p>
                    <ul className="space-y-1.5">
                      {mod.outcomes.map(o => (
                        <li key={o} className="flex items-start gap-2 text-xs text-mid">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Link href={`/programmes/training/digital-skills-up/register?module=${mod.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white text-sm font-bold rounded-md hover:opacity-90 transition-opacity">
                    Register for {mod.title} <ArrowRight size={15} />
                  </Link>
                  <p className="text-xs text-mid text-center mt-2 break-all">
                    buef.joybringerscharity.org/programmes/training/digital-skills-up/register?module={mod.slug}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Register for all */}
          <div className="mt-10 bg-primary rounded-2xl p-8 text-center text-white">
            <BookOpen size={32} className="mx-auto mb-3 text-accent" />
            <h3 className="text-xl font-bold mb-2">Want to learn all four digital skills?</h3>
            <p className="text-white/75 text-sm mb-5 max-w-lg mx-auto">
              You can register for each module separately using the links above, or register for a general place
              and indicate your preferred skill areas in the form.
            </p>
            <Link href="/programmes/training/digital-skills-up/register"
              className="inline-flex items-center gap-2 px-7 py-3 bg-accent text-dark font-bold rounded-md hover:opacity-90 transition-opacity text-sm">
              General Registration <ArrowRight size={15} />
            </Link>
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
              { emoji: "🖥️", title: "Live Online Sessions", desc: "Two-hour live training sessions on Monday, Thursday, and Saturday each week." },
              { emoji: "📋", title: "Weekly Assignments", desc: "Practical projects and exercises after each session to reinforce your learning." },
              { emoji: "🏆", title: "Final Assessment", desc: "Demonstrate your skills through a final project and receive a certificate of completion." },
            ].map(item => (
              <div key={item.title} className="text-center p-6 rounded-2xl bg-page border border-light">
                <span className="text-3xl block mb-3">{item.emoji}</span>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-mid text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
