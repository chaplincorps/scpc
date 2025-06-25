import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {sendVerificationEmail} from '@lib/email';

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

export async function POST(req){
   try{
      const { email, token } = await req.json()
      
      if(email && !token){
         const { data, error } = await supabaseAdmin
        .from('user_registration')
        .select('email_verified, id, oAuth')
        .eq('email', email)
        .single()

         if (error) {
            return NextResponse.json(
               { error: 'Email not found in our records.' },
               { status: 400 }
            )
         }

         if (!email || typeof email !== 'string'){
         return NextResponse.json(
            {error: 'Email is required'},
            { status: 400 }
         )
         }

         if (!validator.isEmail(email)){
         return NextResponse.json(
            { error: 'Invalid email format' },
            { status: 400 }
         )
         }

         if (data.email_verified) {
            return NextResponse.json(
               { error: 'Email is already verified.' },
               { status: 400 }
            )
         }

          if (data.oAuth) {
            return NextResponse.json(
               { error: 'Email verification not available for OAuth applicants' },
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

         await sendVerificationEmail({
         to: email,
         token
         })

         return NextResponse.json(
            { message: 'Verification email sent successfully.' },
            { status: 200 }
         )
      }

      if(email && token){
         if (!/^[0-9]{8}$/.test(token)) {
            return NextResponse.json(
               { error: 'Token must be exactly 8 digits.' },
               { status: 400 }
            )
         }

         const { data: row, error: fetchError } = await supabaseAdmin
        .from('user_registration')
        .select('id, token, token_expires_at, email_verified, plain_password')
        .eq('email', email)
        .single()

         if (fetchError) {
            return NextResponse.json(
               { error: 'Invalid verification attempt.' },
               { status: 400 }
            )
         }

         if (row.email_verified) {
            return NextResponse.json(
               { error: 'Email already verified.' },
               { status: 400 }
            )
         }

         if (row.token === null) {
            return NextResponse.json(
               { error: 'Token has been used.' },
               { status: 400 }
            )
         }

         if (Number(token) !== row.token) {
            return NextResponse.json(
               { error: 'Invalid token.' },
               { status: 400 }
            )
         }

         const now = new Date()
         const expiresAt = new Date(row.token_expires_at + 'Z')
         if (expiresAt < now) {
            return NextResponse.json(
               { error: 'Token has expired.' },
               { status: 400 }
            )
         }

         if (!row.plain_password) {
             return NextResponse.json({ 
               error: 'Cannot create auth account - password not found.'},
               { status: 400 })
         }

         const { data: user, error: createErr } = await supabaseAdmin.auth.admin.createUser({
            email,
            password: row.plain_password,
            email_confirm: true 
         });

         if (createErr) {
            return NextResponse.json({ 
               error: createErr.message}, 
               { status: 400 });
         }

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
         return NextResponse.json({ 
            error: 'Internal server error.' }, 
            { status: 500 })
         }

         return NextResponse.json(
            { message: 'Email verified successfully.' },
            { status: 200 }
         )
      }

      return NextResponse.json(
         { error: 'Invalid request parameters.' },
         { status: 400 }
      )
   }
   catch(err){
      console.error('Unexpected error in manual verify-email route:', err)
      return NextResponse.json(
         { error: 'An unexpected error occurred.' },
         { status: 500 }
      )
   }
}