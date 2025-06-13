import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendVerificationSuccessEmail } from '@/lib/email'

// Initialize a Supabase "admin" client (SERVICE_ROLE) so we can bypass RLS
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
  const { email, application_id, token } = await req.json()
   
  // 1) Basic payload validation
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }
  if (!application_id || typeof application_id !== 'string') {
    return NextResponse.json({ error: 'Application ID is required.' }, { status: 400 })
  }
  if (!token) {
    return NextResponse.json({ error: 'Token is required.' }, { status: 400 })
  }

  // 2) Verify that token is exactly 8 digits (numeric)
  if (!/^[0-9]{8}$/.test(token)) {
    return NextResponse.json({ error: 'Token must be exactly 8 digits.' }, { status: 400 })
  }

  try {
    // 3) Fetch the registration row by both email AND application_id
    const { data: row, error: fetchError } = await supabaseAdmin
      .from('user_registration')
      .select('id, token, token_expires_at, email_verified, plain_password')
      .eq('email', email)
      .eq('application_id', application_id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Invalid email, application ID, or token.' }, { status: 400 })
      }
      console.error('Database error fetching registration row:', fetchError)
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
    }

    // 4) Check for "already verified" or "already used" states
    if (row.email_verified === true) {
      return NextResponse.json({ error: 'Email already verified.' }, { status: 400 })
    }
    if (row.token === null) {
      return NextResponse.json({ error: 'Token has already been used.' }, { status: 400 })
    }

    // Convert received token to number to match database type
    const numericToken = Number(token)
  
   // 5) Compare stored token vs. submitted token
    if (row.token !== numericToken) {
      return NextResponse.json({ error: 'Invalid token.' }, { status: 400 })
    }
    
    // 6) Check expiration
    const now = new Date()
    const expiresAt = new Date(row.token_expires_at + 'Z') 

    if (expiresAt < now) {
      return NextResponse.json({ error: 'Token has expired.' }, { status: 400 })
    }

    // Create the Auth user with plain password
    const { data: user, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: row.plain_password,
      email_confirm: true 
    });

    if (createErr) {
      return NextResponse.json({ error: createErr.message }, { status: 400 });
    }

    // Update the row and remove the plain password
    const { error: updateError } = await supabaseAdmin
      .from('user_registration')
      .update({
        supabase_user_id: user.user.id,
        email_verified: true,
        is_active: true,
        token: null,
        token_expires_at: null,
        plain_password: null
      })
      .eq('id', row.id)

    if (updateError) {
      console.error('Error updating registration row:', updateError)
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
    }

    // 8) Send a follow‐up email (using the email + application_id)
    try {
      await sendVerificationSuccessEmail({
        to: email,
        applicationId: application_id,
      })
    } catch (emailError) {
      console.error('Error sending post‐verification email:', emailError)
      // Do NOT fail the entire request if this e‐mail blows up.
    }

    // 9) Return success
    return NextResponse.json(
      { message: 'Email successfully verified.' },
      { status: 200 }
    )
  } catch (err) {
    console.error('Unexpected error in verify‐token route:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
