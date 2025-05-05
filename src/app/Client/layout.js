'use client'

import { useEffect } from 'react'
import LoadingScreen from '@/components/custom/LoadingScreen'
import { useAuthStore } from '@/store/authStore'
import NavigationView from '@client/Navigation/NavigationView';

export default function ClientRootLayout({ children }) {
   const { loading, fetchUser } = useAuthStore()

   useEffect(() => {
     fetchUser()
   }, [fetchUser])

  return (
    <NavigationView>
      {loading ? <LoadingScreen /> : children}
    </NavigationView>
  )
}
