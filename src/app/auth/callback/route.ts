// src/app/api/auth/callback/route.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
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

    // Tukar Code dengan Session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // FIX RACE CONDITION:
      // Kita tentukan URL tujuan dengan handling forwarded host (untuk Vercel/Production)
      const forwardedHost = request.headers.get('x-forwarded-host') 
      const isLocal = origin.includes('localhost')
      // Gunakan https jika di production/vercel
      const base = isLocal ? origin : (forwardedHost ? `https://${forwardedHost}` : origin)
      
      // Redirect langsung
      return NextResponse.redirect(`${base}${next}`)
    }
  }

  // Jika gagal / error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}