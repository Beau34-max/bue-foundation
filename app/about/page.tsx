import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Beatrice Uchenna Egwu Foundation — our story, mission, vision, and the values that drive our work in Nigeria.",
};

const objectives = [
  "Provide financial aid to struggling families, widows, and orphans.",
  "Offer scholarships and educational sponsorships to brilliant but disadvantaged children and youth.",
  "Support the homeless and displaced with shelter and basic survival needs.",
  "Organise free skills acquisition programmes — tailoring, catering, ICT, agriculture, and more — for unemployed youth and women.",
  "Create community outreach initiatives focused on health, education, and economic empowerment.",
  "Partner with other NGOs, government bodies, and individuals for sustainable social impact.",
];

const coreValues = [
  {
    value: "Compassion",
    description: "We serve with love — approaching every person with empathy, dignity, and genuine care.",
  },
  {
    value: "Transparency",
    description: "We handle all resources with integrity and accountability. Our donors deserve full honesty.",
  },
  {
    value: "Community",
    description: "We are committed to grassroots development — change that starts within the community itself.",
  },
  {
    value: "Empowerment",
    description: "We don't just give handouts. We equip people with skills and tools for long-term success.",
  },
  {
    value: "Service",
    description: "We serve first, with no expectation of reward. Giving is our calling, not our transaction.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Our Foundation
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-white/75 text-lg">
            Discover the story behind BUE Foundation — who we are, what drives us, and the lives
            we are committed to transforming.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-dark mb-6 section-heading">Who We Are</h2>
          <p className="text-mid leading-relaxed mb-4 text-lg">
            The <strong className="text-dark">Beatrice Uchenna Egwu Foundation</strong> — popularly
            known as <strong className="text-primary">The Joybringers</strong> — is a registered
            Non-Governmental Organisation (NGO No. 8420341) founded with one sincere goal: to uplift
            the lives of the less privileged through practical support, education, shelter, and
            empowerment.
          </p>
          <p className="text-mid leading-relaxed mb-4">
            We are based in Afikpo-North LGA, Ebonyi State, Nigeria, and we serve communities
            across the region with honesty, dedication, and a genuine desire to see people thrive.
            We understand the difficulties many Nigerian families face every day, and we are here
            to stand in the gap.
          </p>
          <p className="text-mid leading-relaxed mb-4">
            Led by our CEO, our team works tirelessly to reach marginalised individuals and
            families — providing the support they need to rebuild their lives and discover their
            God-given potential.
          </p>
          <p className="text-mid leading-relaxed">
            Since our founding, we have touched hundreds of lives through scholarships, shelter
            support, vocational training, and financial assistance — delivered directly to those
            who need it most.
          </p>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
                Founder's Story
              </p>
              <h2 className="text-3xl font-bold text-dark mb-6 section-heading">
                The Heart Behind the Foundation
              </h2>
              <p className="text-mid leading-relaxed mb-4">
                Aunty Chy, as she is affectionately known, did not start with a plan or a
                building. She started with a heart. Long before the BUE Foundation had a name,
                she was already paying school fees for children who could not afford them, looking
                after widows in her community, and opening her home to people who had nowhere else
                to go — all from her own pocket.
              </p>
              <p className="text-mid leading-relaxed mb-4">
                As the need grew, it became clear that this work deserved a proper structure so it
                could reach even more people. That is how the foundation was born — not from a
                boardroom, but from a genuine desire to help.
              </p>
              <p className="text-mid leading-relaxed italic text-lg border-l-4 border-primary pl-4 py-2 mb-6">
                &ldquo;This foundation was born from my heart. Long before we had a name or structure,
                we were helping people from our little resources. I believe that giving is not about
                how much you have, but how much you care. Through this foundation, we will continue
                to touch lives and give the forgotten ones a reason to smile again.&rdquo;
              </p>
              <p className="text-mid text-sm">
                — <strong>Beatrice Uchenna Egwu (Aunty Chy)</strong>, Founder &amp; CEO
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-10 border border-primary/20">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                  B
                </div>
                <h3 className="text-xl font-bold text-dark">Beatrice Uchenna Egwu</h3>
                <p className="text-primary font-medium">Founder &amp; Chief Executive Officer</p>
                <p className="text-mid text-sm mt-1">Aunty Chy</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-mid text-sm">Registered NGO Leader, Nigeria</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-mid text-sm">Community Champion, Ebonyi State</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-mid text-sm">Passionate Advocate for the Vulnerable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-20 bg-page">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-light">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Target size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-dark mb-4">Our Mission</h2>
              <p className="text-mid leading-relaxed">
                To provide financial assistance, access to education, housing support, and skill
                empowerment to vulnerable individuals and communities — enabling them to lead
                dignified, self-sustaining lives.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-light">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Eye size={24} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-dark mb-4">Our Vision</h2>
              <p className="text-mid leading-relaxed">
                A Nigeria — and a world — where every person, regardless of background or
                circumstance, has a fair and equal chance to flourish, contribute, and live with
                dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              Our Goals
            </p>
            <h2 className="text-3xl font-bold text-dark section-heading-center">
              Our Objectives
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-4 bg-page rounded-xl p-5 border border-light">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-mid text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #3a1757 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
              What Guides Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreValues.map((v) => (
              <div
                key={v.value}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 text-center"
              >
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart size={20} className="text-dark" />
                </div>
                <h3 className="font-bold text-white mb-2">{v.value}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Do What We Do */}
      <section className="py-20 bg-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Motivation
          </p>
          <h2 className="text-3xl font-bold text-dark mb-6 section-heading-center">
            Why We Do What We Do
          </h2>
          <p className="text-mid text-lg leading-relaxed mb-6">
            In Nigeria today, many children drop out of school due to lack of funds. Many families
            go to bed hungry. Young people roam the streets with untapped potential. This is not
            the Nigeria we dream of.
          </p>
          <p className="text-mid text-lg leading-relaxed mb-6">
            At the BUE Foundation, we believe that every life matters — and that a little support
            at the right time can change a person&apos;s entire story. In many communities, people
            suffer not because they are lazy, but because they lack opportunity.
          </p>
          <p className="text-mid text-lg leading-relaxed mb-10">
            We are here to bridge the gap. With the help of kind-hearted partners and donors, we
            are working to break cycles of poverty and bring hope to families who have lost it.
            Together, we can light up many dark corners of our communities.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-primary-dark transition-colors shadow-md"
          >
            Support Our Work <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Get Involved
          </p>
          <h2 className="text-3xl font-bold text-dark mb-4 section-heading-center">Join Us</h2>
          <p className="text-mid text-lg leading-relaxed mb-8">
            Want to support our work? Volunteer with us, make a donation, or collaborate on a
            project. Every contribution — big or small — makes a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/volunteer"
              className="px-8 py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-primary-dark transition-colors">
              Volunteer with Us
            </Link>
            <Link href="/donate"
              className="px-8 py-4 border-2 border-primary text-primary font-bold text-lg rounded-md hover:bg-primary hover:text-white transition-colors">
              Make a Donation
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-dark font-semibold text-lg rounded-md underline hover:text-primary transition-colors">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
