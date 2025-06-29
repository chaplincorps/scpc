'use client'

import GalleryView from "./GalleryView"
import GallerySkeleton from "./GallerySkeleton"
import { useAuthStore } from "@/store/authStore"

export default function GalleryContainer(){
     const loading = useAuthStore(state => state.loading)
     const initialized = useAuthStore(state => state.initialized)
     const authInitialized = initialized && !loading

     if(!authInitialized){
         return < GallerySkeleton />
     }

     return <GalleryView />
}