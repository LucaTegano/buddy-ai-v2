import { Skeleton } from "@/components/ui/skeleton";

export default function MainLayoutSkeleton() {
  return (
    <div className="flex">
      {/* Sidebar Skeleton */}
      <div className="w-30 p-4 ">
        <Skeleton className="h-8 w-3/4 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
      {/* Main Content Skeleton */}
      <div className="flex-grow p-4">
        <div className="mb-8">
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="mb-10">
          <Skeleton className="h-6 w-1/4 mb-4" />
          <div className="flex space-x-4">
            <Skeleton className="h-40 w-64" />
            <Skeleton className="h-40 w-64" />
            <Skeleton className="h-40 w-64" />
          </div>
        </div>
        <div className="mb-10">
          <Skeleton className="h-6 w-1/4 mb-4" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="mb-10">
          <Skeleton className="h-6 w-1/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-1/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
