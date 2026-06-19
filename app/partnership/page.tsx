import Link from "next/link";
import Image from "next/image";
import { Building2, Globe, Handshake, TrendingUp, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Partner with the BUE Foundation to amplify impact. We welcome corporate, government, and NGO partnerships to serve communities across Nigeria.",
};

const partnershipTypes = [
  {
    icon: Building2,
    title: "Corporate Partners",
    description:
      "Align your company's CSR goals with our verified community programmes. We offer co-branding opportunities, employee volunteer days, and measurable social impact reporting.",
  },
  {
    icon: Globe,
    title: "International NGOs",
    description:
      "We welcome collaboration with international development organisations seeking on-the-ground partners in Southeast Nigeria. We bring local knowledge, established relationships, and proven delivery.",
  },
  {
    icon: Handshake,
    title: "Government Bodies",
    description:
      "We work alongside local and state government agencies to complement public programmes with targeted community intervention. Our NGO registration ensures full compliance and transparency.",
  },
  {
    icon: TrendingUp,
    title: "Faith & Community Groups",
    description:
      "Churches, mosques, community associations, and civic organisations are welcome to partner with us on specific programmes — from shelter drives to scholarship campaigns.",
  },
];

const benefits = [
  "Access to verified impact data and transparent financial reporting",
  "Co-branding and visibility on all partnered programmes",
  "Regular updates through dedicated partnership reports",
  "Direct access to communities and beneficiary testimonies",
  "Recognition at foundation events and annual report",
  "Opportunity to shape specific programmes aligned to your mission",
];

export default function PartnershipPage() {
  return (
    <>
      {/* Header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Collaborate with Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Partnership</h1>
          <p className="text-white/75 text-lg">
            Together we can do more. Join our network of partners committed to transforming lives
            across Nigeria.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 bg-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Why Partner with Us
          </p>
          <h2 className="text-3xl font-bold text-dark mb-6 section-heading">
            Amplify Your Impact
          </h2>
          <p className="text-mid leading-relaxed mb-4 text-lg">
            The BUE Foundation offers a trusted, transparent, and community-rooted platform for
            organisations who want their resources to create real, measurable change. Our NGO
            registration, established community relationships, and passionate team ensure that every
            partnership delivers genuine value.
          </p>
          <p className="text-mid leading-relaxed">
            Whether you are a corporation looking to fulfil your CSR mandate, an international NGO
            seeking local delivery partners, or a faith community wanting to extend your outreach —
            we have a partnership model that works for you.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Partnership Models
            </p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">
              Who We Partner With
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {partnershipTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-page rounded-2xl p-8 border border-light card-hover flex gap-5"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-lg mb-2">{type.title}</h3>
                    <p className="text-mid text-sm leading-relaxed">{type.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #3a1757 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
              What You Gain
            </p>
            <h2 className="text-3xl font-bold text-white">Partner Benefits</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/85 text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Who We Work With
            </p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">Our Current Partners</h2>
            <p className="text-mid mt-5 max-w-2xl mx-auto">
              We are proud to work alongside these organisations who share our vision and help
              amplify our impact across communities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-light flex flex-col items-center text-center">
              <div className="h-16 flex items-center justify-center mb-5">
                <Image src="/coseng-logo.png" alt="Coseng Limited UK" width={180} height={64} className="object-contain" />
              </div>
              <h3 className="font-bold text-dark text-lg mb-2">Coseng Limited UK</h3>
              <p className="text-mid text-sm leading-relaxed">
                Founded in 2020, Coseng Limited UK is a valued partner committed to sustainable
                development and social impact. Their support has been instrumental in enhancing our
                outreach and sustaining our community programmes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-light flex flex-col items-center text-center">
              <div className="h-16 flex items-center justify-center mb-5">
                <Image src="/joybringers-logo.png" alt="Joybringers Ltd" width={180} height={64} className="object-contain" />
              </div>
              <h3 className="font-bold text-dark text-lg mb-2">Joybringers Ltd</h3>
              <p className="text-mid text-sm leading-relaxed">
                Joybringers Ltd is a UK-based charity partner whose mission aligns closely with
                ours. Together we channel resources and expertise to maximise our reach across
                Nigeria and the diaspora community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="py-20 bg-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">Ready to Partner with Us?</h2>
          <p className="text-mid text-lg mb-8">
            Reach out to begin a conversation about how we can collaborate to create lasting change
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
            <a
              href="mailto:beatrice.ue@joybringerscharity.org"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary/5 transition-colors"
            >
              Email Directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
