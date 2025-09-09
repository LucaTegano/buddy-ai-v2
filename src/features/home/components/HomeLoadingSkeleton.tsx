import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoadingSkeleton() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Recent Notes Carousel */}
      <div className="mb-10">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="flex space-x-4">
          <Skeleton className="h-40 w-64" />
          <Skeleton className="h-40 w-64" />
          <Skeleton className="h-40 w-64" />
        </div>
      </div>

      {/* Collaborative Projects */}
      <div className="mb-10">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>

      {/* Personal Tasks */}
      <div className="mb-10">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Group Tasks */}
      <div>
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
