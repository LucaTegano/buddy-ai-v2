import { Skeleton } from "@/components/ui/skeleton";

export default function NoteDetailSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow min-h-0 bg-surface backdrop-blur-sm border border-border-subtle shadow-subtle">
        {/* Header skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        
        {/* Toolbar skeleton */}
        <div className="flex-shrink-0 p-3 border-b border-border-subtle">
          <div className="flex space-x-1">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <div className="w-px bg-border-subtle mx-2" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
        
        {/* Content area skeleton */}
        <div className="flex-grow p-4">
          <Skeleton className="h-6 w-3/4 mb-6" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        
        {/* Footer skeleton */}
        <div className="flex-shrink-0 p-4 border-t border-border-subtle">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}