'use client'

import { Skeleton } from "@/components/ui/skeleton"

export default function SupportSkeleton()  {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-br from-[#006699] to-[#004d73] text-white py-16 md:py-24">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Skeleton className="w-12 h-12 mr-4 rounded-full bg-white/20" />
              <Skeleton className="h-12 w-96 bg-white/20" />
            </div>
            <Skeleton className="w-full h-6 max-w-2xl mx-auto mb-8 bg-white/20" />
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="w-40 h-12 rounded-xl bg-white/20" />
              <Skeleton className="w-40 h-12 rounded-xl bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="py-8 bg-white border-b border-gray-200">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-center md:justify-start">
                <Skeleton className="w-12 h-12 mr-4 rounded-full bg-[#006699]" />
                <div>
                  <Skeleton className="w-32 h-4 mb-2 bg-[#006699]" />
                  <Skeleton className="w-24 h-6 bg-[#006699]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container max-w-6xl px-4 py-12 mx-auto md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Skeleton */}
          <div className="lg:w-1/4">
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
              <div className="p-5 border-b border-gray-100">
                <Skeleton className="w-32 h-6 mb-2 bg-[#006699]" />
                <Skeleton className="w-24 h-4 bg-[#006699]" />
              </div>
              <div className="p-4 space-y-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i} className="flex items-center px-3 py-2">
                    <Skeleton className="w-5 h-5 mr-2 bg-[#006699]" />
                    <Skeleton className="w-24 h-4 bg-[#006699]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:w-3/4">
            {/* Category Header Skeleton */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <Skeleton className="w-10 h-10 mr-2 rounded-full bg-[#006699]" />
                <Skeleton className="w-48 h-8 bg-[#006699]" />
              </div>
              <Skeleton className="w-full h-4 max-w-md bg-[#006699]" />
            </div>

            {/* FAQ Section Skeleton */}
            <div className="mb-12">
              <Skeleton className="w-48 h-6 mb-4 bg-[#006699]" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-5 bg-white border border-gray-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Skeleton className="w-8 h-8 mr-3 rounded-full bg-[#006699]" />
                        <Skeleton className="w-64 h-5 bg-[#006699]" />
                      </div>
                      <Skeleton className="w-8 h-8 rounded-full bg-[#006699]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Section Skeleton */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="w-40 h-6 bg-[#006699]" />
                <Skeleton className="w-24 h-10 bg-[#006699]" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <Skeleton className="w-16 h-6 rounded bg-[#006699]" />
                      <Skeleton className="w-16 h-4 bg-[#006699]" />
                    </div>
                    <Skeleton className="w-full h-5 mb-2 bg-[#006699]" />
                    <Skeleton className="w-full h-4 mb-4 bg-[#006699]" />
                    <Skeleton className="w-20 h-4 bg-[#006699]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Skeleton */}
            <div className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl">
              <div className="p-6 border-b border-gray-100">
                <Skeleton className="w-32 h-6 mb-2 bg-[#006699]" />
                <Skeleton className="w-full h-4 max-w-md bg-[#006699]" />
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-10 rounded" />
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Skeleton className="h-12 rounded bg-[#006699]" />
                    <Skeleton className="h-12 rounded bg-[#006699]" />
                  </div>
                  <Skeleton className="h-12 rounded bg-[#006699]" />
                  <Skeleton className="h-32 rounded bg-[#006699]" />
                  <Skeleton className="w-full h-12 rounded bg-[#006699]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Support Options Skeleton */}
      <div className="py-16 border-t border-gray-200 bg-gray-50">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <Skeleton className="w-64 h-8 mx-auto mb-12 bg-[#006699]" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 text-center bg-white border border-gray-200 shadow-sm rounded-xl">
                <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#006699]" />
                <Skeleton className="w-32 h-6 mx-auto mb-2 bg-[#006699]" />
                <Skeleton className="w-full h-4 mb-6 bg-[#006699]" />
                <Skeleton className="w-full h-10 rounded bg-[#006699]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
