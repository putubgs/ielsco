import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Init Gemini & Supabase
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" } 
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

function convertToIELTSBand(correctAnswers: number): number {
  if (correctAnswers >= 39) return 9.0;
  if (correctAnswers >= 37) return 8.5;
  if (correctAnswers >= 35) return 8.0;
  if (correctAnswers >= 32) return 7.5;
  if (correctAnswers >= 30) return 7.0;
  if (correctAnswers >= 26) return 6.5;
  if (correctAnswers >= 23) return 6.0;
  if (correctAnswers >= 18) return 5.5;
  if (correctAnswers >= 16) return 5.0;
  if (correctAnswers >= 13) return 4.5;
  if (correctAnswers >= 10) return 4.0;
  return 3.5;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get('x-api-key');
    if (apiKey !== INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      attemptId, fullName, email, whatsapp,
      listeningScore, readingScore, writingTask1, writingTask2
    } = body;

    console.log(`Processing result for: ${email} (ID: ${attemptId})`);

    let targetUserId = null;

    // Cek existing attempt
    const { data: existingAttempt } = await supabase
      .from('test_attempts')
      .select('user_id')
      .eq('id', attemptId)
      .single();

    if (existingAttempt) {
      targetUserId = existingAttempt.user_id;
    } else {
      // Cek user by email
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle(); 
      
      if (user) {
        targetUserId = user.id;
      } else {
        // User belum daftar, biarkan NULL tapi tetap simpan
        targetUserId = null; 
      }
    }

    // AI Assessment
    let writingBand = 5.0;
    // FIX: Tambahkan ': any' agar TypeScript tidak rewel saat parsing JSON nanti
    let feedbackData: any = { analysis: "<p>AI analysis pending...</p>" };

    try {
      if (writingTask1 || writingTask2) {
        const prompt = `
          Act as an IELTS Examiner. Assess these tasks:
          Task 1: ${writingTask1 || "No answer"}
          Task 2: ${writingTask2 || "No answer"}
          Return valid JSON: { "overall_band": number, "task_achievement": number, "coherence_cohesion": number, "lexical_resource": number, "grammar": number, "strengths": ["string"], "improvements": ["string"], "analysis": "HTML string summarizing performance" }
        `;
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanedText = text.replace(/```json|```/g, '').trim();
        
        feedbackData = JSON.parse(cleanedText);
        writingBand = feedbackData.overall_band || 5.0;
      }
    } catch (e) {
      console.log("AI Generation Error:", e);
    }

    const lBand = convertToIELTSBand(listeningScore);
    const rBand = convertToIELTSBand(readingScore);
    const overall = Math.round(((lBand + rBand + writingBand) / 3) * 2) / 2;

    const payload = {
      id: attemptId, 
      user_id: targetUserId,
      full_name: fullName,
      email: email,
      whatsapp: whatsapp,
      listening_score: lBand,
      reading_score: rBand,
      writing_score: writingBand,
      overall_score: overall,
      writing_feedback: feedbackData,
      writing_task1: writingTask1,
      writing_task2: writingTask2,
      status: 'completed',
      completed_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('test_attempts')
      .upsert(payload);

    if (error) {
        console.error("Supabase Save Error:", error);
        throw error;
    }

    return NextResponse.json({ success: true, saved: true });

  } catch (error: any) {
    console.error('Final API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}