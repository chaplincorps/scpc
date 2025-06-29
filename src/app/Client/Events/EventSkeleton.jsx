'use client'

import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard(){
   return(
       <div className="flex flex-col gap-8 p-8 my-3 lg:flex-row">
        {/* Image Skeleton */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <Skeleton className="aspect-[4/3] lg:aspect-[3/2] rounded-xl w-full h-full bg-[#006699]" />
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          {/* Badge Skeleton */}
          <Skeleton className="w-32 h-6 rounded-full bg-[#006699]" />

          {/* Title Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 rounded-lg bg-[#006699]" />
            <Skeleton className="w-3/4 h-8 rounded-lg bg-[#006699]" />
          </div>

          {/* Meta Skeleton */}
          <div className="space-y-3">
            <Skeleton className="w-64 h-5 rounded bg-[#006699]" />
            <Skeleton className="h-5 w-80 rounded bg-[#006699]" />
          </div>

          {/* Description Skeleton */}
          <div className="pt-2 space-y-2">
            <Skeleton className="h-4 rounded bg-[#006699]" />
            <Skeleton className="h-4 rounded bg-[#006699]" />
            <Skeleton className="w-2/3 h-4 rounded bg-[#006699]" />
          </div>

          {/* Action Skeleton */}
          <div className="pt-6">
            <Skeleton className="w-40 h-5 rounded bg-[#006699]" />
          </div>
        </div>
      </div>
   )
}
export default function EventSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl">
         {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
         ))}
    </div>
  );
}