import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendPasswordResetEmail } from '@lib/email'
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

function generateToken() {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0].toString().padStart(8, '0').slice(0, 8)
}

export async function POST(req) {
  try {
    const { email, token, password } = await req.json()
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('user_registration')
      .select('id, oAuth, password, token, token_expires_at, supabase_user_id')
      .eq('email', email)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Email not found in our records.' },
        { status: 400 }
      )
    }

    // FLOW 1: Request password reset (email only)
    if (email && !token && !password) {
      if (data.oAuth) {
        return NextResponse.json(
          { error: 'Password reset unavailable for social registered account' },
          { status: 400 }
        )
      }

      const token = generateToken()
      const tokenExpiresAt = new Date()
      tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 5)

      const { error: updateError } = await supabaseAdmin
        .from('user_registration')
        .update({
          token,
          token_expires_at: tokenExpiresAt.toISOString()
        })
        .eq('email', email)

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to generate verification token.' },
          { status: 500 }
        )
      }

      await sendPasswordResetEmail({
        to: email,
        verificationToken: token
      })

      return NextResponse.json(
        { message: 'Verification email sent successfully.' },
        { status: 200 }
      )
    }

    // FLOW 2: Verify token (email + token only)
    if (email && token && !password) {
      if (!validator.isNumeric(token) || token.length !== 8) {
        return NextResponse.json(
          { error: 'Token must be exactly 8 digits.' },
          { status: 400 }
        )
      }

      if (data.token === null) {
        return NextResponse.json(
          { error: 'Token has been used.' },
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

      // Clear the token after successful verification since it's single-use
      const { error: clearTokenError } = await supabaseAdmin
        .from('user_registration')
        .update({
          token: null,
          token_expires_at: null
        })
        .eq('email', email)

      if (clearTokenError) {
        return NextResponse.json(
          { error: 'Failed to process verification.' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { message: 'Email verified successfully.' },
        { status: 200 }
      )
    }

    // FLOW 3: Reset password (email + password only)
    if (email && !token && password) {
      if (!password || typeof password !== 'string') {
        return NextResponse.json(
          { error: 'Password is required' },
          { status: 400 }
        )
      }

      // Check if new password is different from current password
      if (data.password && await bcrypt.compare(password, data.password)) {
        return NextResponse.json(
          { error: 'Old password and new password must be different' },
          { status: 400 }
        )
      }

      const passwordHash = await bcrypt.hash(password, 10)

      // Create or update Supabase Auth user
      let supabaseUserId = data.supabase_user_id

      if (!supabaseUserId) {
        // Create new user in Supabase Auth
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
      else {
        // Update existing Supabase Auth user password
        const { error: updateAuthError } = await supabaseAdmin.auth.admin.updateUserById(
          supabaseUserId,
          { password }
        )

        if (updateAuthError) {
          return NextResponse.json(
            { error: 'Failed to update password in authentication system' },
            { status: 500 }
          )
        }
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
        console.error('Error updating registration row:', updateError)
        return NextResponse.json(
          { error: 'Internal server error.' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { message: 'Password reset successfully.' },
        { status: 200 }
      )
    }

    // Invalid request combination
    return NextResponse.json(
      { error: 'Invalid request parameters.' },
      { status: 400 }
    )

  } catch (err) {
    console.error('Unexpected error in password reset route:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}