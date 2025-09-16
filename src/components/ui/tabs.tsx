"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

// --- No changes needed for the root component ---
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
))
Tabs.displayName = TabsPrimitive.Root.displayName

// --- TabsList is styled to look like the NoteCard container ---
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Core layout: similar to the original, but using `w-full` or `w-fit` is a design choice.
      "inline-flex h-auto items-center justify-start rounded-xl p-1.5",
      // Styling from NoteCard:
      // - `bg-surface` -> bg-card (assuming standard shadcn/ui theme variable)
      // - `border border-border-subtle` -> border
      // - `shadow-lg shadow-subtle` -> shadow-lg
      "bg-card border shadow-lg",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// --- TabsTrigger is styled to be the interactive element inside the "card" ---
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Core layout & typography
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-bold transition-all",
      // Focus styles for accessibility
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
      // Disabled state
      "disabled:pointer-events-none disabled:opacity-50",
      // Default (inactive) state: subtle text color
      "text-muted-foreground",
      // Active state: This is where we apply the "brand" colors from NoteCard
      // - `group-hover:text-brand-primary` -> active tab gets the primary color
      // - `shadow-lg` on the card -> active tab gets a smaller shadow to "lift" it
      "data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-md",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// --- TabsContent can have some margin-top to space it from the new, larger TabsList ---
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }