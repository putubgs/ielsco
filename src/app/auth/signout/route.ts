// src/app/auth/signout/route.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // 1. Ambil URL origin agar redirect dinamis (localhost vs production)
  const requestUrl = new URL(request.url)
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Note: Saat sign out, kita sebenarnya akan menghapus cookie,
          // tapi method ini tetap diperlukan oleh createServerClient
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          // PENTING: Ini yang akan menghapus cookie auth dari browser
          cookieStore.set({ name, value: '', ...options }) 
        },
      },
    }
  )

  // 2. Proses Logout di sisi Supabase (Invalidate Session)
  // Perlu await agar server menunggu proses ini selesai sebelum redirect
  await supabase.auth.signOut()

  // 3. Redirect user kembali ke halaman Sign In (atau Home) setelah logout
  // Gunakan 303 See Other (Standard untuk redirect setelah POST request)
  return NextResponse.redirect(`${requestUrl.origin}/sign-in`, {
    status: 303, 
  })
}