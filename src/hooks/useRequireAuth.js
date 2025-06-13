'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export default function useRequireAuth() {
  const { user, loading, initialized } = useAuthStore()

  useEffect(() => {
    // will handle showing the re-auth modal
    if (initialized && !loading && !user) {
      console.log('No authenticated user, modal will be shown')
    }
  }, [user, loading, initialized])

  return {
    isAuthenticated: !!user,
    isLoading: loading || !initialized,
    user
  }
}