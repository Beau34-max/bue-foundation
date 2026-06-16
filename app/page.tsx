import Link from "next/link";
import { Heart, GraduationCap, Home, Briefcase, ArrowRight, Quote } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUE Foundation – The Joybringers",
};

const focusAreas = [
  {
    icon: Heart,
    title: "Financial Support",
    description:
      "Providing emergency and sustained financial assistance to individuals and families in critical need across our communities.",
  },
  {
    icon: GraduationCap,
    title: "Scholarships for Children & Youth",
    description:
      "Funding education from primary school through university so no child's potential is limited by their economic background.",
  },
  {
    icon: Home,
    title: "Shelter for the Homeless",
    description:
      "Offering temporary shelter, transitional housing support, and long-term solutions for those without a safe home.",
  },
  {
    icon: Briefcase,
    title: "Skill Acquisition & Training",
    description:
      "Running vocational and entrepreneurship programmes that equip young people and adults with sustainable livelihoods.",
  },
];

const testimonials = [
  {
    quote:
      "The BUE Foundation has been a beacon of hope in our community. Their dedication to serving the vulnerable is truly commendable and has changed lives.",
    name: "Rev. Iheanacho",
    title: "Community Leader",
  },
  {
    quote:
      "Through the scholarship programme, my daughter is now in university. I could never have afforded it without BUE Foundation's support. God bless Mama Beatrice.",
    name: "Mama Ifeanyi",
    title: "Beneficiary, Afikpo-North",
  },
];

const howToHelp = [
  {
    label: "Donate Now",
    href: "/donate",
    description: "Every contribution—large or small—makes a real difference.",
  },
  {
    label: "Join as Volunteer",
    href: "/volunteer",
    description: "Give your time and skills to serve alongside us in the community.",
  },
  {
    label: "Partner with Us",
    href: "/partnership",
    description: "Organisations and businesses — explore strategic partnership opportunities.",
  },
  {
    label: "Explore Careers",
    href: "/careers",
    description: "We're hiring Admin Managers and Fundraisers to grow our impact.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center text-white"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #FFFF00, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #6b3a8f, transparent)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">
            The Joybringers
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Bringing Hope &amp; Joy
            <br />
            to Communities in Need
          </h1>
          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The Beatrice Uchenna Egwu Foundation is a registered Nigerian NGO dedicated to
            empowering the vulnerable through education, financial aid, shelter, and skill
            development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-accent text-dark font-bold text-lg rounded-md hover:opacity-90 transition-opacity shadow-lg"
            >
              Donate Today
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-md hover:bg-white/10 transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 60V30C240 0 480 60 720 30C960 0 1200 60 1440 30V60H0Z"
              fill="#F7F7F7"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "500+", label: "Lives Touched" },
              { number: "120+", label: "Scholarships Awarded" },
              { number: "80+", label: "Families Housed" },
              { number: "200+", label: "Skills Trained" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-primary">{stat.number}</div>
                <div className="text-mid text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6 section-heading">
                Who We Are
              </h2>
              <p className="text-mid leading-relaxed mb-4">
                The Beatrice Uchenna Egwu Foundation — known as{" "}
                <strong className="text-dark">The Joybringers</strong> — is a registered NGO
                (No. 8420341) based in Afikpo-North LGA, Ebonyi State, Nigeria. We were founded on
                the belief that every human life has inherent worth and dignity.
              </p>
              <p className="text-mid leading-relaxed mb-4">
                Led by <strong className="text-dark">Mama Beatrice</strong>, our team works
                tirelessly to reach marginalised individuals and families — providing the support
                they need to rebuild their lives and discover their God-given potential.
              </p>
              <p className="text-mid leading-relaxed mb-8">
                We believe that with the right help at the right time, every person can flourish.
                That conviction drives everything we do.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
              >
                Read Our Story <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  heading: "Our Mission",
                  text: "Financial assistance, education, housing, and skill empowerment for all.",
                },
                {
                  heading: "Our Vision",
                  text: "A world where every person has a fair chance to live with dignity.",
                },
                {
                  heading: "Our Values",
                  text: "Compassion · Transparency · Community · Empowerment · Service",
                },
                {
                  heading: "Our Reach",
                  text: "Working across Ebonyi State and beyond, reaching the most vulnerable.",
                },
              ].map((card) => (
                <div
                  key={card.heading}
                  className="bg-white rounded-xl p-5 shadow-sm border border-light card-hover"
                >
                  <h3 className="font-bold text-primary mb-2">{card.heading}</h3>
                  <p className="text-mid text-sm leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark section-heading-center">
              Our Focus Areas
            </h2>
            <p className="text-mid mt-6 max-w-2xl mx-auto">
              Our work is centred on four pillars addressing the most critical needs in underserved
              communities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="bg-page rounded-xl p-6 border border-light card-hover text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-dark mb-3">{area.title}</h3>
                  <p className="text-mid text-sm leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #3a1757 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Our Impact in Their Words
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/10 backdrop-blur rounded-xl p-8 border border-white/20"
              >
                <Quote size={32} className="text-accent mb-4" />
                <p className="text-white/90 leading-relaxed italic text-lg mb-6">{t.quote}</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-white/60 text-sm">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Take Action
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark section-heading-center">
              How You Can Help
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToHelp.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="bg-white rounded-xl p-6 border border-light card-hover group flex flex-col"
              >
                <h3 className="font-bold text-dark group-hover:text-primary transition-colors mb-2">
                  {item.label}
                </h3>
                <p className="text-mid text-sm leading-relaxed flex-1">{item.description}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Every Contribution Changes a Life
          </h2>
          <p className="text-mid text-lg mb-8 max-w-2xl mx-auto">
            Your generosity funds scholarships, builds shelter, trains skills, and provides hope to
            families who have lost everything. Join the Joybringers movement today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-primary-dark transition-colors shadow-md"
            >
              Donate Now
            </Link>
            <Link
              href="/volunteer"
              className="px-8 py-4 border-2 border-primary text-primary font-bold text-lg rounded-md hover:bg-primary/5 transition-colors"
            >
              Volunteer with Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
