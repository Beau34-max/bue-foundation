import Link from "next/link";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/15t8GPXNGD/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/buefoundation1",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@buefoundation",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9a8.19 8.19 0 004.79 1.52V7.07a4.85 4.85 0 01-1.02-.38z" />
      </svg>
    ),
  },
];

const footerLinks = {
  Organisation: [
    { label: "About Us", href: "/about" },
    { label: "Meet Our Team", href: "/team" },
    { label: "Partnership", href: "/partnership" },
    { label: "Careers", href: "/careers" },
  ],
  "Get Involved": [
    { label: "Donate", href: "/donate" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookies Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                BUE
              </div>
              <div>
                <div className="font-bold text-lg">BUE Foundation</div>
                <div className="text-white/70 text-sm">The Joybringers</div>
              </div>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-4 max-w-xs">
              Empowering lives through financial support, education, shelter, and
              skill acquisition across Nigeria.
            </p>
            <div className="text-white/60 text-xs mb-6">
              NGO Registration No: <span className="text-white font-medium">8420341</span>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-white/90 mb-4">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-white/65 hover:text-white text-sm transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="border-t border-white/20 pt-6 mb-6">
          <div className="flex flex-wrap gap-6 text-sm text-white/65">
            <div>
              <span className="text-white/90 font-medium">Address: </span>
              No. 10 Post Office Road, Ezi Agha-Orie Ukpa, Afikpo-North, Ebonyi State, Nigeria
            </div>
            <div>
              <span className="text-white/90 font-medium">Email: </span>
              <a href="mailto:beatrice.ue@joybringerscharity.org" className="hover:text-white transition-colors">
                beatrice.ue@joybringerscharity.org
              </a>
            </div>
            <div>
              <span className="text-white/90 font-medium">Phone (UK): </span>
              <a href="tel:+447780105816" className="hover:text-white transition-colors">
                +44 7780 105816
              </a>
            </div>
            <div>
              <span className="text-white/90 font-medium">Phone (Nigeria): </span>
              <a href="tel:+2349031679658" className="hover:text-white transition-colors">
                +234 903 167 9658
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Beatrice Uchenna Egwu Foundation. All rights reserved.</p>
          <p>Registered NGO · Nigeria · No. 8420341</p>
        </div>
      </div>
    </footer>
  );
}
