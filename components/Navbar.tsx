"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Meet Our Team", href: "/team" },
  { label: "Partnership", href: "/partnership" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
              <Image
                src="/logo.png"
                alt="BUE Foundation logo"
                width={44}
                height={44}
                className="object-contain"
              />
              <div className="leading-tight hidden sm:block">
                <div className="font-bold text-primary text-sm">BUE Foundation</div>
                <div className="text-xs text-mid">The Joybringers</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
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
              ))}
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
              {navLinks.map((link) => (
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
              ))}
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
