'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useDashboardStore } from '@/store/dashboardStore'
import { toast } from 'react-hot-toast'

export default function DashboardLogic() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)
  
  // Auth store
  const { 
   user, 
   loading: authLoading, 
   initialized: authInitialized, 
   clearUser } = useAuthStore()
  
  // Dashboard store
  const { 
    dashboardData, 
    loading: dashboardLoading, 
    error: dashboardError,
    initialized: dashboardInitialized,
    fetchIfNeeded,
    clearDashboard,
    refreshDashboard 
  } = useDashboardStore()

  // Check authentication status
  const isAuthenticated = user && authInitialized && !authLoading

  // Handle authentication check
  useEffect(() => {
    if (!authInitialized) return

    if (!user && !authLoading) {
      console.log('No user found, redirecting to login')
      clearDashboard() // Clear dashboard data when user logs out
      router.replace('/Client/Login')
      return
    }

    setAuthChecked(true)
  }, [user, authInitialized, authLoading, router, clearDashboard])

  // Handle dashboard data fetching
  useEffect(() => {
    if (!authChecked || !isAuthenticated) return

    const handleDashboardData = async () => {
      try {
        // Always fetch fresh data when dashboard is loaded
        console.log('Fetching dashboard data...')
        await fetchIfNeeded()
      } 
      catch (error) {
        console.error('Dashboard fetch error:', error)
        if (error.response?.status === 401) {
          clearUser()
          clearDashboard()
          toast.error('Session expired. Please login again.')
          router.replace('/Client/Login')
        } else {
          toast.error('Failed to load dashboard data')
        }
      }
    }

    handleDashboardData()
  }, [authChecked, isAuthenticated, fetchIfNeeded, clearUser, clearDashboard, router])

  // Handle refresh action
  const handleRefresh = async () => {
    try {
      await refreshDashboard()
      toast.success('Dashboard refreshed successfully')
    } catch (error) {
      toast.error('Failed to refresh dashboard')
    }
  }

  // Loading states
  const isLoading = !authInitialized || authLoading || !authChecked || dashboardLoading

  return {
    user,
    dashboardData,
    handleRefresh,
    isLoading,
    dashboardError,
    isAuthenticated: isAuthenticated && authChecked
  }
}