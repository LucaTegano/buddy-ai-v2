"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // Prefixed: bg-primary, bg-input, border-ring, ring-ring
        "peer data-[state=checked]:bg-scn-primary data-[state=unchecked]:bg-scn-input focus-visible:border-scn-ring focus-visible:ring-scn-ring/50 dark:data-[state=unchecked]:bg-scn-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Prefixed: bg-background, bg-foreground, bg-primary-foreground
          "bg-scn-background dark:data-[state=unchecked]:bg-scn-foreground dark:data-[state=checked]:bg-scn-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }