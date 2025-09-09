import { Skeleton } from "@/components/ui/skeleton";

export default function NotesLoadingSkeleton() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Render 6 skeleton cards as placeholders */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-64 snap-start bg-surface p-5 rounded-xl border border-border-subtle shadow-lg shadow-subtle"
          >
            <div className="flex items-center gap-4 mb-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-5 flex-1" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}