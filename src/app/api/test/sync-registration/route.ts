import { NextRequest, NextResponse } from 'next/server';
import { getAllRegistrations } from '@/lib/googleSheets';
import { createClient } from '@supabase/supabase-js';

// Pakai Service Role biar bisa bypass RLS (karena ini operasi admin)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // 1. Security Check (Biar gak ditembak orang iseng)
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.SYNC_API_SECRET || 'iels-rahasia-banget';
    
    // Kalau token salah, tolak
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 Starting Mass Sync from Google Sheets...');

    // 2. Ambil SEMUA data dari Sheet
    const sheetRegistrations = await getAllRegistrations();

    let syncedCount = 0;
    let errorCount = 0;

    // 3. Loop satu per satu simpan ke DB
    for (const reg of sheetRegistrations) {
      try {
        const email = reg.email.toLowerCase().trim();

        // Cek apakah user sudah ada di DB?
        const { data: existing } = await supabase
          .from('test_registrations')
          .select('id')
          .eq('email', email)
          .single();

        if (existing) {
          // UPDATE data kalau sudah ada
          await supabase
            .from('test_registrations')
            .update({
              full_name: reg.fullName,
              test_type: reg.testType,
              access_status: reg.accessStatus,
              sheet_sync_at: new Date().toISOString(),
            })
            .eq('id', existing.id);
        } else {
          // INSERT data baru kalau belum ada
          await supabase
            .from('test_registrations')
            .insert({
              email: email,
              full_name: reg.fullName,
              test_type: reg.testType,
              registration_date: reg.registrationDate, // Pastikan ini ada di interface googleSheets
              access_status: reg.accessStatus,
              sheet_sync_at: new Date().toISOString(),
            });
        }

        syncedCount++;
      } catch (error) {
        errorCount++;
        console.error(`❌ Gagal sync ${reg.email}:`, error);
      }
    }

    console.log(`✅ Mass Sync Selesai: ${syncedCount} sukses, ${errorCount} gagal.`);

    return NextResponse.json({
      success: true,
      synced: syncedCount,
      errors: errorCount,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Fatal Sync Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}