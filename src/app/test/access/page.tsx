"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define proper form shape
interface AccessForm {
  testType: string;
  name: string;
  phone: string;
  email: string;
  code: string;
}

// Define status type
interface Status {
  ok: boolean;
  message: string;
}

/**
 * IELS Access Page
 * Validates full registration info before allowing access.
 * Fully TypeScript-safe and UI/UX-consistent with IELS branding.
 */

export default function AccessPage() {
  const router = useRouter();

  const [form, setForm] = useState<AccessForm>({
    testType: "",
    name: "",
    phone: "",
    email: "",
    code: "",
  });

  const [status, setStatus] = useState<Status | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // handle input updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // main submit logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { testType, name, phone, email, code } = form;

    if (!testType || !name || !phone || !email || !code) {
      setStatus({ ok: false, message: "Please complete all fields before starting the test." });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!json.ok) {
        setStatus({ ok: false, message: json.message || "Invalid data or access code." });
        setIsSubmitting(false);
        return;
      }

      // success
      setShowConfirm(true);
      setStatus(null);
    } catch (err) {
      console.error(err);
      setStatus({ ok: false, message: "Network or server error." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ FIXED — only one handleStart
 // ✅ Redirect ke Google Form setelah validasi server sukses
const handleStart = () => {
  const formsMap: Record<string, string> = {
    IELTS: "https://forms.gle/9eFqiMqL1EvYBjE27",
    TOEFL: "https://forms.gle/YOUR_TOEFL_FORM",
    TOEIC: "https://forms.gle/YOUR_TOEIC_FORM",
  };

  const selectedForm = formsMap[form.testType];

  if (!selectedForm) {
    setStatus({
      ok: false,
      message: "Selected test type does not have an active form yet."
    });
    return;
  }

  // ✅ Embed code in localStorage if needed later
  localStorage.setItem("accessData", JSON.stringify(form));

  // ✅ Redirect ke GForm
  window.location.href = selectedForm;
};
  return (
    <div>
      <Header/>
    <main className="min-h-screen bg-gradient-to-b from-white to-[#f7f9f8] flex items-center justify-center text-[#294154] px-6 font-geologica relative">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-[#294154]/10 p-8">
        <h1 className="text-3xl font-bold text-center mb-3">Access Your Test</h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Please ensure all details match your registration.  
          Your access code, name, and email must be identical to what you submitted during registration.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TEST TYPE */}
          <div>
            <label className="block text-sm font-semibold mb-1">Select Test Type</label>
            <select
              name="testType"
              value={form.testType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-full p-3 text-sm focus:ring-2 focus:ring-[#E56668] outline-none"
            >
              <option value="">-- Choose your test --</option>
              <option value="IELTS">IELTS Mock Test</option>
              <option value="TOEFL">TOEFL Mock Test</option>
              <option value="TOEIC">TOEIC Mock Test</option>
            </select>
          </div>

          {/* NAME */}
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Aisyah Rahma"
              className="w-full border border-gray-300 rounded-full p-3 text-sm focus:ring-2 focus:ring-[#E56668] outline-none"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-semibold mb-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. +62 812 3456 7890"
              className="w-full border border-gray-300 rounded-full p-3 text-sm focus:ring-2 focus:ring-[#E56668] outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. youremail@gmail.com"
              className="w-full border border-gray-300 rounded-full p-3 text-sm focus:ring-2 focus:ring-[#E56668] outline-none"
            />
          </div>

          {/* ACCESS CODE */}
          <div>
            <label className="block text-sm font-semibold mb-1">Access Code</label>
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="e.g. IELS-****-****"
              className="w-full border border-gray-300 rounded-full p-3 text-sm focus:ring-2 focus:ring-[#E56668] outline-none uppercase tracking-wider"
            />
          </div>

          {status && (
            <p
              className={`text-center text-sm mt-2 ${
                status.ok ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E56668] text-white py-3 mt-6 rounded-full font-semibold hover:bg-[#C04C4E] transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Validating..." : "Validate & Start Test"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Once you start, your test timer will begin automatically.
          </p>
        </form>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm text-center">
            <h2 className="text-xl font-bold mb-3">Are You Ready?</h2>
            <p className="text-gray-600 mb-6">
              Once you start your test, the timer will begin immediately.  
              Take a deep breath — you’ve got this! 🌟
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2 rounded-full border border-gray-300 text-[#294154] font-semibold hover:bg-gray-100"
              >
                Not Yet
              </button>
              <button
                onClick={handleStart}
                className="flex-1 py-2 rounded-full bg-[#E56668] text-white font-semibold hover:bg-[#C04C4E]"
              >
                Start Test →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
    <Footer/>
    </div>
  );
}
