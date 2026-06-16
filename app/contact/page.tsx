"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-white/75 text-lg">
            We would love to hear from you. Whether you have a question, a partnership idea, or
            just want to say hello — reach out!
          </p>
        </div>
      </section>

      <section className="py-20 bg-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6 section-heading">
                  Our Contact Details
                </h2>
              </div>

              {[
                {
                  icon: MapPin,
                  label: "Address",
                  content: (
                    <span>
                      No. 10 Post Office Road,<br />
                      Ezi Agha-Orie Ukpa,<br />
                      Afikpo-North LGA,<br />
                      Ebonyi State, Nigeria
                    </span>
                  ),
                },
                {
                  icon: Mail,
                  label: "Email",
                  content: (
                    <a href="mailto:info@buef.onmicrosoft.com" className="text-primary hover:underline">
                      info@buef.onmicrosoft.com
                    </a>
                  ),
                },
                {
                  icon: Phone,
                  label: "Phone",
                  content: (
                    <a href="tel:+447780105816" className="text-primary hover:underline">
                      +44 7780 105816
                    </a>
                  ),
                },
              ].map(({ icon: Icon, label, content }) => (
                <div key={label} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-light shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-mid uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <div className="text-dark text-sm leading-relaxed">{content}</div>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="bg-primary rounded-xl p-5 text-white">
                <h3 className="font-semibold mb-3">Follow Us</h3>
                <div className="flex flex-col gap-2 text-sm text-white/80">
                  <a href="https://www.facebook.com/share/15t8GPXNGD/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Facebook: BUE Foundation
                  </a>
                  <a href="https://www.instagram.com/buefoundation1" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    Instagram: @buefoundation1
                  </a>
                  <a href="https://www.tiktok.com/@buefoundation" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    TikTok: @buefoundation
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-light text-center h-full flex flex-col items-center justify-center">
                  <CheckCircle size={56} className="text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-dark mb-3">Message Sent!</h2>
                  <p className="text-mid text-lg mb-6">
                    Thank you for reaching out. A member of our team will respond to you within 3
                    business days.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-light"
                >
                  <h2 className="text-2xl font-bold text-dark mb-6">Send Us a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                        placeholder="+234 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-dark mb-1.5">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm bg-white transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Donation">Donation</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Volunteering">Volunteering</option>
                        <option value="Careers">Careers</option>
                        <option value="Media & Press">Media &amp; Press</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary-dark transition-colors text-base"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
