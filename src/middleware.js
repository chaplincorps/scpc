import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

const PROTECTED_BASE_PATHS = [
  '/Client/Dashboard',
  '/Client/CBT-Exam',
  '/Client/CBT-Results',
  '/Client/Application',
  '/Client/Learn',
]

const PUBLIC_PATHS = [
  '/Client/Login',
  '/Client/Onboarding',
  '/Client/Register',
  '/Client/Verify',
]

export default async function middleware(request) {
  try {
    const { pathname } = request.nextUrl

    // 1) If request is exactly "/", redirect to /Client/Onboarding
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/Client/Onboarding', request.url))
    }

    // Create response first so we can modify headers
    const response = NextResponse.next()
    
    // Add cache control headers for development
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('Cache-Control', 'no-store, max-age=0')
    }

    // Create Supabase client
    const supabase = createMiddlewareClient({ req: request, res: response })

    // 2) For public paths, check if user is already logged in
    if (PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'))) {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        // If user is logged in and tries to access login/register pages, redirect to dashboard
        if (user) {
          return NextResponse.redirect(new URL('/Client/Dashboard', request.url))
        }
      } catch (err) {
        console.error('Auth check error:', err)
      }
      
      return response
    }

    // 3) For protected paths, check user session
    if (PROTECTED_BASE_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'))) {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (!user || userError) {
          // Instead of redirecting to login, we'll let the client handle it with the modal
          // Just add a header to indicate auth status
          response.headers.set('X-Auth-Status', 'unauthorized')
          return response
        }

        console.log('User authenticated:', user.id)
        return response
      } catch (err) {
        console.error('Auth error in middleware:', err)
        response.headers.set('X-Auth-Status', 'error')
        return response
      }
    }

    // For non-protected routes, just continue
    return response
  } catch (error) {
    console.error('Middleware error:', error)
    const response = NextResponse.next()
    if (process.env.NODE_ENV === 'development') {
      response.headers.set('Cache-Control', 'no-store, max-age=0')
    }
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}