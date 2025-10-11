"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Timer from "@/components/Timer";

export default function WritingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const access = params.get("access") ?? "";

  // === FORM STATES ===
  const [task1, setTask1] = useState("");
  const [task2, setTask2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // === HANDLE SUBMIT ALL SECTIONS ===
  const submitAll = async () => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Ambil jawaban existing di localStorage
      const existingAnswers = JSON.parse(localStorage.getItem("ieltsAnswers") || "{}");

      // Gabungkan semua data
      const payload = {
        access,
        name,
        email,
        answers: {
          ...existingAnswers,
          writing: { task1, task2 },
        },
      };

      // Simpan ke localStorage juga (optional)
      localStorage.setItem("ieltsAnswers", JSON.stringify(payload.answers));

      // === SEND TO API ===
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // wajib pakai capital C
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Unknown error" }));
        setMessage(err.message || "Submission failed.");
        setIsSubmitting(false);
        return;
      }

      const json = await res.json();
      if (json.ok) {
        console.log("✅ Submission success:", json);
        router.push(`/test/ielts/result?access=${encodeURIComponent(access)}`);
      } else {
        setMessage(json.message || "Server error during submission.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("Network or server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // === UI ===
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#FFF8E5] text-[#173E8C] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Writing Section ✍️</h1>
          <Timer
            minutes={60}
            onFinish={() => {
              console.log("⏱️ Timer finished — auto submitting");
              submitAll();
            }}
          />
        </div>

        {/* Task 1 */}
        <div className="p-4 border border-gray-200 rounded-2xl mb-6 shadow-sm bg-white">
          <h3 className="font-semibold mb-2">Task 1</h3>
          <p className="text-sm text-gray-600 mb-3">
            Summarize the information in about <strong>150–200 words.</strong>
          </p>
          <textarea
            value={task1}
            onChange={(e) => setTask1(e.target.value)}
            placeholder="Write your summary here..."
            className="w-full border border-gray-300 rounded-xl p-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#FFD046]"
          />
        </div>

        {/* Task 2 */}
        <div className="p-4 border border-gray-200 rounded-2xl mb-6 shadow-sm bg-white">
          <h3 className="font-semibold mb-2">Task 2</h3>
          <p className="text-sm text-gray-600 mb-3">
            Write an essay of at least <strong>250 words</strong> in response to the topic below.
          </p>
          <textarea
            value={task2}
            onChange={(e) => setTask2(e.target.value)}
            placeholder="Write your essay here..."
            className="w-full border border-gray-300 rounded-xl p-3 min-h-[250px] focus:outline-none focus:ring-2 focus:ring-[#FFD046]"
          />
        </div>

        {/* User Info */}
        <div className="p-4 border border-gray-200 rounded-2xl mb-6 shadow-sm bg-white">
          <h4 className="font-semibold mb-3">Your Contact Information</h4>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full border border-gray-300 rounded-xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FFD046]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#FFD046]"
          />
        </div>

        {/* Error Message */}
        {message && (
          <p className="text-red-600 font-medium mb-4 text-center">{message}</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={submitAll}
            disabled={isSubmitting}
            className={`bg-[#173E8C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0f2d6b] transition-all ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </button>
        </div>
      </div>
    </main>
  );
}
