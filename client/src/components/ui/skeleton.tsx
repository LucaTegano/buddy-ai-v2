import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      // Prefixed: bg-accent and rounded-md
      className={cn("bg-scn-accent animate-pulse rounded-scn-md", className)}
      {...props}
    />
  )
}

export { Skeleton }