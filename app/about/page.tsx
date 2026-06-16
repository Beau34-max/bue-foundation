import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Beatrice Uchenna Egwu Foundation — our story, mission, vision, and the values that drive our work in Nigeria.",
};

const objectives = [
  "Provide financial support to widows, orphans, and vulnerable individuals.",
  "Award scholarships and educational grants to children and youth in need.",
  "Offer shelter and housing assistance to the homeless and displaced.",
  "Deliver vocational training and skill acquisition programmes.",
  "Partner with government and international bodies to scale community impact.",
  "Promote transparency and accountability in the use of all donations and resources.",
];

const coreValues = [
  {
    value: "Compassion",
    description: "We approach every individual with empathy, dignity, and genuine care.",
  },
  {
    value: "Transparency",
    description: "We maintain open, honest accounting of all funds and activities.",
  },
  {
    value: "Community",
    description: "We believe change happens when communities are empowered to lead.",
  },
  {
    value: "Empowerment",
    description: "We give people the tools to build sustainable, independent lives.",
  },
  {
    value: "Service",
    description: "We are driven by a calling to serve those who need it most.",
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
            Non-Governmental Organisation (NGO No. 8420341) headquartered in Afikpo-North LGA,
            Ebonyi State, Nigeria.
          </p>
          <p className="text-mid leading-relaxed mb-4">
            We are a faith-inspired, community-driven organisation dedicated to addressing the
            critical social needs of the most vulnerable members of society — including widows,
            orphans, the homeless, and youth trapped in cycles of poverty.
          </p>
          <p className="text-mid leading-relaxed">
            Since our founding, we have touched hundreds of lives through targeted intervention
            programmes, distributing scholarships, providing shelter, delivering vocational training,
            and offering financial assistance where it is needed most.
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
                <strong className="text-dark">Beatrice Uchenna Egwu</strong> — lovingly called{" "}
                <em>Mama Beatrice</em> by those she serves — founded this organisation out of a
                deeply personal conviction: that no one should suffer alone when a community can
                stand together.
              </p>
              <p className="text-mid leading-relaxed mb-4">
                Having witnessed first-hand the devastating effects of poverty, educational
                exclusion, and homelessness in her community, Mama Beatrice resolved to be the
                change. She channelled her passion, resources, and network into creating an
                organisation that would bring real, lasting change to the most marginalised.
              </p>
              <p className="text-mid leading-relaxed italic text-lg border-l-4 border-primary pl-4 py-2 mb-6">
                &ldquo;When I see the smile on the face of a child who can now go to school, or a widow
                who no longer goes to bed hungry — that is what drives me. Every life has value, and
                our job is to help people discover theirs.&rdquo;
              </p>
              <p className="text-mid text-sm">
                — <strong>Beatrice Uchenna Egwu</strong>, Founder &amp; CEO
              </p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-10 border border-primary/20">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                  B
                </div>
                <h3 className="text-xl font-bold text-dark">Beatrice Uchenna Egwu</h3>
                <p className="text-primary font-medium">Founder &amp; Chief Executive Officer</p>
                <p className="text-mid text-sm mt-1">Mama Beatrice</p>
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
            Poverty is not just the absence of money — it is the absence of hope, opportunity, and
            dignity. Across Ebonyi State and beyond, thousands of children cannot attend school,
            families sleep without a roof, and skilled adults cannot find work simply because they
            lack resources and support.
          </p>
          <p className="text-mid text-lg leading-relaxed mb-10">
            We do what we do because we believe this should not — and does not have to — be the
            case. With generosity, community action, and structured support, every single life can
            be changed. That is not idealism; it is what we see happening every day in the
            communities we serve.
          </p>
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-primary-dark transition-colors shadow-md"
          >
            Support Our Work <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
