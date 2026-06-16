import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookies Policy" };

export default function CookiesPage() {
  return (
    <>
      <section
        className="py-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-3">Cookies Policy</h1>
          <p className="text-white/70 text-sm">Last updated: June 2025</p>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-light prose prose-sm max-w-none text-mid leading-relaxed">
            <h2 className="text-dark font-bold text-xl mb-3">What Are Cookies?</h2>
            <p className="mb-6">
              Cookies are small text files placed on your device when you visit a website. They help
              the website function properly, remember your preferences, and provide us with
              information about how the site is used.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">How We Use Cookies</h2>
            <p className="mb-3">The BUE Foundation website uses the following types of cookies:</p>

            <h3 className="text-dark font-semibold mb-2">Essential Cookies</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function. They enable basic features
              like page navigation and access to secure areas. The website cannot function properly
              without these cookies.
            </p>

            <h3 className="text-dark font-semibold mb-2">Analytics Cookies</h3>
            <p className="mb-4">
              We may use analytics cookies (such as those from Google Analytics) to understand how
              visitors interact with our website — which pages are most visited, how long users
              stay, and where they come from. This helps us improve the website. All data is
              anonymised.
            </p>

            <h3 className="text-dark font-semibold mb-2">Functional Cookies</h3>
            <p className="mb-4">
              These cookies remember your preferences (such as language settings) to provide a more
              personalised experience.
            </p>

            <h3 className="text-dark font-semibold mb-2">Third-party Cookies</h3>
            <p className="mb-6">
              When you make a donation via Paystack, Paystack may set cookies on your device as
              part of their payment processing service. These are governed by{" "}
              <a
                href="https://paystack.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Paystack&apos;s Privacy Policy
              </a>
              .
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">Managing Cookies</h2>
            <p className="mb-6">
              You can control and/or delete cookies through your browser settings. Most browsers
              allow you to refuse cookies or delete existing ones. Please note that disabling
              cookies may affect the functionality of our website. For guidance on managing cookies,
              visit{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                www.allaboutcookies.org
              </a>
              .
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">Your Consent</h2>
            <p className="mb-6">
              By continuing to use our website, you consent to our use of cookies as described in
              this policy. If you do not consent, you can disable cookies in your browser settings.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">Updates to This Policy</h2>
            <p className="mb-6">
              We may update this Cookies Policy periodically. Any changes will be posted on this
              page with a revised date.
            </p>

            <h2 className="text-dark font-bold text-xl mb-3">Contact</h2>
            <p>
              For any questions about our use of cookies, please contact:{" "}
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
