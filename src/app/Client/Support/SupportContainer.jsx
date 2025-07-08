'use client'

import { useAuthStore } from "@/store/authStore"
import SupportSkeleton from "./SupportSkeleton";
import SupportView from "./SupportView";

export default function SupportContainer(){

  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

  if(!authInitialized){
      return <SupportSkeleton />
  }

  return <SupportView />
}