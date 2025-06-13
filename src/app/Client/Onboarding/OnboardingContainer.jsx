'use client'

import OnboardingSkeleton from './OnboardingSkeleton'
import OnboardingView from './OnboardingView'
import { useAuthStore } from '@/store/authStore'


export default function OnboardingContainer() {
  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

   if(!authInitialized) {
      return <OnboardingSkeleton />
   }

  return <OnboardingView />
}
