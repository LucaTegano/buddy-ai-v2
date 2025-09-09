import { create } from 'zustand';
import { ScratchpadAction } from '@/app/models/types';
import { performActionOnNotes } from '../services/geminiService';
import { stripHtml } from '@/app/utils/utils';
import { useAppStore } from './useAppStore';

interface ScratchpadState {
  content: string;
  isProcessing: boolean;
  setContent: (content: string) => void;
  performAction: (action: ScratchpadAction) => Promise<void>;
  addToScratchpad: (text: string) => void;
  syncContentFromAppStore: () => void;
}

export const useScratchpadStore = create<ScratchpadState>((set, get) => ({
  content: '',
  isProcessing: false,

  setContent: (newContent: string) => {
    set({ content: newContent });
    const { activeNoteId, updateNote } = useAppStore.getState();
    if (activeNoteId) {
      updateNote(activeNoteId, newContent);
    }
  },

  syncContentFromAppStore: () => {
    const { notes, activeNoteId } = useAppStore.getState();
    const activeNote = notes.find(note => note.id === activeNoteId);
    set({ content: activeNote ? activeNote.content : '<p>Select a note to start editing.</p>' });
  },

  performAction: async (action: ScratchpadAction) => {
    const { activeNoteId, notes } = useAppStore.getState();
    if (!activeNoteId) return;

    const activeNote = notes.find(note => note.id === activeNoteId);
    const currentContent = activeNote?.content || '';
    const plainTextContent = stripHtml(currentContent);
    if (!plainTextContent.trim()) {
      alert("Scratchpad is empty. Please add some notes first.");
      return;
    }
    set({ isProcessing: true });

    try {
      const result = await performActionOnNotes(action, plainTextContent);
      let newContent = '';
      if (action === 'proofread') {
        newContent = `<p>${result.replace(/\n/g, '</p><p>')}</p>`;
      } else {
        const title = action === 'summarize' ? 'Summary' : 'Key Points';
        const formattedResult = `<br><hr><br><h3>${title}:</h3><p>${result.replace(/\n/g, '<br>')}</p>`;
        newContent = currentContent + formattedResult;
      }
      get().setContent(newContent);
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your notes.");
    } finally {
      set({ isProcessing: false });
    }
  },

  addToScratchpad: (text: string) => {
    const { activeNoteId, notes } = useAppStore.getState();
    if (!activeNoteId) return;
    
    const newContent = `<p>${text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
    const activeNote = notes.find(note => note.id === activeNoteId);
    const baseContent = activeNote?.content || '';

    const isInitialContent = !stripHtml(baseContent).trim();

    if (isInitialContent) {
      get().setContent(newContent);
    } else {
      get().setContent(baseContent + `<br>${newContent}`);
    }
  },
}));