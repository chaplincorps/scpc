'use client'

import OnboardingLoader from './OnboardingLoader'
import OnboardingView from './OnboardingView'
import { useAuthStore } from '@/store/authStore'

export default function ClientOnboardingPage() {

   const loading = useAuthStore(state => state.loading)
   const initialized = useAuthStore(state => state.initialized)
   const authInitialized = initialized && !loading

   if(!authInitialized) {
      return <OnboardingLoader />
   }

  return <OnboardingView />
}
