import Link from "next/link";
import { GraduationCap, Rocket, CalendarDays, BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Explore BUE Foundation's four impact programmes: scholarships, enterprise startup fund, community events, and skills training.",
};

const programmes = [
  {
    icon: GraduationCap,
    title: "Scholarships",
    href: "/programmes/scholarships",
    badge: "Education",
    description:
      "We fund primary, secondary, and university education for children and youth from disadvantaged backgrounds. No young person should be denied an education because of poverty.",
    cta: "View & Apply",
  },
  {
    icon: Rocket,
    title: "Enterprise Fund",
    href: "/programmes/enterprise-fund",
    badge: "Start-Up Capital",
    description:
      "The BUE Enterprise Fund provides startup capital to vetted entrepreneurs. Recipients share a small percentage of their profits with the foundation — creating a self-sustaining cycle of empowerment.",
    cta: "Apply for Funding",
  },
  {
    icon: CalendarDays,
    title: "Events",
    href: "/programmes/events",
    badge: "Community",
    description:
      "From business seminars and networking nights to community outreach days and fundraising galas — our events connect, inspire, and create opportunities for everyone.",
    cta: "See Upcoming Events",
  },
  {
    icon: BookOpen,
    title: "Training",
    href: "/programmes/training",
    badge: "Skills",
    description:
      "Our hands-on training programmes build real vocational and entrepreneurship skills — from fashion and catering to digital skills, financial literacy, and business management.",
    cta: "Register for Training",
  },
];

export default function ProgrammesPage() {
  return (
    <>
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Programmes</h1>
          <p className="text-white/75 text-lg">
            Four targeted programmes designed to break cycles of poverty and create lasting
            opportunity — in education, enterprise, skills, and community.
          </p>
        </div>
      </section>

      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8">
            {programmes.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.href}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-light card-hover flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={28} className="text-primary" />
                    </div>
                    <div>
                      <span className="inline-block text-xs font-semibold bg-accent text-dark px-2.5 py-0.5 rounded-full mb-1">
                        {p.badge}
                      </span>
                      <h2 className="text-xl font-bold text-dark">{p.title}</h2>
                    </div>
                  </div>
                  <p className="text-mid leading-relaxed flex-1 mb-6">{p.description}</p>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-colors w-fit"
                  >
                    {p.cta} <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
