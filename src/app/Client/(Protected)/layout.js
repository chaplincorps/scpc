'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useLogout } from '@/hooks/useLogout'
import { useReAuthenticate } from '@/hooks/useReAuthenticate'
import { SessionExpiredModal } from '@/components/custom/SessionExpiredModal'
import { useRouter } from 'next/navigation'

export default function ProtectedLayout({ children }) {
  const [showSessionModal, setShowSessionModal] = useState(false)
  const { user, loading, initialized } = useAuthStore()
  const { logout } = useLogout()
  const { reAuthenticate } = useReAuthenticate()
  const router = useRouter()

  useEffect(() => {
    // Show modal if we're done loading and there's no user
    if (initialized && !loading && !user) {
      setShowSessionModal(true)
    } else {
      setShowSessionModal(false)
    }
  }, [user, loading, initialized])

  const handleAuthenticate = async (applicationId, password) => {
    const success = await reAuthenticate(applicationId, password)
    if (success) {
      setShowSessionModal(false)
      // Refresh the current page to ensure data is reloaded
      router.refresh()
      return true
    }
    return false
  }

  const handleLogout = () => {
    setShowSessionModal(false)
    logout()
  }

  // Show nothing while loading or not initialized
  if (loading || !initialized) {
    return null
  }

  return (
    <>
      {children}
      {showSessionModal && (
        <SessionExpiredModal 
          onAuthenticate={handleAuthenticate}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}
