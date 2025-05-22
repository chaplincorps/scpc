// /store/authStore.js
import { create } from 'zustand'
import { createBrowserClient } from '@supabase/ssr'

// Initialize Supabase client once
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  initialized: false,       
  error: null,

  // Actions
  setUser: (user) => set({ user, error: null }),
  setLoading: (loading) => set({ loading }),
  setInitialized: (initialized) => set({ initialized }),
  setError: (error) => set({ error }),

  // Optional: client-side re-fetch
  fetchUser: async () => {
   const { loading } = get()
   if (loading) return

   set({ loading: true })
   const { data, error } = await supabase.auth.getUser()
   if (error) {
     console.error('Fetching User Error', error)
     set({ user: null, error })
   } else {
     set({ user: data.user, error: null })
   }
   set({ loading: false })
 },
 

  // Subscribe to auth changes
  subscribeAuth: () => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => set({ user: session?.user ?? null })
    )
    return () => listener.subscription?.unsubscribe()
  },

  // Sign out
  signOut: async () => {
    await supabase.auth.signOut()
    set({ user: null })
  }
}))
