'use client'

import { useEffect, useState } from "react"
import { useAuthStore } from '@/store/authStore'
import Image from "next/image"
import Logo from '@images/Logo3.png'
const LoadingScreen = () => {
   const [isMounted, setIsMounted] = useState(false)
   const loading = useAuthStore((s) => s.loading)

   useEffect(() => setIsMounted(true), [])
   if (!isMounted) return null
   
  if (!loading) return null

   return (
      <div className="w-full h-screen fixed inset-0 flex items-center justify-center bg-[#006699] z-50">
      {/* <div className="fixed inset-0 flex items-center justify-center bg-[#006699] z-50"> */}
          <div className="w-4/10 max-w-[40%] md:max-w-[30%] lg:max-w-[20%] animate-heartbeat">
            <Image
               src={Logo}
               alt="Logo"
               width={400}
               height={400}
               className="bg-[#006699] w-full h-auto"
               priority 
            />
         </div>
      </div>
    )
}

export default LoadingScreen