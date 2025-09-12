import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoadingSkeleton() {
  return (
    <div className="">
      {/* Header */}
      <div className="mb-1">
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>

      {/* Recent Notes Carousel */}
      <div className="mb-10 max-w-5xl">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="flex space-x-4">
          <Skeleton className="w-64  p-5 rounded-xl  shadow-subtle h-[140px]" />
          <Skeleton className="w-64   p-5 rounded-xl  shadow-lg  h-[140px]" />
          <Skeleton className="w-64 p-5 rounded-xl  shadow-lg shadow-subtle h-[140px]" />
        </div>
      </div>

      {/* Collaborative Projects */}
      <div className="mb-10">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-24 w-full rounded-xl h-[200px]" />
      </div>

      {/* Personal Tasks */}
      <div className="mb-10">
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Group Tasks */}
      <div>
        <Skeleton className="h-6 w-1/4 mb-4" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
