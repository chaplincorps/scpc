'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuthStore } from '@/store/authStore'
import { CLIENT_ENDPOINTS } from '@/config/apiEndpoints'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export function useReAuthenticate() {
  const [isReAuthenticating, setIsReAuthenticating] = useState(false)
  const { setUser, clearUser } = useAuthStore()

  const reAuthenticate = async (applicationId, password) => {
    setIsReAuthenticating(true)

    try {
      // Call the same login endpoint used in LoginLogic
      const response = await axios.post(CLIENT_ENDPOINTS.AUTH.LOGIN, {
        application_id: applicationId,
        password: password
      })
      
      if (response.status === 200) {
        // Create Supabase client
        const supabase = createClientComponentClient()
        
        if (response.data.session) {
          try {
            // Set the session from the server response
            const { error } = await supabase.auth.setSession({
              access_token: response.data.session.access_token,
              refresh_token: response.data.session.refresh_token
            })
            
            if (error) {
              console.error('Session setup failed:', error)
              toast.error('Failed to restore session')
              return false
            }
          } catch (sessionError) {
            console.error('Session setup error:', sessionError)
            return false
          }
        }
        
        // Update store with user data
        setUser(response.data.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Re-authentication error:', error)
      clearUser()
      return false
    } finally {
      setIsReAuthenticating(false)
    }
  }

  return {
    reAuthenticate,
    isReAuthenticating
  }
} 