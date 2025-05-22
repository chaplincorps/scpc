'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { toast } from 'react-hot-toast'


export default function AuthProvider({initialUser, initialError,  children }) {
   const setUser       = useAuthStore((s) => s.setUser)
   const setError       = useAuthStore((s) => s.setError)
   const setLoading    = useAuthStore((s) => s.setLoading)
   const setInitialized = useAuthStore((s) => s.setInitialized)
   const subscribeAuth = useAuthStore((s) => s.subscribeAuth)

   useEffect(() => {
      // 1) seed user into Zustand
      setUser(initialUser)
  
      // 2) if server-side error, surface it
      if (initialError) {
        setError(initialError)
        toast.error(`Auth Error: ${initialError}`)
      }
  
      // 3) Hydration is done
      setLoading(false)
      setInitialized(true)
  
      // 4) keep listening for sign-in/sign-out events
      const unsubscribe = subscribeAuth()
      return unsubscribe
    }, [
      initialUser,
      initialError,
      setUser,
      setError,
      setLoading,
      setInitialized,
      subscribeAuth,
    ])

  return children
}
