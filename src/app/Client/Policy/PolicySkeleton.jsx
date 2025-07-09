"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function PolicySkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="py-16 bg-[#006699]">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="w-3/4 h-12 mx-auto mb-4" />
            <Skeleton className="w-1/2 h-6 mx-auto mb-8" />
            <Skeleton className="w-48 h-12 mx-auto" />
          </div>
        </div>
      </div>

      {/* Quick Reference Skeleton */}
      <div className="py-6 bg-white border-b border-gray-200">
        <div className="container max-w-6xl px-4 mx-auto md:px-6">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="w-48 h-6 mb-4 bg-[#006699]" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="w-10 h-10 p-2 mr-3 rounded-full bg-[#006699]" />
                  <div className="flex-1">
                    <Skeleton className="w-20 h-4 mb-2 bg-[#006699]" />
                    <Skeleton className="w-32 h-3 bg-[#006699]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container max-w-6xl px-4 py-12 mx-auto md:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Skeleton */}
          <div className="lg:w-1/4">
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
              <div className="p-5 bg-gray-100 border-b border-gray-100">
                <Skeleton className="w-32 h-5 mb-2 bg-[#006699]" />
                <Skeleton className="w-48 h-3 bg-[#006699]" />
              </div>
              <div className="p-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <Skeleton key={i} className="h-8 mb-2 bg-[#006699]" />
                ))}
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:w-3/4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-6 mb-8 bg-white shadow-sm rounded-xl">
                <Skeleton className="w-64 h-6 mb-4 bg-[#006699]" />
                <div className="space-y-2">
                  <Skeleton className="w-full h-4 bg-[#006699]" />
                  <Skeleton className="w-5/6 h-4 bg-[#006699]" />
                  <Skeleton className="w-4/6 h-4 bg-[#006699]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}