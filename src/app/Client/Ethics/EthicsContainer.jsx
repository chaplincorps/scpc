'use client'

import EthicsSkeleton from "./EthicsSkeleton"
import EthicsView from "./EthicsView"
import { useAuthStore } from "@/store/authStore"

export default function EthicsContainer(){
     const loading = useAuthStore(state => state.loading)
     const initialized = useAuthStore(state => state.initialized)
     const authInitialized = initialized && !loading

     if(!authInitialized){
       return <EthicsSkeleton />
     }

     return <EthicsView />
}