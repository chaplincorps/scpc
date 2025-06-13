'use client'

import { useAuthStore } from "@/store/authStore"
import RegistrationSkeleton from "./RegistrationSkeleton"
import RegistrationView from "./RegistrationView"

export default function RegistrationContainer() {
  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

  if (!authInitialized) {
    return <RegistrationSkeleton />
  }

  return <RegistrationView />
} 