"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader} from "@/components/ui/card"

export default function EthicsSkeleton(){
     return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-[#006699] text-white py-12">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <Skeleton className="w-16 h-16 mx-auto mb-4 bg-white/20" />
            <Skeleton className="h-12 mx-auto mb-4 w-96 bg-white/20" />
            <Skeleton className="h-6 w-[600px] mx-auto bg-white/20" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="container px-4 py-12 mx-auto">
        {/* Table of Contents Skeleton */}
        <Card className="mb-12 border-[#006699]/20">
          <CardHeader>
            <Skeleton className="w-48 h-6" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-full h-4" />
                ))}
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-full h-4" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections Skeleton */}
        {[1, 2, 3, 4, 5].map((section) => (
          <Card key={section} className="mb-12 border-[#006699]/20">
            <CardHeader>
              <Skeleton className="w-64 h-8" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />

              <div className="grid gap-4 mt-6 md:grid-cols-3">
                {[1, 2, 3].map((card) => (
                  <div key={card} className="p-4 rounded-lg bg-gray-50">
                    <Skeleton className="w-32 h-5 mb-2" />
                    <Skeleton className="w-full h-4 mb-1" />
                    <Skeleton className="w-3/4 h-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}
