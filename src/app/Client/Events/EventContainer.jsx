'use client'

import EventSkeleton from "./EventSkeleton"
import EventView from "./EventView"
import { useAuthStore } from "@/store/authStore"

export default function EventContainer(){
     const loading = useAuthStore(state => state.loading)
     const initialized = useAuthStore(state => state.initialized)
     const authInitialized = initialized && !loading

     if(!authInitialized){
       return <EventSkeleton />
     }

     return <EventView />
}