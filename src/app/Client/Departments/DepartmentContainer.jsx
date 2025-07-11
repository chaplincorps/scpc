'use client'

import DepartMentSkeleton from "./DepartMentSkeleton"
import DepartmentView from "./DepartmentView"
import { useAuthStore } from "@/store/authStore"

export default function DepartmentContainer(){
     const loading = useAuthStore(state => state.loading)
     const initialized = useAuthStore(state => state.initialized)
     const authInitialized = initialized && !loading

     if(!authInitialized){
       return <DepartMentSkeleton />
     }

     return <DepartmentView />
}