'use client'

import { useAuthStore } from "@/store/authStore"
import TermsSkeleton from "./TermsSkeleton";
import TermsView from "./TermsView";

export default function TermsContainer(){

  const loading = useAuthStore(state => state.loading)
  const initialized = useAuthStore(state => state.initialized)
  const authInitialized = initialized && !loading

  if(!authInitialized){
      return <TermsSkeleton />
  }

  return <TermsView />
}
