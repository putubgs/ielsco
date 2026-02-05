import { createClient } from '@supabase/supabase-js';
import { verifyEmailAccess, updateTestScore as updateSheetScore, type SheetRegistration } from '@/lib/googleSheets';

// Gunakan Service Role Key untuk operasi server-side (bypass RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export interface TestRegistration {
  id: string;
  user_id?: string;
  email: string;
  full_name: string;
  test_type: string;
  registration_date: string;
  access_status: 'active' | 'expired';
  sheet_sync_at: string;
  created_at: string;
}

export interface TestAttempt {
  id: string;
  registration_id: string;
  test_type: string;
  attempt_type: 'pre-test' | 'post-test';
  started_at: string;
  completed_at?: string;
  status: 'in_progress' | 'completed';
  listening_score?: number;
  reading_score?: number;
  writing_score?: number;
  speaking_score?: number;
  overall_score?: number;
  mentor_feedback?: string;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
}

/**
 * 1. VERIFY ACCESS
 * Priority: Supabase (Cache) -> Google Sheets (Fallback) -> Sync to Supabase
 */
export async function verifyTestAccess(
  email: string,
  userId?: string
): Promise<TestRegistration | null> {
  try {
    const targetEmail = email.toLowerCase().trim();

    // A. Cek Supabase Cache
    const { data: cachedReg } = await supabase
      .from('test_registrations')
      .select('*')
      .eq('email', targetEmail)
      .eq('access_status', 'active')
      .single();

    if (cachedReg) {
      console.log('✓ Found registration in Supabase cache');
      
      if (userId && !cachedReg.user_id) {
        await supabase
          .from('test_registrations')
          .update({ user_id: userId })
          .eq('id', cachedReg.id);
      }
      
      return cachedReg;
    }

    // B. Cek Google Sheets (Fallback)
    console.log('× Not in cache, checking Google Sheets...');
    const sheetReg = await verifyEmailAccess(targetEmail);

    if (!sheetReg || sheetReg.accessStatus !== 'active') {
      console.log('× No active registration found in Google Sheets');
      return null;
    }

    // C. Simpan ke Supabase (Sync)
    console.log('✓ Found in Google Sheets, caching in Supabase...');
    const { data: newReg, error } = await supabase
      .from('test_registrations')
      .insert({
        user_id: userId,
        email: sheetReg.email.toLowerCase().trim(),
        full_name: sheetReg.fullName,
        test_type: sheetReg.testType,
        registration_date: sheetReg.registrationDate,
        access_status: sheetReg.accessStatus,
        sheet_sync_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error caching registration:', error);
      return {
        id: 'temp-' + Date.now(),
        email: sheetReg.email,
        full_name: sheetReg.fullName,
        test_type: sheetReg.testType,
        registration_date: sheetReg.registrationDate,
        access_status: sheetReg.accessStatus,
        sheet_sync_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
    }

    return newReg;
  } catch (error) {
    console.error('Error verifying test access:', error);
    return null;
  }
}

/**
 * 2. GET USER ATTEMPTS
 */
export async function getUserTestAttempts(
  registrationId: string
): Promise<{ preTest?: TestAttempt; postTest?: TestAttempt }> {
  try {
    const { data: attempts } = await supabase
      .from('test_attempts')
      .select('*')
      .eq('registration_id', registrationId)
      .order('created_at', { ascending: false });

    const preTest = attempts?.find(a => a.attempt_type === 'pre-test');
    const postTest = attempts?.find(a => a.attempt_type === 'post-test');

    return { preTest, postTest };
  } catch (error) {
    console.error('Error fetching test attempts:', error);
    return {};
  }
}

/**
 * 3. CREATE NEW ATTEMPT
 */
export async function createTestAttempt(data: {
  registrationId: string;
  testType: string;
  attemptType: 'pre-test' | 'post-test';
}): Promise<TestAttempt | null> {
  try {
    const { data: existing } = await supabase
      .from('test_attempts')
      .select('*')
      .eq('registration_id', data.registrationId)
      .eq('attempt_type', data.attemptType)
      .single();

    if (existing) {
      return existing; 
    }

    const { data: newAttempt, error } = await supabase
      .from('test_attempts')
      .insert({
        registration_id: data.registrationId,
        test_type: data.testType,
        attempt_type: data.attemptType,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return newAttempt;
  } catch (error) {
    console.error('Error creating test attempt:', error);
    return null;
  }
}

/**
 * 4. SUBMIT SCORE & UPDATE SHEET (FIXED)
 */
export async function submitTestScore(data: {
  attemptId: string;
  scores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  };
  testType?: string;
  feedback?: {
    mentor_feedback?: string;
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
}): Promise<TestAttempt | null> {
  try {
    // 1. Ambil data attempt
    const { data: currentAttempt } = await supabase
      .from('test_attempts')
      .select('test_type, test_registrations(email)')
      .eq('id', data.attemptId)
      .single();
    
    const testType = data.testType || currentAttempt?.test_type || 'ielts';
    
    // 2. Hitung Skor
    const overallScore = calculateOverallBand(data.scores, testType);

    // 3. Update DB Supabase
    const { data: updatedAttempt, error } = await supabase
      .from('test_attempts')
      .update({
        listening_score: data.scores.listening,
        reading_score: data.scores.reading,
        writing_score: data.scores.writing,
        speaking_score: data.scores.speaking,
        overall_score: overallScore,
        completed_at: new Date().toISOString(),
        status: 'completed',
        ...data.feedback,
      })
      .eq('id', data.attemptId)
      .select()
      .single();

    if (error) throw error;

    // 4. Update Google Sheets (Fix Type Error Here)
    const regData: any = currentAttempt?.test_registrations;
    
    // Handle possibility of Array or Object
    const emailToSync = Array.isArray(regData) 
      ? regData[0]?.email 
      : regData?.email;

    if (emailToSync) {
      const attemptType = (updatedAttempt.attempt_type === 'pre-test') ? 'pretest' : 'posttest';
      
      await updateSheetScore(
        emailToSync,
        attemptType,
        overallScore
      );
    }

    return updatedAttempt;
  } catch (error) {
    console.error('Error submitting test score:', error);
    return null;
  }
}

/**
 * HELPER: Calculate Overall Score
 */
function calculateOverallBand(
  scores: { listening: number; reading: number; writing: number; speaking: number },
  testType: string = 'ielts'
): number {
  const type = testType.toLowerCase();

  if (type === 'toefl') {
    return scores.listening + scores.reading + scores.writing + scores.speaking;
  } 
  
  if (type === 'toeic') {
    return scores.listening + scores.reading;
  }

  // IELTS
  const average = (scores.listening + scores.reading + scores.writing + scores.speaking) / 4;
  return Math.round(average * 2) / 2;
}

/**
 * 5. CERTIFICATE LOGIC
 */
export async function getOrCreateCertificate(
  attemptId: string
): Promise<{ certificateNumber: string; pdfUrl?: string } | null> {
  try {
    const { data: existing } = await supabase
      .from('test_certificates')
      .select('*')
      .eq('attempt_id', attemptId)
      .eq('is_valid', true)
      .single();

    if (existing) {
      return {
        certificateNumber: existing.certificate_number,
        pdfUrl: existing.pdf_url,
      };
    }

    const { data: attempt } = await supabase
      .from('test_attempts')
      .select('*, test_registrations(*)')
      .eq('id', attemptId)
      .single();

    if (!attempt || attempt.status !== 'completed') {
      return null; 
    }

    const year = new Date().getFullYear();
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const certificateNumber = `IELS-${year}-${randomCode}`;
    const verificationCode = Math.random().toString(36).substring(2, 12).toUpperCase();

    const { data: certificate, error } = await supabase
      .from('test_certificates')
      .insert({
        attempt_id: attemptId,
        certificate_number: certificateNumber,
        verification_code: verificationCode,
        is_valid: true,
        pdf_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/verify/${verificationCode}` 
      })
      .select()
      .single();

    if (error) throw error;

    return {
      certificateNumber: certificate.certificate_number,
      pdfUrl: certificate.pdf_url,
    };
  } catch (error) {
    console.error('Error getting/creating certificate:', error);
    return null;
  }
}