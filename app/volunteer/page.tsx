import Link from "next/link";
import { Clock, Users, Star, Heart, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer with the BUE Foundation and help transform lives in Nigeria. Give your time, skills, and passion to serve those in need.",
};

const benefits = [
  {
    icon: Heart,
    title: "Make Real Impact",
    description: "See the direct difference your time and skills make in people's lives.",
  },
  {
    icon: Users,
    title: "Join a Community",
    description: "Become part of a warm, purpose-driven family of Joybringers.",
  },
  {
    icon: Star,
    title: "Grow Your Skills",
    description: "Gain experience in NGO work, community development, and social impact.",
  },
  {
    icon: Clock,
    title: "Flexible Commitment",
    description: "Choose a volunteering schedule that fits your lifestyle — from one day to long-term.",
  },
];

export default function VolunteerPage() {
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
            Your time and skills are among the most valuable gifts you can give. Join the
            Joybringers and help us transform lives one act of service at a time.
          </p>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Why Volunteer
            </p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">
              The Rewards of Service
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-white rounded-xl p-6 border border-light card-hover text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={26} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-dark mb-2">{b.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Volunteers Do */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            How You Help
          </p>
          <h2 className="text-3xl font-bold text-dark mb-8 section-heading">
            What Our Volunteers Do
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Assist in distributing food, clothing, and essentials at community outreach events",
              "Support scholarship applicants and educational programme delivery",
              "Help with office administration, documentation, and data management",
              "Coordinate skills training sessions and vocational workshops",
              "Provide mentoring, counselling, and emotional support to beneficiaries",
              "Assist with social media, content creation, and digital communications",
              "Support fundraising events, campaigns, and donor engagement",
              "Help with shelter maintenance and housing support activities",
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-page rounded-xl border border-light">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-mid text-sm leading-relaxed">{task}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Volunteer */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #3a1757 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Who Can Volunteer?</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            We welcome volunteers of all ages, backgrounds, and skill sets. Whether you are a
            student, professional, retiree, or simply someone with a heart to serve — there is a
            place for you at BUE Foundation. The only requirement is a genuine desire to make a
            difference.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {["Students & Youth", "Professionals", "Retirees & Elders", "Diaspora Volunteers", "Skilled Tradespeople", "Digital Experts"].map(
              (group) => (
                <div
                  key={group}
                  className="bg-white/10 border border-white/20 rounded-xl p-4 text-white font-medium"
                >
                  {group}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">Ready to Make a Difference?</h2>
          <p className="text-mid text-lg mb-8">
            Browse our volunteering opportunities and find the role that fits your availability and
            passions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/volunteer/opportunities"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors"
            >
              View Opportunities <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
