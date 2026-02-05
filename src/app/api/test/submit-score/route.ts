import { NextRequest, NextResponse } from 'next/server';
import { submitTestScore } from '@/lib/testSync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { attemptId, scores, feedback } = body;

    // Validation
    if (!attemptId) {
      return NextResponse.json(
        { error: 'Attempt ID is required' },
        { status: 400 }
      );
    }

    if (!scores || typeof scores !== 'object') {
      return NextResponse.json(
        { error: 'Scores object is required' },
        { status: 400 }
      );
    }

    // Validate score values (0-9 range for IELTS)
    const requiredScores = ['listening', 'reading', 'writing', 'speaking'];
    for (const scoreType of requiredScores) {
      const score = scores[scoreType];
      if (score === undefined || score === null) {
        return NextResponse.json(
          { error: `${scoreType} score is required` },
          { status: 400 }
        );
      }
      if (typeof score !== 'number' || score < 0 || score > 9) {
        return NextResponse.json(
          { error: `${scoreType} score must be between 0 and 9` },
          { status: 400 }
        );
      }
    }

    // Submit scores (saves to both Supabase and Google Sheets)
    const updatedAttempt = await submitTestScore({
      attemptId,
      scores: {
        listening: scores.listening,
        reading: scores.reading,
        writing: scores.writing,
        speaking: scores.speaking,
      },
      feedback: feedback || {},
    });

    if (!updatedAttempt) {
      return NextResponse.json(
        { error: 'Failed to submit test scores' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      attempt: {
        id: updatedAttempt.id,
        listening_score: updatedAttempt.listening_score,
        reading_score: updatedAttempt.reading_score,
        writing_score: updatedAttempt.writing_score,
        speaking_score: updatedAttempt.speaking_score,
        overall_score: updatedAttempt.overall_score,
        completed_at: updatedAttempt.completed_at,
        status: updatedAttempt.status,
      },
      message: 'Test scores submitted successfully',
    });

  } catch (error) {
    console.error('Error submitting test score:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit test score',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve test attempt scores
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const attemptId = searchParams.get('attemptId');

    if (!attemptId) {
      return NextResponse.json(
        { error: 'Attempt ID is required' },
        { status: 400 }
      );
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: attempt, error } = await supabase
      .from('test_attempts')
      .select('*')
      .eq('id', attemptId)
      .single();

    if (error || !attempt) {
      return NextResponse.json(
        { error: 'Test attempt not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      attempt,
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve test scores' },
      { status: 500 }
    );
  }
}