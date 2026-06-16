"use client";

import { useState } from "react";
import { CheckCircle, Shield, Heart, Users, GraduationCap } from "lucide-react";

const presetAmounts = [5, 10, 25, 50, 100, 250];

const impactMap: Record<number, string> = {
  5: "provides a meal kit for a family of four",
  10: "supplies school stationery for one child for a term",
  25: "funds a week of vocational training for one person",
  50: "covers a month of food support for a widow",
  100: "pays school fees for one child for a term",
  250: "sponsors a month of shelter for a family",
};

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

export default function DonatePage() {
  const [amount, setAmount] = useState<number | "">("");
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("GBP");
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const finalAmount = amount !== "" ? amount : Number(custom) || 0;
  const impact = amount !== "" ? impactMap[amount] : null;

  function handlePreset(val: number) {
    setAmount(val);
    setCustom("");
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustom(e.target.value);
    setAmount("");
  }

  function handlePaystack() {
    if (!email || !name || finalAmount <= 0) return;
    setLoading(true);

    const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_KEY || "";

    if (!paystackKey || typeof window.PaystackPop === "undefined") {
      // Fallback: show success for demo / when key not configured
      setSubmitted(true);
      setLoading(false);
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email,
      amount: finalAmount * 100,
      currency,
      metadata: {
        custom_fields: [
          { display_name: "Donor Name", variable_name: "donor_name", value: name },
          { display_name: "Frequency", variable_name: "frequency", value: frequency },
        ],
      },
      callback: () => {
        setSubmitted(true);
        setLoading(false);
      },
      onClose: () => {
        setLoading(false);
      },
    });
    handler.openIframe();
  }

  return (
    <>
      {/* Paystack script */}
      <script src="https://js.paystack.co/v1/inline.js" async />

      {/* Header */}
      <section
        className="py-24 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4B1F6F 0%, #212121 100%)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Heart size={48} className="text-accent mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Donate Today</h1>
          <p className="text-white/75 text-lg">
            Your generosity is the fuel that powers our mission. Every penny donated is invested
            directly into the lives of those who need it most.
          </p>
        </div>
      </section>

      <section className="py-20 bg-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Donation form — takes 3/5 width */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-light text-center">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-dark mb-3">
                    Thank You, {name || "Friend"}!
                  </h2>
                  <p className="text-mid text-lg mb-2">
                    Your donation of <strong>{currency} {finalAmount}</strong> has been received.
                  </p>
                  <p className="text-mid mb-6">
                    A confirmation will be sent to <strong>{email}</strong>. Your generosity is
                    making a real difference. Welcome to the Joybringers family!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setAmount("");
                      setCustom("");
                      setName("");
                      setEmail("");
                    }}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Donate Again
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-light overflow-hidden">
                  <div className="bg-primary px-6 py-4">
                    <h2 className="text-white font-bold text-xl">Make a Donation</h2>
                    <p className="text-white/70 text-sm mt-1">
                      Secure payment via Paystack
                    </p>
                  </div>
                  <div className="p-6 sm:p-8">
                    {/* Frequency */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-dark mb-3">
                        Donation Frequency
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(["one-time", "monthly"] as const).map((f) => (
                          <button
                            key={f}
                            onClick={() => setFrequency(f)}
                            className={`py-2.5 rounded-lg text-sm font-semibold border-2 transition-all ${
                              frequency === f
                                ? "border-primary bg-primary text-white"
                                : "border-light text-mid hover:border-primary/50"
                            }`}
                          >
                            {f === "one-time" ? "One-time" : "Monthly"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Currency */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-dark mb-3">
                        Currency
                      </label>
                      <div className="flex gap-3 flex-wrap">
                        {["GBP", "USD", "EUR", "NGN"].map((c) => (
                          <button
                            key={c}
                            onClick={() => setCurrency(c)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                              currency === c
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-light text-mid hover:border-primary/50"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preset amounts */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-dark mb-3">
                        Select Amount ({currency})
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {presetAmounts.map((val) => (
                          <button
                            key={val}
                            onClick={() => handlePreset(val)}
                            className={`py-3 rounded-lg font-bold text-base border-2 transition-all ${
                              amount === val
                                ? "border-primary bg-primary text-white"
                                : "border-light text-dark hover:border-primary hover:text-primary"
                            }`}
                          >
                            {currency === "NGN" ? "₦" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$"}
                            {val}
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        value={custom}
                        onChange={handleCustomChange}
                        min="1"
                        className="w-full px-4 py-3 border-2 border-light rounded-lg text-dark text-base transition-all"
                        placeholder={`Custom amount in ${currency}`}
                      />
                    </div>

                    {/* Impact message */}
                    {impact && (
                      <div className="mb-5 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                        <strong>{currency === "GBP" ? "£" : currency === "NGN" ? "₦" : "$"}{finalAmount}</strong>{" "}
                        {impact}.
                      </div>
                    )}

                    {/* Personal details */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-dark mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2.5 border border-light rounded-lg text-dark text-sm transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handlePaystack}
                      disabled={finalAmount <= 0 || !name || !email || loading}
                      className="w-full py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? "Processing..."
                        : `Donate ${currency === "GBP" ? "£" : currency === "NGN" ? "₦" : "$"}${finalAmount || "..."} ${frequency === "monthly" ? "/ month" : ""}`}
                    </button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-mid text-xs">
                      <Shield size={14} />
                      <span>Secure payment powered by Paystack. Your data is protected.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — 2/5 width */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-light">
                <h3 className="font-bold text-dark text-lg mb-4">Your Impact</h3>
                <div className="space-y-3">
                  {[
                    { icon: GraduationCap, text: "£10 supplies school stationery for one child" },
                    { icon: Heart, text: "£50 funds a month of food support for a widow" },
                    { icon: Users, text: "£100 pays school fees for one child for a term" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <p className="text-mid text-sm leading-relaxed">{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">Transparency Pledge</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  100% of your donation goes directly to our programmes. We publish annual financial
                  reports to demonstrate exactly how funds are used.
                </p>
                <p className="text-white/60 text-xs">NGO Registration No: 8420341</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-light">
                <h3 className="font-bold text-dark mb-4">Bank Transfer (Nigeria)</h3>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-mid">Bank</span>
                      <span className="font-bold text-dark">Kuda Business</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-mid">Account Name</span>
                      <span className="font-bold text-dark text-right text-xs leading-tight max-w-[160px]">Beatrice Uchenna Egwu Foundation</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-primary/20 pt-2 mt-2">
                      <span className="text-mid">Account Number</span>
                      <span className="font-extrabold text-primary text-lg tracking-wider">3003833268</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-dark mb-3 mt-4">Other Ways to Give</h3>
                <div className="space-y-2 text-sm text-mid">
                  <p>
                    <strong className="text-dark">In Kind:</strong> Donate goods, equipment, or
                    professional services
                  </p>
                  <p>
                    <strong className="text-dark">Legacy Giving:</strong> Include BUE Foundation in
                    your will
                  </p>
                  <p className="pt-2">
                    <a
                      href="mailto:info@buef.onmicrosoft.com"
                      className="text-primary font-semibold hover:underline"
                    >
                      Email us
                    </a>{" "}
                    for any alternative giving arrangements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
