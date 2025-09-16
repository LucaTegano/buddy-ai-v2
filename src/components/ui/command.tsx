"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
//import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "max-h-[450px] bg-scn-popover text-scn-popover-foreground flex h-full w-full flex-col overflow-hidden p-3",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "overflow-hidden p-0 spotlight-backdrop sm:max-w-3xl",
          // ADDED: Make the dialog more rounded
          "rounded-2xl",
          // ADDED: Move the close button ('X') to the top right
          "[&>button]:top-7",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <Command
          className={cn(
            // Prefixed: text-muted-foreground -> text-scn-muted-foreground
            "[&_[cmdk-group-heading]]:text-scn-muted-foreground",
            // The rest of these are structural and don't need prefixes
            "**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          )}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      // Prefixed: border-border -> border-scn-border
      className="flex h-14 items-center gap-3 border-b border-scn-border/50 px-4"
    >
      {/* Prefixed: text-muted-foreground -> text-scn-muted-foreground */}
      {/* <SearchIcon className="size-5 shrink-0 text-scn-muted-foreground/70" /> */}
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          // Prefixed: placeholder, rounded-md
          "placeholder:text-scn-muted-foreground flex h-11 w-full rounded-scn-md bg-transparent py-3 text-base outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        // Prefixed: scrollbar-thumb-border -> scrollbar-thumb-scn-border
        "max-h-[700px] overflow-x-hidden overflow-y-auto overscroll-contain py-2 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-scn-border/30",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  // No theme classes to change here
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
  <CommandPrimitive.Group
    data-slot="command-group"
    className={cn(
      // Prefixed: text-foreground, text-muted-foreground
      "text-scn-foreground [&_[cmdk-group-heading]]:text-scn-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-medium spotlight-group-heading",
      className
    )}
    {...props}
  />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-scn-border -mx-1 h-px", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        // Prefixed: bg-accent, text-accent-foreground, text-muted-foreground, rounded-sm
        "data-[selected=true]:bg-scn-accent data-[selected=true]:text-scn-accent-foreground [&_svg:not([class*='text-'])]:text-scn-muted-foreground relative flex cursor-default items-center gap-2 rounded-scn-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 spotlight-item",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "text-scn-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}