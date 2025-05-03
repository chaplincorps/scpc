'use client'

import { useEffect } from 'react'
import LoadingScreen from '@/components/custom/LoadingScreen'
import { useAuthStore } from '@/store/authStore'
import { Toaster } from 'react-hot-toast';

import NavigationView from '@client/Navigation/NavigationView';

export default function ClientRootLayout({ children }) {

   const { loading, fetchUser } = useAuthStore()

   useEffect(() => {
     fetchUser()
   }, [])

   if (loading) {
      return <LoadingScreen />
    }

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: '#000000',
            color: '#FFFFFF',
            fontFamily: 'Inter400',
            fontSize: '12px',
          },
          duration: 5000,
          position: 'top-right',
        }}
      />
      <NavigationView />
      <main>
        {children}
      </main>
    </>
  )
   
}
