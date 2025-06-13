import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function POST(req) {
  try {

    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

   const { application_id, password } = await req.json()

    if (!application_id || !password) {
      return NextResponse.json(
        { error: 'Application ID and password are required.' },
        { status: 400 }
      )
    }

    // Step 1: Look up the user by application_id
    const { data: user, error: fetchError } = await supabaseAdmin
      .from('user_registration')
      .select('email, email_verified, is_active')
      .eq('application_id', application_id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Database fetch error:', fetchError)
      return NextResponse.json(
        { error: 'Internal server error while checking credentials.' },
        { status: 500 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid application ID or password.' },
        { status: 400 }
      )
    }

    if (!user.email_verified) {
      return NextResponse.json(
        { error: 'Email not verified. Please check your inbox.' },
        { status: 401 }
      )
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Account is inactive. Contact support.' },
        { status: 403 }
      )
    }

    // Step 2: Sign in using Supabase Auth with the email
    const { data: authData, error: authError } = 
    await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    })

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: 'Invalid application ID or password.' },
        { status: 401 }
      )
    }    

     // Get the session from authData
    const session = authData.session
    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create session.' },
        { status: 500 }
      )
    }

    // Create the response with session cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: authData.user,
      session
    })

    return response

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
