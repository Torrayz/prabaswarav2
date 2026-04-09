import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // protected routes targeting the /admin path
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If user is trying to access login page while already authenticated, redirect to /admin/messages
    if (request.nextUrl.pathname === '/admin/login') {
        if (user) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/messages'
            return NextResponse.redirect(url)
        }
        return supabaseResponse
    }
    
    // If user is NOT authenticated and trying to access an admin page other than login, redirect to login
    if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
