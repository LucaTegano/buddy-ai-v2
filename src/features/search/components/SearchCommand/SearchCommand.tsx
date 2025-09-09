"use client";

import React, {
  useEffect
} from 'react';
import {
  SquarePen,
  ClipboardPen,
  CreditCard,
  Settings,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useCommandSearch } from '@/lib/hooks/use-command-search';

export function SearchCommand() {
  const { isOpen, onClose, toggle } = useCommandSearch();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return (
    // Note: Changing the width here is difficult without recomposing the component.
    // The changes below will make the content inside larger, giving it a bigger feel.
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      {/* Make the input taller and the font larger */}
      <CommandInput 
        placeholder="Type a command or search..." 
        className="h-14 text-base"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {/* Add padding and increase font size for each item */}
          <CommandItem className="py-3 text-base">
            {/* Make icons bigger and add more margin */}
            <SquarePen className="mr-3 h-5 w-5" />
            <span>New Note</span>
          </CommandItem>
          <CommandItem className="py-3 text-base">
            <ClipboardPen className="mr-3 h-5 w-5" />
            <span>New Task</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Previous 7 days">
          <CommandItem className="py-3 text-base">
            <User className="mr-3 h-5 w-5" />
            <span>Note 89</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Previous 30 days">
          <CommandItem className="py-3 text-base">
            <User className="mr-3 h-5 w-5" />
            <span>Note33</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem className="py-3 text-base">
            <User className="mr-3 h-5 w-5" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem className="py-3 text-base">
            <Settings className="mr-3 h-5 w-5" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}