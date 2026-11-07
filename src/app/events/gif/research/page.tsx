"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Leaf,
  BookOpen, 
  Search, 
  BarChart, 
  FileText, 
  Calendar, 
  CheckCircle2,
  AlertCircle,
  PenTool,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AcademicResearchPage() {
  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-[#304156]">
      
      {/* ================= HERO SECTION ================= */}
      <div className="bg-[#304156] text-[#FFFFFF] pt-20 pb-32 relative overflow-hidden">        
        <div className="absolute inset-0 bg-[url('/images/contents/stories/member-stories/banner/singapore-banner.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2F4055]/95 via-[#914D4D]/80 to-[#304156]/95" />
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#914D4D] opacity-20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2F4055] opacity-30 blur-[80px] rounded-full -translate-x-1/3 translate-y-1/3" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">

          <div className="inline-flex items-center gap-2 bg-[#914D4D]/20 border border-[#914D4D]/30 text-[#FFFFFF] px-4 py-1.5 rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
            <BookOpen className="w-4 h-4" /> Post-Residency Phase
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Academic Research Guidelines
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
            Great social projects generate great data. During your 6-month project realization, your group will conduct field research to validate your impact. We will guide you from data collection to publishing your findings in the IELS Knowledge Hub.
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-20 pb-24 space-y-8">

        {/* --- SECTION 1: CORE CONCEPT (Connecting Project & Research) --- */}
        <div className="bg-[#FFFFFF] rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#304156]">
            <Search className="w-6 h-6 text-[#914D4D]" /> The Research Concept
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            One of the biggest confusions is whether the research is separate from the project. <strong>It is not.</strong> Your research paper is the academic validation of the SDG 4 project you execute in Indonesia. <strong>1 Group = 1 Project = 1 Research Paper.</strong>
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#914D4D]/30 transition-colors">
              <BarChart className="w-8 h-8 text-[#304156] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#304156]">Data-Driven Action</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You are not just writing theories. You will use the frameworks learned at NUS to collect primary data directly from your project's beneficiaries.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#914D4D]/30 transition-colors">
              <PenTool className="w-8 h-8 text-[#914D4D] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#304156]">IELS Mentorship</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No research experience? Don't worry. IELS provides dedicated mentorship on data processing, methodology, and academic structuring.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#914D4D]/30 transition-colors">
              <Award className="w-8 h-8 text-[#2F4055] mb-4" />
              <h3 className="font-bold text-lg mb-2 text-[#304156]">Publication</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Completed and approved papers will be officially published in the <strong>IELS Knowledge Hub</strong>, serving as a powerful academic portfolio for your future career or studies.
              </p>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE PARALLEL TIMELINE --- */}
        <div className="bg-[#FFFFFF] rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#304156]">
            <Calendar className="w-6 h-6 text-[#914D4D]" /> Research & Data Timeline
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            The research process runs strictly parallel to your project realization. Here is how your academic milestones align with your fieldwork.
          </p>

          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-6 space-y-10 py-4">
            
            {/* Step 1 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-[#304156] rounded-full border-4 border-[#FFFFFF] shadow-sm" />
              <div className="bg-gray-50 inline-block px-3 py-1 rounded-md text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide border border-gray-200">June 2026</div>
              <h3 className="text-xl font-bold text-[#304156] mb-2">Phase 1: Baseline Study (Pre-Test)</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Before launching your project offline, your team must distribute preliminary surveys or conduct initial interviews in your target area to establish baseline data.
              </p>
            </div>

            {/* Step 2 (Highlight) */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-[#914D4D] rounded-full border-4 border-[#FFFFFF] shadow-sm ring-4 ring-[#914D4D]/20" />
              <div className="bg-[#914D4D]/10 inline-block px-3 py-1 rounded-md text-xs font-bold text-[#914D4D] mb-2 uppercase tracking-wide border border-[#914D4D]/20">July - August 2026</div>
              <h3 className="text-xl font-bold text-[#304156] mb-2">Phase 2: Field Data Collection</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                During your <strong>2-3 weeks intensive volunteership</strong>, you are actively gathering data. This includes:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#914D4D] mt-0.5 shrink-0" /> Tracking participant progress and immediate project outputs.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#914D4D] mt-0.5 shrink-0" /> Documenting case studies and qualitative beneficiary feedback.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#914D4D] mt-0.5 shrink-0" /> Conducting the Post-Test to measure direct educational impact.</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-[#304156] rounded-full border-4 border-[#FFFFFF] shadow-sm" />
              <div className="bg-gray-50 inline-block px-3 py-1 rounded-md text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide border border-gray-200">September - October 2026</div>
              <h3 className="text-xl font-bold text-[#304156] mb-2">Phase 3: Data Processing & Mentorship</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Back from the field, your team will process the raw data. IELS will provide online mentorship sessions to guide you on how to analyze the data academically and structure your findings.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-[#304156] rounded-full border-4 border-[#FFFFFF] shadow-sm" />
              <div className="bg-gray-50 inline-block px-3 py-1 rounded-md text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide border border-gray-200">November 2026</div>
              <h3 className="text-xl font-bold text-[#304156] mb-2">Phase 4: Manuscript Drafting</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Translating the analyzed data into a formal academic paper. Your team will write the methodology, results, and discussion sections, integrating the sustainability plan of your project.
              </p>
            </div>

          </div>
        </div>

        {/* --- SECTION 3: THE FINAL OUTPUT (THE RESEARCH PAPER) --- */}
        <div className="bg-[#FFFFFF] rounded-3xl p-8 md:p-10 border border-gray-100 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-[#304156]">
              <FileText className="w-6 h-6 text-[#914D4D]" /> Final Deliverable: The Research Paper
            </h2>
            <div className="bg-[#914D4D]/10 text-[#914D4D] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-[#914D4D]/20">
              <AlertCircle className="w-4 h-4" /> Deadline: December 2026
            </div>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Your final submission is a formal academic paper written in English. This paper will be reviewed by the IELS Academic Team before publication. Below is the expected structure of your submission.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-2xl p-6 bg-[#FFFFFF] hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#304156] mb-2 border-b border-gray-100 pb-2">1. Abstract & Introduction</h4>
              <p className="text-sm text-gray-500">Summary of your SDG 4 project, the specific local problem you addressed, and the objectives of your intervention.</p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6 bg-[#FFFFFF] hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#304156] mb-2 border-b border-gray-100 pb-2">2. Methodology</h4>
              <p className="text-sm text-gray-500">How did you execute the project? Describe the target demographic, duration (the 2-3 weeks intensive), and how you collected data.</p>
            </div>
            <div className="border border-gray-200 rounded-2xl p-6 bg-[#FFFFFF] hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#304156] mb-2 border-b border-gray-100 pb-2">3. Results & Impact Analysis</h4>
              <p className="text-sm text-gray-500">The core of your paper. Present the data showing the before-and-after effects of your educational project on the community.</p>
            </div>
            <div className="border border-[#914D4D]/20 rounded-2xl p-6 bg-[#914D4D]/5 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-[#914D4D] mb-2 border-b border-[#914D4D]/20 pb-2">4. Conclusion & Sustainability</h4>
              <p className="text-sm text-gray-600">Lessons learned, limitations of your project, and the strategic blueprint for how this project can be continued by future delegates.</p>
            </div>
          </div>
        </div>

        {/* --- SECTION 4: CALL TO ACTION --- */}
        {/* USING GRADIENT LINEAR #2F4055 #914D4D #304156 */}
        <div className="bg-gradient-to-r from-[#2F4055] via-[#914D4D] to-[#304156] rounded-3xl p-8 md:p-10 text-[#FFFFFF] text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10">
            <Leaf className="w-12 h-12 text-[#FFFFFF] mx-auto mb-6 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Publish Your Impact?</h2>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
              A project without data is just a story. A project backed by academic research becomes a scalable solution. Complete your administration and start drafting your initial ideas today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
               {/* USING GRADIENT LINEAR #2F4055 #914D4D */}
               <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-[#2F4055] to-[#914D4D] hover:opacity-90 text-[#FFFFFF] font-bold py-4 px-8 rounded-2xl text-md shadow-lg border-none transition-all">
                 <Link href="/events/gif/project">
                   Read Project Realization Guidelines
                 </Link>
               </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}