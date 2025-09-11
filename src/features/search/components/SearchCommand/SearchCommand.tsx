"use client";

import React, {
  useEffect,
  useState
} from 'react';
import {
  SquarePen,
  ClipboardPen,
  Notebook,
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
import { noteActions } from '@/features/notes/actions/note.actions';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/shared/store/ui.store';
import { useSearchShortcuts } from './shortcuts';
import recentNotesService from '@/features/notes/services/recent-notes.service';
import { NoteListItem } from '@/features/notes/types/RecentNotes';

export function SearchCommand() {
  const { isOpen, onClose, toggle } = useCommandSearch();
  const { t } = useTranslation();
  const router = useRouter();
  const setFocusTaskInput = useUIStore(state => state.setFocusTaskInput);
  const { shortcuts } = useSearchShortcuts(onClose);
  
  const [previous7DaysNotes, setPrevious7DaysNotes] = useState<NoteListItem[]>([]);
  const [previous30DaysNotes, setPrevious30DaysNotes] = useState<NoteListItem[]>([]);
  const [latestNotes, setLatestNotes] = useState<NoteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Check if any of our shortcuts match
      for (const shortcut of shortcuts) {
        if (
          e.key === shortcut.key &&
          !!e.metaKey === !!shortcut.metaKey &&
          !!e.ctrlKey === !!shortcut.ctrlKey &&
          !!e.shiftKey === !!shortcut.shiftKey &&
          !!e.altKey === !!shortcut.altKey
        ) {
          shortcut.handler(e);
          break;
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [shortcuts, toggle]);

  // Load recent notes when the dialog opens
  useEffect(() => {
    if (isOpen) {
      loadRecentNotes();
    }
  }, [isOpen]);

  const loadRecentNotes = async () => {
    setIsLoading(true);
    try {
      const { previous7Days, previous30Days, latestNotes } = await recentNotesService.getRecentNotes();
      setPrevious7DaysNotes(previous7Days);
      setPrevious30DaysNotes(previous30Days);
      setLatestNotes(latestNotes);
    } catch (error) {
      console.error('Failed to load recent notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Note: Changing the width here is difficult without recomposing the component.
    // The changes below will make the content inside larger, giving it a bigger feel.
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      {/* Make the input taller and the font larger */}
      <CommandInput
        placeholder={t('search.placeholder')}
        className="h-14 text-base mb-2"
      />
      <CommandList>
        <CommandEmpty>{t('search.empty')}</CommandEmpty>
        <CommandGroup>
          {/* Add padding and increase font size for each item */}
          <CommandItem 
            className="py-3 text-base"
            onSelect={async () => {
              const result = await noteActions.handleCreateNote();
              if (result.success && result.note) {
                router.push(`/note/${result.note.id}`);
                onClose();
              }
            }}
          >
            {/* Make icons bigger and add more margin */}
            <SquarePen className="mr-3 h-5 w-5" />
            <span>{t('search.newNote')}</span>
          </CommandItem>
          <CommandItem 
            className="py-3 text-base"
            onSelect={() => {
              router.push('/home');
              setFocusTaskInput(true);
              onClose();
            }}
          >
            <ClipboardPen className="mr-3 h-5 w-5" />
            <span>{t('search.newTask')}</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup >
          <CommandItem 
            className="py-3 text-base"
            onSelect={() => {
              router.push('/general-settings');
              onClose();
            }}
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>{t('search.settings')}</span>
            <CommandShortcut>{t('search.shortcutSettings')}</CommandShortcut>
          </CommandItem>
        </CommandGroup>
            {/* Previous 7 Days Notes - Only show if there are notes */}
            {previous7DaysNotes.length > 0 && (
              <CommandGroup heading={t('search.previous7Days')}>
                {previous7DaysNotes.map((note) => (
                  <CommandItem 
                    key={note.id}
                    className="py-3 text-base"
                    onSelect={() => {
                      router.push(`/note/${note.id}`);
                      onClose();
                    }}
                  >
                    <Notebook className="mr-3 h-5 w-5" />
                    <span className="truncate max-w-xs">{note.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {/* Previous 30 Days Notes - Only show if there are notes */}
            {previous30DaysNotes.length > 0 && (
              <CommandGroup heading={t('search.previous30Days')}>
                {previous30DaysNotes.map((note) => (
                  <CommandItem 
                    key={note.id}
                    className="py-3 text-base"
                    onSelect={() => {
                      router.push(`/note/${note.id}`);
                      onClose();
                    }}
                  >
                    <Notebook className="mr-3 h-5 w-5" />
                    <span className="truncate max-w-xs">{note.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {/* Show Latest Notes in general */}
            {latestNotes.length > 0 &&
              <CommandGroup heading={t('search.latestNotes')}>
                {latestNotes.map((note) => (
                  <CommandItem 
                    key={note.id}
                    className="py-3 text-base"
                    onSelect={() => {
                      router.push(`/note/${note.id}`);
                      onClose();
                    }}
                  >
                    <Notebook className="mr-3 h-5 w-5" />
                    <span className="truncate max-w-xs">{note.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            }
        
      </CommandList>
    </CommandDialog>
  )
}