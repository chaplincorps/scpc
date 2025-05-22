import { Skeleton } from "@/components/ui/skeleton"

export default function OnboardingLoader() {
  return (
    <div className="mt-5 flex min-h-screen flex-col bg-white overflow-hidden">
      <main className="flex-1">
        {/* Hero Section Skeleton */}
        <section className="relative min-h-screen flex items-center bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Skeleton className="h-6 w-40 rounded-full bg-[#006699]" />
                <Skeleton className="h-4 w-full max-w-md bg-[#006699]"  />
                <Skeleton className="h-4 w-1/2 max-w-xs bg-[#006699]" />
                <Skeleton className="h-4 w-full max-w-md bg-[#006699]"  />
                <Skeleton className="h-4 w-3/4 max-w-sm bg-[#006699]" />
                <Skeleton className="h-4 w-1/2 max-w-xs bg-[#006699]" />
                <Skeleton className="h-4 w-full max-w-md bg-[#006699]" />
                <div className="flex flex-wrap gap-5 pt-4">
                  <Skeleton className="h-10 w-40 rounded-full bg-[#006699]" />
                  <Skeleton className="h-10 w-40 rounded-full bg-[#006699]" />
                </div>
              </div>
              <div className="relative">
                <Skeleton className="aspect-square max-w-md mx-auto lg:max-w-none rounded-3xl bg-[#006699]" />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
