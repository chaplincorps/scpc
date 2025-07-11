'use client'

import AboutSkeleton from './AboutSkeleton'
import AboutView from './AboutView'
import { useAuthStore } from '@/store/authStore'


export default function OnboardingContainer() {
  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

   if(!authInitialized) {
      return <AboutSkeleton />
   }

  return <AboutView />
}
