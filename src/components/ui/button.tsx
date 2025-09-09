import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base classes for all buttons
  // Note the changes: rounded-md -> rounded-scn-md, ring -> scn-ring, etc.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-scn-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-scn-ring focus-visible:ring-scn-ring/50 focus-visible:ring-[3px] aria-invalid:ring-scn-destructive/20 dark:aria-invalid:ring-scn-destructive/40 aria-invalid:border-scn-destructive",
  {
    variants: {
      variant: {
        // Default variant using scn-prefixed colors
        default:
          "bg-scn-primary text-scn-primary-foreground shadow-xs hover:bg-scn-primary/90",
        // Destructive variant using scn-prefixed colors
        destructive:
          "bg-scn-destructive text-white shadow-xs hover:bg-scn-destructive/90 focus-visible:ring-scn-destructive/20 dark:focus-visible:ring-scn-destructive/40 dark:bg-scn-destructive/60",
        // Outline variant using scn-prefixed colors
        outline:
          "border border-scn-border bg-scn-background shadow-xs hover:bg-scn-accent hover:text-scn-accent-foreground dark:bg-scn-input/30 dark:border-scn-input dark:hover:bg-scn-input/50",
        // Secondary variant using scn-prefixed colors
        secondary:
          "bg-scn-secondary text-scn-secondary-foreground shadow-xs hover:bg-scn-secondary/80",
        // Ghost variant using scn-prefixed colors
        ghost:
          "hover:bg-scn-accent hover:text-scn-accent-foreground dark:hover:bg-scn-accent/50",
        // Link variant using scn-prefixed color
        link: "text-scn-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        // Small and large sizes also use the prefixed radius
        sm: "h-8 rounded-scn-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-scn-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }