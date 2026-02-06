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
  process.env.SUPABASE_SERVICE_ROLE_KEY! // PENTING: Pakai Service Role Key biar bisa bypass RLS
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
    // 1. Security Check
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

    // 2. Logic Baru: Cek apakah Attempt ID sudah ada?
    let targetUserId = null;
    let isLegacy = false;

    // Cek attempt di DB
    const { data: existingAttempt } = await supabase
      .from('test_attempts')
      .select('user_id')
      .eq('id', attemptId)
      .single();

    if (existingAttempt) {
      // Skenario 1: Normal (User klik Start Test dari web)
      targetUserId = existingAttempt.user_id;
    } else {
      // Skenario 2: LEGACY USER (Orang lama yg datanya cuma ada di GForm)
      // Kita cari User ID mereka berdasarkan EMAIL di tabel users
      isLegacy = true;
      const { data: user } = await supabase
        .from('users') // Pastikan tabel public.users ada email
        .select('id')
        .eq('email', email)
        .single();
      
      if (user) {
        targetUserId = user.id;
        console.log(`Legacy user found! Linking to User ID: ${user.id}`);
      } else {
        console.log(`User with email ${email} not found in DB. Skipping.`);
        // Opsional: Tetap simpan tapi tanpa user_id (null), atau return error
        // Kita return success aja biar script GSheet gak error, tapi data gak masuk
        return NextResponse.json({ message: 'Skipped: User email not found in system' });
      }
    }

    // 3. AI Assessment (Writing)
    const prompt = `
      You are an IELTS Examiner. Assess these writing tasks.
      Task 1: ${writingTask1 || "No answer"}
      Task 2: ${writingTask2 || "No answer"}
      Return JSON with overall_band (0-9), feedback text, strengths (array), improvements (array).
    `;

    let writingBand = 5.0;
    let feedbackData = {};

    try {
      const result = await model.generateContent(prompt);
      const assessment = JSON.parse(result.response.text());
      writingBand = assessment.overall_band || 5.0;
      feedbackData = assessment;
    } catch (e) {
      console.log("AI Error, using fallback score");
    }

    // 4. Calculate Final Score
    const lBand = convertToIELTSBand(listeningScore);
    const rBand = convertToIELTSBand(readingScore);
    const overall = Math.round(((lBand + rBand + writingBand) / 3) * 2) / 2;

    // 5. Save to Database (Upsert: Update kalau ada, Insert kalau gak ada)
    const payload = {
      id: attemptId, // Pakai ID dari GSheet (bisa UUID asli atau fake UUID legacy)
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
      .upsert(payload); // UPSERT adalah kunci buat user lama!

    if (error) throw error;

    return NextResponse.json({ success: true, isLegacy });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}