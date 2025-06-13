import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { handleApiError } from '@/lib/apiUtils'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Use getUser() instead of getSession() for server-side validation
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return handleApiError(userError || new Error('No user found'))
    }

    // Get user data from the database using the authenticated user's email
    const { data: userData, error: dbError } = await supabase
      .from('user_registration')
      .select('*')
      .eq('email', user.email)
      .single()

    if (dbError) {
      return handleApiError(dbError, 'Error fetching user data')
    }

    return NextResponse.json({
      user: userData,
      message: 'Dashboard data fetched successfully'
    })
    
  } catch (error) {
    return handleApiError(error, 'Unexpected error in dashboard route')
  }
}