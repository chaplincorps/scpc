'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function LoginSkeleton() {
   return (
      <div className="flex min-h-[calc(100vh-49px)] lg:flex-row">
         {/* Left Side - Login Form Skeleton */}
         <div className="w-full lg:w-[50%] bg-white flex items-center justify-center p-2">
            <Card className="w-full shadow-lg bg-[#006699]">
               <CardHeader className="space-y-1">
                  <Skeleton className="w-48 h-8 mx-auto" />
                  <Skeleton className="w-64 h-4 mx-auto" />
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     {/* Application ID Field Skeleton */}
                     <div className="space-y-2">
                        <Skeleton className="w-full h-10" />
                     </div>
                     
                     {/* Password Field Skeleton */}
                     <div className="space-y-2">
                        <Skeleton className="w-full h-10" />
                     </div>

                     {/* Forgot Password Link Skeleton */}
                     <div className="flex justify-end">
                        <Skeleton className="w-32 h-4" />
                     </div>

                     {/* Login Button Skeleton */}
                     <Skeleton className="w-full h-12" />

                     {/* Divider with Text Skeleton */}
                     <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                           <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                           <Skeleton className="w-24 h-4" />
                        </div>
                     </div>

                     {/* Social Login Buttons Skeleton */}
                     <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="w-full h-12" />
                        <Skeleton className="w-full h-12" />
                     </div>
                  </div>
               </CardContent>
               
              
            </Card>
         </div>

         {/* Right Side - Branding Panel Skeleton */}
         <div className="hidden lg:flex lg:w-[50%] bg-[#006699] relative inset-0 items-center justify-center">
            <div className="absolute inset-0 bg-[#006699]/70 z-10"></div>
            
            <div className="relative z-20 flex flex-col items-center justify-between w-full h-full px-2 py-10">
               {/* Title Skeleton */}
               <div className='w-[80%] py-5 px-2 bg-[#ffffff]/20 rounded-md'>
                  <Skeleton className="w-48 h-6 mx-auto" />
               </div>

               {/* Middle Content Skeleton */}
               <div className='w-[65%] py-5 px-2 bg-[#ffffff]/20 rounded-md'>
                  <Skeleton className="w-10 h-10 mx-auto mb-4" />
                  <Skeleton className="w-64 h-6 mx-auto mb-4" />
                  <Skeleton className="w-48 h-4 mx-auto" />
               </div>

               {/* Quote Skeleton */}
               <div className='w-[80%] py-5 px-2 bg-[#ffffff]/20 rounded-md'>
                  <Skeleton className="w-32 h-4 mx-auto" />
               </div>
            </div>
         </div>
      </div>
   )
} 