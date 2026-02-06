import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyTestAccess } from '@/lib/testSync';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, testType, attemptType } = await request.json();

    // Validation
    if (!email || !testType || !attemptType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify user has test access
    const registration = await verifyTestAccess(email);
    
    if (!registration) {
      return NextResponse.json(
        { error: 'No active test registration found for this email' },
        { status: 404 }
      );
    }

    // Check if there's already an in-progress attempt
    const { data: existingAttempt } = await supabase
      .from('test_attempts')
      .select('*')
      .eq('registration_id', registration.id)
      .eq('attempt_type', attemptType)
      .eq('status', 'in_progress')
      .single();

    if (existingAttempt) {
      // Return existing attempt
      return NextResponse.json({
        success: true,
        attemptId: existingAttempt.id,
        message: 'Resuming existing test attempt',
        isResume: true
      });
    }

    // Check if pre-test is completed (for post-test)
    if (attemptType === 'post-test') {
      const { data: preTest } = await supabase
        .from('test_attempts')
        .select('*')
        .eq('registration_id', registration.id)
        .eq('attempt_type', 'pre-test')
        .eq('status', 'completed')
        .single();

      if (!preTest) {
        return NextResponse.json(
          { error: 'Please complete the pre-test first' },
          { status: 400 }
        );
      }
    }

    // Create new test attempt
    const { data: newAttempt, error } = await supabase
      .from('test_attempts')
      .insert({
        registration_id: registration.id,
        test_type: testType,
        attempt_type: attemptType,
        status: 'in_progress',
        started_at: new Date().toISOString(),
        listening_answers: {},
        reading_answers: {},
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating test attempt:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      attemptId: newAttempt.id,
      message: 'Test attempt created successfully',
      isResume: false
    });

  } catch (error) {
    console.error('Error in create-attempt:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create test attempt',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}