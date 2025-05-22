import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getUserFromCookie() {
  const cookieStore = await cookies()

  // create a server-side Supabase client that reads from those cookies
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    //if user is not logged in yet
    console.log('Error fetching user in getUserFromCookie()', error)
    return { user: null, error: error.message }
  }

  return { user: data.user, error: null }
}
