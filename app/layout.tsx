import type { Metadata } from "next";
import { Bitter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bitter = Bitter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bitter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | BUE Foundation",
    default: "BUE Foundation – The Joybringers",
  },
  description:
    "The Beatrice Uchenna Egwu Foundation empowers lives through financial support, education, shelter, and skill acquisition across Nigeria. NGO Registration: 8420341.",
  keywords: [
    "BUE Foundation",
    "NGO Nigeria",
    "charity",
    "education",
    "empowerment",
    "Joybringers",
    "Ebonyi State",
  ],
  openGraph: {
    siteName: "BUE Foundation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bitter.variable}>
      <body className="min-h-screen flex flex-col bg-page text-dark">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
