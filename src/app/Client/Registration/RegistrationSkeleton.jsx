 'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function RegistrationSkeleton() {
   return (
      <div className="flex min-h-[calc(100vh-49px)] lg:flex-row">
         {/* Left Side - Registration Form Skeleton */}
         <div className="w-full lg:w-[50%] bg-white flex items-center justify-center p-2">
            <Card className="w-full p-2 bg-[#006699]">
               <CardHeader className="space-y-1">
                  <Skeleton className="w-48 h-8 mx-auto" />
                  <Skeleton className="w-64 h-4 mx-auto" />
               </CardHeader>

               {/* Tabs Skeleton */}
               <Tabs defaultValue="register" className="w-full">
                  <TabsList className="grid w-full h-10 grid-cols-3 justify-between rounded bg-[#006699]/60 -mb-5">
                     <TabsTrigger value="register" className="data-[state=active]:bg-[#006699] data-[state=active]:shadow-none rounded text-white">
                        <Skeleton className="w-16 h-4" />
                     </TabsTrigger>
                     <TabsTrigger value="verification" className="data-[state=active]:bg-[#006699] data-[state=active]:shadow-none rounded text-white">
                        <Skeleton className="w-16 h-4" />
                     </TabsTrigger>
                     <TabsTrigger value="complete" className="data-[state=active]:bg-[#006699] data-[state=active]:shadow-none rounded text-white">
                        <Skeleton className="w-16 h-4" />
                     </TabsTrigger>
                  </TabsList>
               </Tabs>

               <CardContent className="px-6 py-2 lg:px-3 lg:py-6">
                  {/* Step Indicator Skeleton */}
                  <div className="p-4 mt-4 lg:mt-0 mb-3 border border-[#006699]/10 rounded-md bg-[#006699]/5">
                     <Skeleton className="w-full h-16" />
                  </div>

                  <div className="space-y-4">
                     {/* Email Field Skeleton */}
                     <div className="space-y-2">
                        <Skeleton className="w-full h-10" />
                     </div>
                     
                     {/* Password Field Skeleton */}
                     <div className="space-y-2">
                        <Skeleton className="w-full h-10" />
                     </div>

                     {/* Confirm Password Field Skeleton */}
                     <div className="space-y-2">
                        <Skeleton className="w-full h-10" />
                     </div>

                     {/* Terms and Conditions Skeleton */}
                     <div className="flex space-x-2 items-top">
                        <Skeleton className="w-4 h-4 mt-1" />
                        <div className="space-y-2">
                           <Skeleton className="w-48 h-4" />
                           <Skeleton className="w-64 h-4" />
                        </div>
                     </div>

                     {/* Register Button Skeleton */}
                     <Skeleton className="w-full h-12" />

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