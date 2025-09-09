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
import { useTranslation } from 'react-i18next';

export function SearchCommand() {
  const { isOpen, onClose, toggle } = useCommandSearch();
  const { t } = useTranslation();

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
        placeholder={t('search.placeholder')} 
        className="h-14 text-base"
      />
      <CommandList>
        <CommandEmpty>{t('search.empty')}</CommandEmpty>
        <CommandGroup>
          {/* Add padding and increase font size for each item */}
          <CommandItem className="py-3 text-base">
            {/* Make icons bigger and add more margin */}
            <SquarePen className="mr-3 h-5 w-5" />
            <span>{t('search.newNote')}</span>
          </CommandItem>
          <CommandItem className="py-3 text-base">
            <ClipboardPen className="mr-3 h-5 w-5" />
            <span>{t('search.newTask')}</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading={t('search.previous7Days')}>
          <CommandItem className="py-3 text-base">
            <User className="mr-3 h-5 w-5" />
            <span>{t('search.note89')}</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading={t('search.previous30Days')}>
          <CommandItem className="py-3 text-base">
            <User className="mr-3 h-5 w-5" />
            <span>{t('search.note33')}</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('search.settings')}>
          <CommandItem className="py-3 text-base">
            <User className="mr-3 h-5 w-5" />
            <span>{t('search.profile')}</span>
            <CommandShortcut>{t('search.shortcutProfile')}</CommandShortcut>
          </CommandItem>
          <CommandItem className="py-3 text-base">
            <Settings className="mr-3 h-5 w-5" />
            <span>{t('search.settings')}</span>
            <CommandShortcut>{t('search.shortcutSettings')}</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}