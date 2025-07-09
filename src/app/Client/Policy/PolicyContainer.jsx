'use client'

import { useAuthStore } from "@/store/authStore"
import PolicySkeleton from "./PolicySkeleton";
import PolicyView from "./PolicyView";

export default function TermsContainer(){

  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

  if(!authInitialized){
      return <PolicySkeleton />
  }

  return <PolicyView />
}
