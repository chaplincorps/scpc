import {create} from 'zustand'
import { createBrowserClient } from '@supabase/ssr'

export const useAuthStore = create((set, get) => {
   const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
    

   return{
      user:null,
      loading:true,
      error:null,

      setUser: (user) => set({ user, error: null }),
      setError: (error) => set({ error }),

      fetchUser:async() =>{
         const { loading } = get()
         if (!loading) return

         set({ loading: true })

         // const start = Date.now()

         const { data, error } = await supabase.auth.getUser()
         if (error) {
            console.log("Fetching User Error",error);
            set({ user: null, error })
          }
          else {
            set({ user: data.user })
          }

         //  const elapsed = Date.now() - start
         //  const toWait  = Math.max(0, 5000 - elapsed)
         //  if (toWait > 0) await new Promise((r) => setTimeout(r, toWait))

          set({ loading: false })
      },

      subscribeAuth: () => {
         const { data: listener } = supabase.auth.onAuthStateChange(
           (_event, session) => set({ user: session?.user ?? null })
         )
         return () => listener.subscription?.unsubscribe()
       },
   
       signOut: async () => {
         await supabase.auth.signOut()
         set({ user: null })
       },
   }

})