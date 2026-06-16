import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <>
      <section
        className="py-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Terms of Use</h1>
          <p className="text-white/70 text-sm">Last updated: June 2025</p>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-light prose prose-sm max-w-none text-mid leading-relaxed">
            <h2 className="text-dark font-bold text-xl mb-3">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using the BUE Foundation website, you accept and agree to be bound
              by these Terms of Use. If you do not agree to these terms, please do not use this
              website.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">2. About BUE Foundation</h2>
            <p className="mb-6">
              The Beatrice Uchenna Egwu Foundation (NGO No. 8420341) is a registered non-profit
              organisation based in Nigeria. This website is operated to provide information about
              our work and to facilitate donations, volunteer registrations, and general
              communications.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">3. Use of Website</h2>
            <p className="mb-3">You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Submit false or misleading information in any form</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Use the website in any way that could damage, disable, or impair its operation</li>
              <li>Use the website to transmit spam, malware, or any harmful content</li>
              <li>Reproduce, distribute, or commercially exploit any content without our written permission</li>
            </ul>

            <h2 className="text-dark font-bold text-xl mb-3">4. Donations</h2>
            <p className="mb-6">
              Donations made through this website are processed securely via Paystack. All donations
              are final and non-refundable unless there is a documented error in processing. We are
              committed to using all donations for the charitable purposes of BUE Foundation. For
              donation receipts or queries, contact us at{" "}
              <a href="mailto:info@buef.onmicrosoft.com" className="text-primary hover:underline">
                info@buef.onmicrosoft.com
              </a>
              .
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">5. Intellectual Property</h2>
            <p className="mb-6">
              All content on this website — including text, images, graphics, logos, and design —
              is the property of BUE Foundation or its content suppliers and is protected by
              applicable copyright laws. You may not reproduce any content without prior written
              permission.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">6. External Links</h2>
            <p className="mb-6">
              Our website may contain links to third-party websites. BUE Foundation does not
              endorse, control, or take responsibility for the content of any external sites. We
              recommend reading the terms and privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">7. Disclaimer of Warranties</h2>
            <p className="mb-6">
              This website is provided &ldquo;as is&rdquo; without warranties of any kind, either express or
              implied. BUE Foundation does not warrant that the website will be uninterrupted,
              error-free, or free of viruses.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">8. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, BUE Foundation shall not be liable for any
              indirect, incidental, or consequential damages arising out of your use of this
              website.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">9. Governing Law</h2>
            <p className="mb-6">
              These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes
              arising from the use of this website shall be subject to the exclusive jurisdiction of
              Nigerian courts.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">10. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right to update these Terms of Use at any time. Continued use of the
              website following any changes constitutes your acceptance of the revised terms.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">11. Contact</h2>
            <p>
              For questions about these terms, contact:{" "}
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
