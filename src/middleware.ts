// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // 1. Inisialisasi Response awal
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Setup Supabase Client untuk Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({
            request: { headers: request.headers },
          })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 3. PENTING: getUser() akan memvalidasi token & me-refresh session cookie jika perlu.
  // Tanpa ini, session akan dianggap hilang/expired saat navigasi.
  const { data: { user } } = await supabase.auth.getUser()

  // 4. ATURAN REDIRECT

  // Jika user SUDAH login tapi buka /sign-in atau /sign-up -> Redirect ke Dashboard
  if (user && (request.nextUrl.pathname.startsWith('/sign-in') || request.nextUrl.pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Jika user BELUM login tapi buka halaman yang dilindungi (selain auth page) -> Redirect ke Sign-In
  // PENTING: Kita simpan URL tujuan di parameter '?next=' agar setelah login bisa balik lagi.
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const signInUrl = new URL('/sign-in', request.url)
    // Simpan tujuan awal user (misal: /dashboard/gif)
    signInUrl.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/test|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}