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
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  CommandShortcutFooter,
} from "@/components/ui/command"
import { useCommandSearch } from '@/lib/hooks/use-command-search';
import { useTranslation } from 'react-i18next';
import { noteActions } from '@/features/notes/actions/note.actions';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/shared/store/ui.store';
import { useSearchShortcuts } from './shortcuts';
import recentNotesService from '@/features/notes/services/recent-notes.service';
import { NoteListItem } from '@/features/notes/types/RecentNotes';
import notesService from '@/features/notes/services/notes.service';
import { noteToNoteListItem } from '@/features/notes/utils/noteMapper';

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NoteListItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    console.log('Debounced search query changed:', debouncedSearchQuery);
  }, [debouncedSearchQuery]);

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

  // Search notes when debounced query changes
  useEffect(() => {
    let active = true;
    const search = async (query: string) => {
      setIsSearching(true);
      try {
        console.log('Searching for notes with query:', query);
        const results = await notesService.searchNotes(query);
        if (active) {
          console.log('Search results:', results);
          // Map Note[] to NoteListItem[]
          const mappedResults = results.map(noteToNoteListItem);
          setSearchResults(mappedResults);
        }
      } catch (error) {
        console.error('Failed to search notes:', error);
        if (active) {
          setSearchResults([]);
        }
      } finally {
        if (active) {
          setIsSearching(false);
        }
      }
    };

    if (isOpen && debouncedSearchQuery && debouncedSearchQuery.trim() !== '') {
      console.log('Performing search for:', debouncedSearchQuery);
      search(debouncedSearchQuery);
    } else {
      console.log('Clearing search results');
      setSearchResults([]);
    }

    return () => {
      active = false;
    };
  }, [isOpen, debouncedSearchQuery]);

  const loadRecentNotes = async () => {
    setIsLoading(true);
    try {
      const { previous7Days, previous30Days, latestNotes } = await recentNotesService.getRecentNotes();
      setPrevious7DaysNotes(previous7Days || []);
      setPrevious30DaysNotes(previous30Days || []);
      setLatestNotes(latestNotes || []);
    } catch (error) {
      console.error('Failed to load recent notes:', error);
      // Set defaults to empty arrays to prevent null errors
      setPrevious7DaysNotes([]);
      setPrevious30DaysNotes([]);
      setLatestNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  // Reset search when closing the dialog
  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  const hasSearchQuery = searchQuery.trim() !== '';

  return (
    <CommandDialog open={isOpen} onOpenChange={handleClose}>
      <CommandInput
        placeholder={t('search.placeholder')}
        onValueChange={handleSearchChange}
        value={searchQuery}
      />
      <CommandList>
        {/* Search View */}
        <CommandGroup
          heading={t('search.results')}
          style={{ display: hasSearchQuery ? 'block' : 'none' }}
        >
          {searchResults.map((note) => (
            <CommandItem
              key={note.id}
              value={note.title}
              onSelect={() => {
                router.push(`/note/${note.id}`);
                handleClose();
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-scn-secondary/50">
                <Notebook className="h-5 w-5 text-scn-muted-foreground" />
              </div>
              <div className="flex flex-1 flex-col truncate">
                <span className="font-medium truncate">{note.title}</span>
                <span className="text-[10px] text-scn-muted-foreground/60 uppercase tracking-tight">Note</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Default View */}
        <div style={{ display: hasSearchQuery ? 'none' : 'block' }}>
          <CommandGroup heading="Quick Actions">
            <CommandItem
              onSelect={async () => {
                const result = await noteActions.handleCreateNote();
                if (result.success && result.note) {
                  router.push(`/note/${result.note.id}`);
                  handleClose();
                }
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10">
                <SquarePen className="h-5 w-5 text-brand-primary" />
              </div>
              <span className="font-medium">{t('search.newNote')}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/home');
                setFocusTaskInput(true);
                handleClose();
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10">
                <ClipboardPen className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-medium">{t('search.newTask')}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/settings');
                handleClose();
              }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-500/10 dark:bg-slate-400/10">
                <Settings className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
              <span className="font-medium">{t('search.settings')}</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          {previous7DaysNotes.length > 0 && (
            <CommandGroup heading={t('search.previous7Days')}>
              {previous7DaysNotes.map((note) => (
                <CommandItem
                  key={note.id}
                  value={`${note.title}-previous-7`}
                  onSelect={() => {
                    router.push(`/note/${note.id}`);
                    handleClose();
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-scn-secondary/50 font-sans">
                    <Notebook className="h-5 w-5 text-scn-muted-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col truncate">
                    <span className="font-medium truncate">{note.title}</span>
                    <span className="text-[10px] text-scn-muted-foreground/60">2 minutes ago</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {previous30DaysNotes.length > 0 && (
            <CommandGroup heading={t('search.previous30Days')}>
              {previous30DaysNotes.map((note) => (
                <CommandItem
                  key={note.id}
                  value={`${note.title}-previous-30`}
                  onSelect={() => {
                    router.push(`/note/${note.id}`);
                    handleClose();
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-scn-secondary/50">
                    <Notebook className="h-5 w-5 text-scn-muted-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col truncate">
                    <span className="font-medium truncate">{note.title}</span>
                    <span className="text-[10px] text-scn-muted-foreground/60">Last month</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {latestNotes.length > 0 && (
            <CommandGroup heading={t('search.latestNotes')}>
              {latestNotes.map((note) => (
                <CommandItem
                  key={note.id}
                  value={`${note.title}-latest`}
                  onSelect={() => {
                    router.push(`/note/${note.id}`);
                    handleClose();
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-scn-secondary/50">
                    <Notebook className="h-5 w-5 text-scn-muted-foreground" />
                  </div>
                  <div className="flex flex-1 flex-col truncate">
                    <span className="font-medium truncate">{note.title}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </div>

        {/* Empty States */}
        {hasSearchQuery && isSearching ? (
          <CommandEmpty>{t('search.searching')}</CommandEmpty>
        ) : hasSearchQuery && !isSearching && searchResults.length === 0 ? (
          <CommandEmpty>{t('search.noResults')}</CommandEmpty>
        ) : !hasSearchQuery && !isLoading && latestNotes.length === 0 && previous7DaysNotes.length === 0 && previous30DaysNotes.length === 0 ? (
          <CommandEmpty>{t('search.empty')}</CommandEmpty>
        ) : null}
      </CommandList>
      <CommandShortcutFooter />
    </CommandDialog>
  );
}
