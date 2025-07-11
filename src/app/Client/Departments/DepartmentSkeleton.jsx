'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader} from "@/components/ui/card"


export default function DepartmentSkeleton(){
    return (
      
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-[#006699] text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <Skeleton className="w-16 h-16 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-12 mx-auto mb-4 w-80 bg-white/20" />
            <Skeleton className="h-6 w-[600px] mx-auto bg-white/20" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="container px-4 py-12 mx-auto">
        {/* Toggleable Departments Skeleton */}
        <div className="mb-12 text-center">
          <Skeleton className="w-64 h-8 mx-auto mb-4 bg-[#006699]" />
          <Skeleton className="h-5 mx-auto w-96 bg-[#006699]" />
        </div>

        <div className="mb-16 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-[#006699]/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 bg-[#006699]" />
                    <div>
                      <Skeleton className="w-48 h-6 mb-2 bg-[#006699]" />
                      <Skeleton className="w-64 h-4 bg-[#006699]" />
                    </div>
                  </div>
                  <Skeleton className="w-5 h-5 bg-[#006699]" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Departments Grid Skeleton */}
        <div className="mb-12 text-center">
          <Skeleton className="w-64 h-8 mx-auto mb-4 bg-[#006699]" />
          <Skeleton className="h-5 mx-auto w-96 bg-[#006699]" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="border-[#006699]/20">
              <CardHeader className="pb-4 text-center">
                <Skeleton className="w-32 h-32 mx-auto mb-4 bg-[#006699]" />
                <Skeleton className="w-32 h-6 mx-auto bg-[#006699]" />
              </CardHeader>
              <CardContent className="text-center">
                <Skeleton className="w-full h-4 mb-2 bg-[#006699]" />
                <Skeleton className="w-3/4 h-4 mx-auto mb-4 bg-[#006699]" />
                <Skeleton className="w-24 h-6 mx-auto bg-[#006699]" />
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )

}