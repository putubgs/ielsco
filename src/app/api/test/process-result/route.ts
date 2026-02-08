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
      Act as an expert IELTS Writing Examiner. 
      Your goal is to provide a rigorous and honest assessment of the following student submissions.

      TASK 1 QUESTION:
      Letter to a manager about job dissatisfaction. Requirements: Explain dissatisfaction, suggest solutions, request specific action. Min 150 words.

      TASK 2 QUESTION:
      Topic: Spending public money on healthy lifestyles vs. treating illness. Requirements: Discuss extent of agreement/disagreement with reasons and examples. Min 250 words.

      STUDENT SUBMISSIONS:
      Task 1: "${writingTask1 || "No answer provided"}"
      Task 2: "${writingTask2 || "No answer provided"}"

      ASSESSMENT CRITERIA & INSTRUCTIONS:
      1. CRITICAL VALIDATION: If the student provides an answer that is irrelevant, off-topic, or "gibberish" (ngasal), you MUST be honest. In the "analysis" and "improvements" section, explicitly state that the response does not address the prompt.
      2. SCORING: Provide scores (0.0 - 9.0) based on Task Response, Coherence/Cohesion, Lexical Resource, and Grammatical Range/Accuracy.
      3. TASK ACHIEVEMENT: Harshly penalize answers that don't meet the word count or ignore parts of the prompt.
      4. ANALYSIS: This should be an HTML string. Use <b>tags</b> for emphasis. Break it down into Task 1 and Task 2. If the user was not serious, call it out directly but professionally.

      Return ONLY a valid JSON object with this structure:
      {
        "overall_band": number,
        "task_achievement": number,
        "coherence_cohesion": number,
        "lexical_resource": number,
        "grammar": number,
        "strengths": ["string"],
        "improvements": ["string"],
        "analysis": "HTML string summarizing detailed performance and relevance"
      }
    `;
const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanedText = text.replace(/```json|```/g, '').trim();
    
    feedbackData = JSON.parse(cleanedText);
    writingBand = feedbackData.overall_band || 5.0;
  }
} catch (e) {
  console.log("AI Generation Error:", e);
  // Fallback if AI fails
  feedbackData = { analysis: "Analysis currently unavailable due to system error." };
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