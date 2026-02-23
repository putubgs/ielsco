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
  const { data: { user } } = await supabase.auth.getUser()

  // 4. ATURAN REDIRECT
const isAuthRoute = request.nextUrl.pathname.startsWith('/sign-in') || 
                    request.nextUrl.pathname.startsWith('/sign-up');

// Semua halaman dalam forgot password flow — bukan cuma new-password
const isForgotPasswordFlow = request.nextUrl.pathname.startsWith('/sign-in/forgot');

// Jika user SUDAH login tapi buka halaman Auth
if (user && isAuthRoute) {
  // Biarin seluruh forgot password flow lewat (forgot, verify, new-password)
  if (isForgotPasswordFlow) {
    return response;
  }
  
  // Selain itu, tendang ke Dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url))
}

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth|api/test|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}