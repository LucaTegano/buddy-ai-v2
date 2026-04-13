"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon, CommandIcon, CornerDownLeftIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogOverlay,
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
        "flex h-full w-full flex-col overflow-hidden bg-transparent text-scn-foreground",
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
  showCloseButton = false, // Usually hidden for spotlight-style palettes
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
          "fixed top-[20%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] sm:max-w-2xl",
          "overflow-hidden border border-white/10 p-0 shadow-2xl transition-all duration-300",
          "bg-scn-background/80 backdrop-blur-2xl dark:bg-black/80",
          "rounded-[2.5rem] ring-1 ring-black/5 dark:ring-white/10",
          "animate-in fade-in zoom-in-95 slide-in-from-top-4",
          className
        )}
        showCloseButton={showCloseButton}
      >
        <Command
          className="[&_[cmdk-group-heading]]:text-scn-muted-foreground/50 [&_[cmdk-group-heading]]:px-6 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:uppercase"
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
      className="flex h-16 items-center border-b border-scn-border/30 px-6 gap-3"
    >
      <SearchIcon className="size-5 shrink-0 text-scn-muted-foreground/40" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-full w-full bg-transparent py-3 text-lg outline-hidden placeholder:text-scn-muted-foreground/30 disabled:cursor-not-allowed disabled:opacity-50",
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
        "max-h-[500px] overflow-x-hidden overflow-y-auto overscroll-contain px-2 py-4 scrollbar-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-12 text-center text-sm text-scn-muted-foreground/50 flex flex-col items-center gap-2"
      {...props}
    >
      <CommandIcon className="size-8 opacity-20" />
      <span>No results found.</span>
    </CommandPrimitive.Empty>
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
        "overflow-hidden text-scn-foreground",
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
      className={cn("bg-scn-border/30 mx-6 h-px my-2", className)}
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
        "relative flex cursor-default select-none items-center gap-4 rounded-3xl px-6 py-4 text-sm outline-hidden transition-all duration-200",
        "mx-2",
        "data-[selected=true]:bg-scn-foreground/5 data-[selected=true]:text-scn-foreground",
        "data-[selected=true]:shadow-[0_0_20px_-10px_rgba(0,0,0,0.1)] dark:data-[selected=true]:shadow-[0_0_20px_-10px_rgba(255,255,255,0.1)]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        "[&_svg:not([class*='text-'])]:text-scn-muted-foreground group",
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
        "ml-auto flex items-center gap-1 text-[10px] font-medium tracking-wide text-scn-muted-foreground/40",
        className
      )}
      {...props}
    />
  )
}

function CommandShortcutFooter() {
  return (
    <div className="flex items-center gap-6 border-t border-scn-border/30 px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-scn-muted-foreground/30">
      <div className="flex items-center gap-2">
        <kbd className="flex h-5 w-5 items-center justify-center rounded-md bg-scn-foreground/5 px-1 font-sans ring-1 ring-scn-border/20">
          <CornerDownLeftIcon className="size-3" />
        </kbd>
        <span>to select</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <kbd className="flex h-5 w-5 items-center justify-center rounded-md bg-scn-foreground/5 px-1 font-sans ring-1 ring-scn-border/20">
            <ArrowUpIcon className="size-3" />
          </kbd>
          <kbd className="flex h-5 w-5 items-center justify-center rounded-md bg-scn-foreground/5 px-1 font-sans ring-1 ring-scn-border/20">
            <ArrowDownIcon className="size-3" />
          </kbd>
        </div>
        <span>to navigate</span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <kbd className="flex items-center justify-center rounded-md bg-scn-foreground/5 px-2 py-0.5 font-sans ring-1 ring-scn-border/20">
          ESC
        </kbd>
        <span>to close</span>
      </div>
    </div>
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
  CommandShortcutFooter,
}