'use client'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function AuthProvider({ children }) {
  const fetchUser     = useAuthStore((s) => s.fetchUser)
  const subscribeAuth = useAuthStore((s) => s.subscribeAuth)

  useEffect(() => {
    // 1) Fetch the current session
    fetchUser()

    // 2) Listen for ongoing auth changes
    const unsubscribe = subscribeAuth()

    return unsubscribe
  }, [fetchUser, subscribeAuth])

  return children
}
