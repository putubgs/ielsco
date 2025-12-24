"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Role } from "@/data/careers/divisions";

type Props = {
  role: Role;
  onClose: () => void;
};

export default function RoleModal({ role, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* MODAL CONTAINER */}
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl flex flex-col relative shadow-xl">

        {/* ================= HEADER (FIXED) ================= */}
        <div className="px-6 pt-6 pb-4 border-b">
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
            aria-label="Close"
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold text-[#2F4157]">
            {role.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {role.level} · {role.mode}
          </p>

        </div>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="px-6 py-5 overflow-y-auto flex-1 space-y-6">
          {/* JOB DESCRIPTION */}
          <section>
            <div
              className="text-sm text-gray-700 leading-relaxed
                [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: role.description }}
            />
          </section>
          {/* JOB DESCRIPTION */}
          <section>
            <h4 className="font-semibold text-[#2F4157] mb-2">
              Job Description
            </h4>
            <div
              className="text-sm text-gray-700 leading-relaxed
                [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: role.jobDescription }}
            />
          </section>

          {/* REQUIREMENTS */}
          <section>
            <h4 className="font-semibold text-[#2F4157] mb-2">
              Requirements
            </h4>
            <div
              className="text-sm text-gray-700 leading-relaxed
                [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1
                [&_h4]:font-semibold [&_h4]:mt-3"
              dangerouslySetInnerHTML={{ __html: role.requirements }}
            />
          </section>

          {/* BENEFITS */}
          <section>
            <h4 className="font-semibold text-[#2F4157] mb-2">
              What You’ll Gain
            </h4>
            <div
              className="text-sm text-gray-700 leading-relaxed
                [&_ul]:list-disc [&_ul]:ml-5 [&_li]:mb-1"
              dangerouslySetInnerHTML={{ __html: role.benefits }}
            />
          </section>

          {/* COMMITMENT */}
          {role.duration && (
            <section className="bg-[#F7F8FA] rounded-xl p-4 text-sm text-gray-700">
              <span className="font-semibold text-[#2F4157]">
                Commitment:
              </span>{" "}
              {role.duration}
            </section>
          )}
        </div>

        {/* ================= FOOTER (FIXED) ================= */}
        <div className="px-6 py-4 rounded-2xl border-t bg-white">
           <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
  <Button asChild className="flex-1 bg-[#E56668] text-white font-semibold px-6 py-3 hover:bg-[#C04C4E]">
    <Link
    href={role.applyLink}
    target="_blank"
    rel="noopener noreferrer"
  >
    Apply for This Role
  </Link>
</Button>
  </div> 
   
        </div>

      </div>
    </div>
  );
}