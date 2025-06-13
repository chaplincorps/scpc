'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useDashboardStore } from '@/store/dashboardStore'
import { toast } from 'react-hot-toast'

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const signOut = useAuthStore(state => state.signOut)
  const clearDashboard = useDashboardStore(state => state.clearDashboard)

  // Reset isLoggingOut when we reach the login page
  useEffect(() => {
    if (isLoggingOut && pathname === '/Client/Login') {
      setIsLoggingOut(false)
    }
  }, [pathname, isLoggingOut])

  const logout = async (redirectTo = '/Client/Login') => {
    if (isLoggingOut) return 
    
    // Ensure redirectTo is a valid string path
    const loginPath = typeof redirectTo === 'string' && redirectTo.startsWith('/') 
      ? redirectTo 
      : '/Client/Login'
    
    setIsLoggingOut(true)
    
    try {
      // Clear dashboard data first
      clearDashboard()
      
      // Then sign out
      await signOut()
      
      // Navigate to login page using validated path
      router.replace(loginPath)

    } catch (error) {
      console.error('Logout failed:', error)
      toast.error('Logout failed. Please try again.')
      setIsLoggingOut(false)
    }
  }

  return { logout, isLoggingOut }
}