import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import validator from 'validator'
import crypto from 'crypto'

const supabaseAdmin = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL,
   process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  }
)
export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate field types
    if (![name, email, subject, message].every(formField => typeof formField === "string")) {
      return NextResponse.json(
        { error: "Invalid input types." },
        { status: 400 }
      )
    }

    // Trim + length checks
    const cleanName = name.trim().slice(0, 100)
    const cleanEmail = email.trim().toLowerCase().slice(0, 150)
    const cleanSubject = subject.trim().slice(0, 150)
    const cleanMessage = message.trim().slice(0, 5000)

    // Field presence
    if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    // Email sanity
    if (!validator.isEmail(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      )
    }


    const timeThreshold = new Date(Date.now() - 5 * 60 * 1000) 
    const { data: recentMessages } = await supabaseAdmin
      .from("offline_support")
      .select('id')
      .eq('email', cleanEmail)
      .gte('created_at', timeThreshold.toISOString())
      .limit(1)

    if (recentMessages && recentMessages.length > 0) {
      return NextResponse.json(
        { error: "Please wait 5 minutes before sending another message." },
        { status: 429 }
      )
    }

    // Insert Data with content hash
    const { data, error } = await supabaseAdmin
      .from("offline_support")
      .insert([{
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      }])
      .select()

    if (error) {
      console.error("Insert error:", error)
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Thanks for reaching out!" }, 
      { status: 201 }
    )
    
  } catch (err) {
    console.error("Catch error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}