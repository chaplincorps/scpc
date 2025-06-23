'use client'

import { useAuthStore } from "@/store/authStore"
import VerifyEmailSkelton from "./VerifyEmailSkeleton"
import VerifyEmailView from "./VerifyEmailView"

export default function VerifyEmailContainer(){
  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

  if(!authInitialized){
      return <VerifyEmailSkelton />
  }

  return <VerifyEmailView />
}