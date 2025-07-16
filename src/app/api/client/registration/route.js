import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendRegistrationEmail } from '@/lib/email'
import { sendWelcomeEmail } from '@/lib/email'
import validator from 'validator'
import bcrypt from 'bcryptjs'

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

function generateAppId() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateToken() {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0].toString().padStart(8, '0').slice(0, 8)
}

export async function POST(req) {
   if (request.method !== "POST") {
      return NextResponse.json(
         { error: "Method not allowed" },
         { status: 405 }
      )
   }

  try {
    const { email, token, password, terms_of_service } = await req.json()

    if(terms_of_service != true){
      return NextResponse.json(
         { error: 'Your must agree to SCPC terms.'},
         { status: 400 }
      ) 
    }

    // Step 1: Email submission (start registration)
    if (email && !token && !password) {
      if (!validator.isEmail(email)) {
        return NextResponse.json(
          { error: 'Invalid email format.' },
          { status: 400 }
        )
      }
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabaseAdmin
        .from('user_registration')
        .select('email, email_verified')
        .eq('email', email)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        return NextResponse.json(
          { error: 'Error checking email existence.' },
          { status: 500 }
        )
      }

      if (existingUser && existingUser.email_verified) {
        return NextResponse.json(
          { error: 'An account with this email already exists.' },
          { status: 400 }
        )
      }

      // Generate application_id if not present
      let application_id = existingUser?.application_id
      if (!application_id) {
        let exists = true
        for (let i = 0; i < 5 && exists; i++) {
          const candidate = `SCPC${generateAppId()}`
          const { data: rows, error: fetchError } = await supabaseAdmin
            .from('user_registration')
            .select('application_id')
            .eq('application_id', candidate)
            .limit(1)
          if (fetchError) throw fetchError
          if (rows.length === 0) {
            application_id = candidate
            exists = false
          }
        }
        if (!application_id) {
          return NextResponse.json(
            { error: 'Could not generate unique application ID.' },
            { status: 500 }
          )
        }
      }

      // Generate token and set expiration
      const verificationToken = generateToken()
      const tokenExpiresAt = new Date()
      tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 5)
      const { error: upsertError } = await supabaseAdmin
        .from('user_registration')
        .upsert({
          application_id,
          email,
          terms_of_service: true,
          token: verificationToken,
          token_expires_at: tokenExpiresAt.toISOString(),
          email_verified: false,
        }, { onConflict: 'email' })
      if (upsertError) {
        return NextResponse.json(
          { error: 'Failed to start registration.' },
          { status: 500 }
        )
      }
      // Send verification email
      try {
        await sendRegistrationEmail({
          to: email,
          verificationToken,
        })
      } catch (emailError) {
        // Don't fail registration if email fails
      }
      return NextResponse.json(
        { message: 'Verification email sent successfully.' },
        { status: 200 }
      )
    }

    // Step 2: Token verification (email + token)
    if (email && token && !password) {
      if (!validator.isEmail(email)) {
        return NextResponse.json(
          { error: 'Invalid email format.' },
          { status: 400 }
        )
      }

      if (!validator.isNumeric(token) || token.length !== 8) {
        return NextResponse.json(
          { error: 'Token must be exactly 8 digits.' },
          { status: 400 }
        )
      }
      const { data, error } = await supabaseAdmin
        .from('user_registration')
        .select('id, token, token_expires_at, email_verified')
        .eq('email', email)
        .single()
      if (error || !data) {
        return NextResponse.json(
          { error: 'Registration not found.' },
          { status: 400 }
        )
      }
      if (data.email_verified) {
        return NextResponse.json(
          { error: 'Email already verified.' },
          { status: 400 }
        )
      }
      if (data.token === null) {
        return NextResponse.json(
          { error: 'Token has already been used.' },
          { status: 400 }
        )
      }
      if (Number(token) !== data.token) {
        return NextResponse.json(
          { error: 'Invalid token.' },
          { status: 400 }
        )
      }
      const now = new Date()
      const expiresAt = new Date(data.token_expires_at + 'Z')
      if (expiresAt < now) {
        return NextResponse.json(
          { error: 'Token has expired.' },
          { status: 400 }
        )
      }

      // Mark email as verified and clear token
      const { error: updateError } = await supabaseAdmin
        .from('user_registration')
        .update({
          email_verified: true,
          token: null,
          token_expires_at: null,
        })
        .eq('id', data.id)
      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to verify email.' },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { message: 'Email verified successfully.' },
        { status: 200 }
      )
    }

    // Step 3: Set password (email + password)
    if (email && !token && password) {
      if (!validator.isEmail(email)) {
        return NextResponse.json(
          { error: 'Invalid email format.' },
          { status: 400 }
        )
      }
      if (!password || typeof password !== 'string') {
        return NextResponse.json(
          { error: 'Password is required.' },
          { status: 400 }
        )
      }
      // Check registration row
      const { data, error } = await supabaseAdmin
        .from('user_registration')
        .select('id, email_verified, password, supabase_user_id, application_id')
        .eq('email', email)
        .single()
      if (error || !data) {
        return NextResponse.json(
          { error: 'Registration not found.' },
          { status: 400 }
        )
      }
      if (!data.email_verified) {
        return NextResponse.json(
          { error: 'Email not verified.' },
          { status: 400 }
        )
      }
   
      const passwordHash = await bcrypt.hash(password, 10)
      let supabaseUserId = data.supabase_user_id
      if (!supabaseUserId) {
        // Create Supabase Auth user
        const { data: user, error: createErr } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true
        })
        if (createErr) {
          return NextResponse.json(
            { error: createErr.message },
            { status: 400 }
          )
        }
        supabaseUserId = user.user.id
      }
      // Update registration record
      const { error: updateError } = await supabaseAdmin
        .from('user_registration')
        .update({
          supabase_user_id: supabaseUserId,
          password: passwordHash,
        })
        .eq('id', data.id)
      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update registration.' },
          { status: 500 }
        )
      }
      // Send verification success email
      try {
        const { application_id } = data
        await sendWelcomeEmail({
          to: email,
          applicationId: application_id,
        })
      } catch (emailError) {
        // Do not fail registration if email fails
      }
      return NextResponse.json(
        { message: 'Registration complete. You can now log in.', 
        application_id: data.application_id },
        { status: 200 }
      )
    }

    // Invalid request
    return NextResponse.json(
      { error: 'Invalid request parameters.' },
      { status: 400 }
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
