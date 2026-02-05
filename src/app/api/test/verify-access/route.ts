import { NextRequest, NextResponse } from 'next/server';
// Kita panggil si "Manager" (testSync) yang sudah kita benerin logic-nya
import { verifyTestAccess, getUserTestAttempts } from '@/lib/testSync';

export async function POST(request: NextRequest) {
  try {
    const { email, userId } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log(`🚀 API Request: Verifying access for ${email}...`);

    // 1. Panggil fungsi sakti verifyTestAccess
    // (Fungsi ini otomatis cek Supabase -> kalau gak ada cek Sheet -> lalu simpan ke Supabase)
    const registration = await verifyTestAccess(email, userId);

    if (!registration) {
      console.log(`❌ Result: User ${email} not found anywhere.`);
      return NextResponse.json(
        { 
          hasAccess: false,
          message: 'Email belum terdaftar di Google Sheet "Test Taker Tracker" atau Database.' 
        },
        // Jangan 404, kasih 200 tapi hasAccess false biar frontend bisa handle UI "Not Registered"
        { status: 200 } 
      );
    }

    console.log(`✅ Result: Access Granted for ${registration.full_name}`);

    // 2. Ambil data nilai (Pre-test/Post-test)
    const { preTest, postTest } = await getUserTestAttempts(registration.id);

    return NextResponse.json({
      hasAccess: true,
      registration: {
        id: registration.id,
        email: registration.email,
        full_name: registration.full_name,
        test_type: registration.test_type,
        registration_date: registration.registration_date,
        access_status: registration.access_status,
      },
      preTest: preTest || null,
      postTest: postTest || null,
    });

  } catch (error) {
    console.error('🔥 API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}