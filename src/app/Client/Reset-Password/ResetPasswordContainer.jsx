'use client'

import { useAuthStore } from "@/store/authStore"
import ResetPasswordSkeleton from "./ResetPasswordSkeleton"
import ResetPasswordView from "./ResetPasswordView"

export default function ResetPasswordContainer(){

  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

  if(!authInitialized){
      return <ResetPasswordSkeleton />
  }

  return <ResetPasswordView />
}