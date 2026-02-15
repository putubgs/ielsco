// src/app/api/auth/callback/route.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 1. Ambil URL, Code, dan Origin dari request Google
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin
  
  // 2. Ambil parameter 'next' (Tujuan akhir).
  // Jika tidak ada 'next', default ke '/dashboard'.
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    // Await cookies() sesuai Next.js terbaru
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
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )
    
    // 3. Tukar "Code" dari Google dengan "Session" Supabase
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 4. SUKSES! Redirect user ke tujuan awal (next).
      // Kita bersihkan URL dari parameter 'code' agar bersih.
      
      // Construct URL tujuan dengan aman
      const forwardedHost = request.headers.get('x-forwarded-host') // Untuk handle proxy/vercel
      const isLocal = origin.includes('localhost')
      
      // Jika di production (Vercel), gunakan forwardedHost jika ada, atau origin biasa
      const base = isLocal ? origin : (forwardedHost ? `https://${forwardedHost}` : origin)
      
      // Redirect ke halaman tujuan
      return NextResponse.redirect(`${base}${next}`)
    }
  }

  // 5. GAGAL? Kembalikan ke halaman error auth
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}