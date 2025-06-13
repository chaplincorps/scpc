import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { sendRegistrationEmail } from '@/lib/email'

// Initialize admin client to bypass RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

function generateAppId() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateToken() {
  // Generate 8 random digits using Web Crypto API
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0].toString().padStart(8, '0').slice(0, 8)
}

export async function POST(req) {
  const cookieStore = await cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore,
  });

  const { email, password, terms_of_service } = await req.json();

  // Validate required fields
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 });
  }

  if (terms_of_service !== true) {
    return NextResponse.json(
      { error: 'You must accept the Terms of Service.' },
      { status: 400 }
    );
  }

  try {
    // Check if email already exists in user_registration table
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('user_registration')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { 
      console.error('Error checking email:', checkError);
      return NextResponse.json(
        { error: 'Error checking email existence.' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    let application_id;
    let exists = true;

    for (let i = 0; i < 5 && exists; i++) {
      const candidate = `SCPC${generateAppId()}`;
      // Check if it exists
      const { data: rows, error: fetchError } = await supabase
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
      return NextResponse.json(
        { error: 'Could not generate unique application ID.' },
        { status: 500 }
      );
    }

    // Generate token and set expiration to 5 minutes from now
    const token = generateToken()
    const tokenExpiresAt = new Date()
    tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 5)

    // Insert all required fields into user_registration using admin client to bypass RLS
    const { error: insertError } = await supabaseAdmin
      .from('user_registration')
      .insert({
        application_id,
        email,
        password: passwordHash,
        plain_password: password, 
        terms_of_service: true,
        token,
        token_expires_at: tokenExpiresAt.toISOString()
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      // Optional: roll back the Auth user
      await supabase.auth.admin.deleteUser(userId);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    // Send verification email
    try {
      await sendRegistrationEmail({
        to: email,
        verificationToken: token,
      });
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      {
        message: 'Registration successful!.',
        application_id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
