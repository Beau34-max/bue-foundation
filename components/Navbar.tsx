"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Meet Our Team", href: "/team" },
  { label: "Partnership", href: "/partnership" },
  {
    label: "Volunteer",
    href: "/volunteer",
    children: [
      { label: "Volunteering Opportunities", href: "/volunteer/opportunities" },
    ],
  },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center text-sm py-2 px-4">
        Support our mission –{" "}
        <Link href="/donate" className="text-accent font-bold underline hover:no-underline">
          Donate Today
        </Link>
      </div>

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                BUE
              </div>
              <div className="leading-tight">
                <div className="font-bold text-primary text-sm sm:text-base">
                  BUE Foundation
                </div>
                <div className="text-xs text-mid hidden sm:block">The Joybringers</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href} className="relative group">
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(link.href)
                          ? "text-primary bg-primary/10"
                          : "text-dark hover:text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white shadow-lg rounded-md py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-dark hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-dark hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/donate"
                className="ml-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-md hover:bg-primary-dark transition-colors"
              >
                Donate
              </Link>
            </nav>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-dark hover:text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-light px-4 py-3">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <button
                      onClick={() => setVolunteerOpen(!volunteerOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                        isActive(link.href) ? "text-primary bg-primary/10" : "text-dark"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${volunteerOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {volunteerOpen && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="px-3 py-2 text-sm text-mid hover:text-primary hover:bg-primary/5 rounded-md"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(link.href)
                        ? "text-primary bg-primary/10"
                        : "text-dark hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/donate"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-md text-center hover:bg-primary-dark transition-colors"
              >
                Donate Now
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
