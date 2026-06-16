import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description:
    "Meet the dedicated individuals driving the BUE Foundation's mission to empower communities across Nigeria.",
};

const team = [
  {
    name: "Beatrice Uchenna Egwu",
    role: "Founder & Chief Executive Officer",
    nickname: "Aunty Chy",
    bio: "The visionary behind the BUE Foundation, Aunty Chy founded the organisation out of a deep calling to serve the vulnerable. Her compassion and leadership continue to inspire everything we do.",
    initial: "B",
  },
  {
    name: "Team Member",
    role: "Director of Programmes",
    bio: "Oversees the design and delivery of all foundation programmes, ensuring maximum impact and alignment with our strategic goals.",
    initial: "T",
  },
  {
    name: "Team Member",
    role: "Head of Fundraising",
    bio: "Leads all fundraising initiatives, donor relations, and partnership development to sustain and grow the foundation's resources.",
    initial: "T",
  },
  {
    name: "Team Member",
    role: "Administrative Manager",
    bio: "Manages the day-to-day operations of the foundation, ensuring efficient coordination across all departments and programmes.",
    initial: "T",
  },
  {
    name: "Team Member",
    role: "Community Outreach Coordinator",
    bio: "Connects directly with communities and beneficiaries, identifying needs and ensuring our programmes reach those who need them most.",
    initial: "T",
  },
  {
    name: "Team Member",
    role: "Finance & Transparency Officer",
    bio: "Maintains rigorous financial oversight and reporting, upholding our commitment to full transparency with donors and partners.",
    initial: "T",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            The People Behind the Mission
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Meet Our Team</h1>
          <p className="text-white/75 text-lg">
            Driven by purpose and united by compassion — meet the dedicated individuals making our
            work possible every single day.
          </p>
        </div>
      </section>

      {/* Team grid */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm border border-light card-hover text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold"
                  style={{
                    background: i === 0
                      ? "linear-gradient(135deg, #4B1F6F, #6b3a8f)"
                      : "linear-gradient(135deg, #888, #aaa)",
                  }}
                >
                  {member.initial}
                </div>
                <h3 className="text-xl font-bold text-dark mb-1">{member.name}</h3>
                {member.nickname && (
                  <p className="text-primary text-sm font-medium mb-1">
                    &ldquo;{member.nickname}&rdquo;
                  </p>
                )}
                <p className="text-mid text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-mid text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

          {/* Join the team CTA */}
          <div className="mt-16 text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
            <h2 className="text-2xl font-bold text-dark mb-3">Join Our Team</h2>
            <p className="text-mid mb-6 max-w-xl mx-auto">
              We are currently recruiting for <strong>Admin Managers</strong> and{" "}
              <strong>Fundraisers</strong> who share our passion for community transformation. If
              you are ready to make a difference, we want to hear from you.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
            >
              View Open Roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
