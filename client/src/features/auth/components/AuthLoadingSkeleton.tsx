import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoadingSkeleton() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-primary p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Skeleton className="w-10 h-10 rounded-full mr-3" />
          <Skeleton className="h-8 w-32 rounded" />
        </div>

        <div className="bg-surface p-8 rounded-2xl shadow-lg shadow-border-subtle/50 dark:shadow-overlay/20">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 rounded-lg" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Skeleton className="h-5 w-5 rounded" />
                <div className="ml-2">
                  <Skeleton className="h-4 w-20 rounded" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            
            <Skeleton className="h-10 rounded-lg" />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-subtle"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <Skeleton className="h-4 w-8 rounded-full px-2"></Skeleton>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-10 rounded-lg" />
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Skeleton className="h-4 w-64 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
}