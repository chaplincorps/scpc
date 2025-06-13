'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardSkeleton() {
  return (
   <div
      className="relative p-4 bg-gradient-to-br from-gray-50 to-blue-50 md:p-6"
      style={{ height: "calc(100vh - 49px)" }}
    >
      {/* Background Dashboard Skeleton - Dimmed */}
      <div className="mx-auto max-w-7xl opacity-30">
        {/* Application ID Section Skeleton */}
        <div className="bg-[#006699] text-white rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              {/* Title skeleton */}
              <Skeleton className="h-8 md:h-10 bg-[#006699] bg-opacity-40 mb-2 w-3/4" />
              {/* Subtitle skeleton */}
              <Skeleton className="h-5 md:h-6 bg-[#006699] bg-opacity-30 w-5/6" />
            </div>
            <div className="bg-[#006699] bg-opacity-30 backdrop-blur-sm rounded-lg p-4 text-center md:text-right">
              {/* Application ID label skeleton */}
              <Skeleton className="h-4 bg-[#006699] bg-opacity-40 mb-1 w-24 mx-auto md:mx-0" />
              {/* Application ID value skeleton */}
              <Skeleton className="h-6 md:h-7 bg-[#006699] bg-opacity-50 w-36 mx-auto md:mx-0" />
            </div>
          </div>
        </div>

        {/* Progress Overview Section Skeleton */}
        <div className="p-6 mb-8 bg-white border border-gray-200 shadow-lg rounded-xl md:p-8">
          {/* Header with title and refresh button */}
          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="w-48 h-7" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-24 h-9" />
            </div>
          </div>

          {/* Progress Bar Skeleton */}
          <div className="w-full h-3 mb-6 bg-gray-200 rounded-full">
            <Skeleton className="bg-[#006699] bg-opacity-40 h-3 rounded-full w-1/7" />
          </div>

          {/* Statistics Cards Skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[#006699] bg-opacity-5 rounded-xl border border-[#006699] border-opacity-20"
              >
                <Skeleton className="w-12 h-12 mx-auto mb-2 rounded-full" />
                <Skeleton className={`h-4 mx-auto ${index === 0 ? "w-24" : index === 1 ? "w-20" : "w-28"}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="bg-white border-2 border-[#006699] border-opacity-20 rounded-xl shadow-md p-6">
              {/* Header with icon, step number, and status badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="flex-shrink-0 rounded-full w-11 h-11" />
                  <div className="bg-[#006699] bg-opacity-10 rounded-full px-2 py-1">
                    <Skeleton className="w-12 h-4" />
                  </div>
                </div>
                <div className="bg-[#006699] bg-opacity-10 rounded-full px-3 py-1">
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>

              {/* Title skeleton */}
              <div className="mb-3">
                <Skeleton className="w-3/4 h-6" />
              </div>

              {/* Description skeleton */}
              <div className="mb-4 space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-5/6 h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>

              {/* Action area skeleton */}
              <div className="bg-[#006699] bg-opacity-5 p-2 rounded-lg">
                <Skeleton className="w-32 h-3" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
} 