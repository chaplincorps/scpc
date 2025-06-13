import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendResendTokenEmail } from '@/lib/email'
import validator from 'validator'

// Initialize admin client to bypass RLS
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

function generateToken() {
  // Generate 8 random digits using Web Crypto API
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0].toString().padStart(8, '0').slice(0, 8)
}

export async function POST(req) {
  const { email, application_id } = await req.json()

  // 1) Basic payload validation
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  if (!application_id || typeof application_id !== 'string') {
    return NextResponse.json({ error: 'Application ID is required.' }, { status: 400 })
  }

  // 2) Validate email format using validator
  if (!validator.isEmail(email)) {
    return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
  }

  // 3) Validate application ID format (SCPC followed by 6 digits)
  if (!/^SCPC\d{6}$/.test(application_id)) {
    return NextResponse.json({ error: 'Invalid application ID format.' }, { status: 400 })
  }

  // 4) Normalize email (trim whitespace and convert to lowercase)
  const normalizedEmail = validator.normalizeEmail(email)

  try {
    // 5) Check if email and application_id match in database
    const { data: user, error: fetchError } = await supabaseAdmin
      .from('user_registration')
      .select('id, email_verified, application_id')
      .eq('email', normalizedEmail)
      .eq('application_id', application_id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json({ error: 'No account found with this email and application ID.' }, { status: 404 })
      }
      console.error('Database error fetching user:', fetchError)
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
    }

    // 6) Check if email is already verified
    if (user.email_verified === true) {
      return NextResponse.json({ error: 'Email is already verified.' }, { status: 400 })
    }

    // 7) Generate new token and set expiration to 3 minutes from now
    const token = generateToken()
    const tokenExpiresAt = new Date()
    tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 3)

    // 8) Update the user's token in database
    const { error: updateError } = await supabaseAdmin
      .from('user_registration')
      .update({
        token,
        token_expires_at: tokenExpiresAt.toISOString()
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating token:', updateError)
      return NextResponse.json({ error: 'Failed to update verification token.' }, { status: 500 })
    }

    // 9) Send the new token email
    try {
      await sendResendTokenEmail({
        to: normalizedEmail,
        verificationToken: token,
      })
    } catch (emailError) {
      console.error('Error sending resend token email:', emailError)
      // Don't fail the request if email fails
    }

    // 10) Return success response
    return NextResponse.json(
      { 
        message: 'New verification token sent successfully.',
        application_id: user.application_id
      },
      { status: 200 }
    )

  } catch (err) {
    console.error('Unexpected error in resend-token route:', err)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
