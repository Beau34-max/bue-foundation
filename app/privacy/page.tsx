import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <section
        className="py-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Privacy Policy</h1>
          <p className="text-white/70 text-sm">Last updated: June 2025</p>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-light prose prose-sm max-w-none text-mid leading-relaxed">
            <h2 className="text-dark font-bold text-xl mb-3">1. Who We Are</h2>
            <p className="mb-6">
              The Beatrice Uchenna Egwu Foundation (&ldquo;BUE Foundation&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is a registered
              Non-Governmental Organisation (NGO No. 8420341) based at No. 10 Post Office Road,
              Ezi Agha-Orie Ukpa, Afikpo-North, Ebonyi State, Nigeria. We are committed to
              protecting your privacy and handling your personal data responsibly.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Name, email address, phone number when you contact or register with us</li>
              <li>Donation details (amount, frequency, payment reference) via Paystack</li>
              <li>Volunteer or job application data submitted through our website</li>
              <li>Technical data such as IP address, browser type, and site usage via cookies</li>
            </ul>

            <h2 className="text-dark font-bold text-xl mb-3">3. How We Use Your Data</h2>
            <p className="mb-3">We use your personal data to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Process and acknowledge donations</li>
              <li>Respond to enquiries and communications</li>
              <li>Process volunteer and employment applications</li>
              <li>Send updates about our work (only with your consent)</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>

            <h2 className="text-dark font-bold text-xl mb-3">4. Data Sharing</h2>
            <p className="mb-6">
              We do not sell, trade, or rent your personal data to third parties. We may share data
              with trusted service providers (such as Paystack for payment processing) who act on
              our behalf and are bound by confidentiality agreements. We may disclose data if
              required by law.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">5. Data Retention</h2>
            <p className="mb-6">
              We retain your personal data for as long as necessary to fulfil the purposes described
              in this policy, or as required by law. Donation records are retained for 7 years for
              accounting purposes.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent for marketing communications at any time</li>
            </ul>
            <p className="mb-6">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:info@buef.onmicrosoft.com" className="text-primary hover:underline">
                info@buef.onmicrosoft.com
              </a>
              .
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">7. Security</h2>
            <p className="mb-6">
              We implement appropriate technical and organisational measures to protect your
              personal data against unauthorised access, alteration, disclosure, or destruction. All
              payment transactions are processed securely through Paystack.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">8. Changes to This Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. The updated version will be
              posted on this page with a revised &ldquo;last updated&rdquo; date.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">9. Contact</h2>
            <p>
              For privacy-related enquiries, contact us at:{" "}
              <a href="mailto:info@buef.onmicrosoft.com" className="text-primary hover:underline">
                info@buef.onmicrosoft.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
