'use client'

import { useEffect, useState } from "react"
import { useAuthStore } from '@/store/authStore'
import { LoaderCircle } from 'lucide-react';


const LoadingScreen = () => {
   const [isMounted, setIsMounted] = useState(false)
   const loading = useAuthStore((s) => s.loading)

   useEffect(() => setIsMounted(true), [])
   if (!isMounted) return null
   
   if (!loading) return null

   return (
      <div className="flex flex-col items-center justify-center min-h-[calc(75vh-3.5rem)] mt-14.5 w-full">
         <LoaderCircle
           className="text-[#006699] animate-spin transition-all ease-in-out
                      w-8 h-8
                      sm:w-10 sm:h-10
                      md:w-12 md:h-12
                      lg:w-16 lg:h-16"
           strokeWidth={2}
         />
      </div>
   )
}

export default LoadingScreen