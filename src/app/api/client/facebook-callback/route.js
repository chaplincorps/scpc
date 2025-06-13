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

// Use the same functions from your registration
function generateAppId() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function GET(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Exchange the code for a session
    const requestUrl = new URL(req.url)
    const code = requestUrl.searchParams.get('code')
    
    if (!code) {
      console.error('No code provided in callback')
      return NextResponse.redirect(new URL('/Client/Login?error=no_code', requestUrl.origin))
    }

    // Exchange the code for a session
    const { error: signInError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (signInError) {
      console.error('Sign in error:', signInError)
      return NextResponse.redirect(new URL('/Client/Login?error=signin_failed', requestUrl.origin))
    }
    
    // Get the current user from the session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return NextResponse.redirect(new URL('/Client/Login?error=auth_failed', requestUrl.origin))
    }

    // Check if user already has an application_id in user_registration table
    const { data: existingUser, error: fetchError } = await supabaseAdmin
      .from('user_registration')
      .select('application_id')
      .eq('email', user.email)
      .single()

    let application_id;

    if (fetchError && fetchError.code === 'PGRST116') {
      // User doesn't exist in user_registration, create new entry
      let exists = true;

      for (let i = 0; i < 5 && exists; i++) {
        const candidate = `SCPC${generateAppId()}`;
        // Check if it exists
        const { data: rows, error: fetchError } = await supabaseAdmin
          .from('user_registration')
          .select('application_id')
          .eq('application_id', candidate)
          .limit(1);

        if (fetchError) throw fetchError;
        if (rows.length === 0) {
          application_id = candidate;
          exists = false;
        }
      }

      if (!application_id) {
        console.error('Could not generate unique application ID')
        return NextResponse.redirect(new URL('/Client/Login?error=id_generation_failed', requestUrl.origin))
      }

      // Insert new user registration record with all required fields
      const { error: insertError } = await supabaseAdmin
        .from('user_registration')
        .insert({
          application_id,
          email: user.email,
          password: null,  
          plain_password: null,
          terms_of_service: true, 
          email_verified: true, 
          is_active: true,
          oAuth: true,
          auth_provider: 'facebook',
          token_expires_at: null,
          created_at: new Date().toISOString(),
        })

      if (insertError) {
        console.error('Insert error:', insertError)
        return NextResponse.redirect(new URL('/Client/Login?error=registration_failed', requestUrl.origin))
      }

      // Redirect to dashboard with new user message
      return NextResponse.redirect(new URL('/Client/Dashboard?status=new_user', requestUrl.origin))
      
    }
    else {
      // User already exists, use existing application_id
      application_id = existingUser.application_id  
      // Redirect to dashboard with returning user message
      return NextResponse.redirect(new URL('/Client/Dashboard?status=returning_user', requestUrl.origin))
    }
    
  } catch (error) {
    console.error('Unexpected error in Facebook callback:', error)
    return NextResponse.redirect(new URL('/Client/Login?error=unexpected_error', requestUrl.origin))
  }
} 