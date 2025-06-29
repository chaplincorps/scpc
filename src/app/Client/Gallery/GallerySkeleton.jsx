import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard(){
   return(
   <div className="overflow-hidden bg-white rounded-lg shadow-sm">
      <Skeleton className="bg-[#006699] aspect-[3/2] w-full" />
      <div className="p-3">
        <Skeleton className="bg-[#006699] w-1/2 h-4 " />
      </div>
   </div>
   )
}

export default function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
   </div>
  );
}