import { useState, useEffect, useRef } from 'react';
import { noteActions } from '@/features/notes/actions/note.actions';

interface AutoSaveOptions {
  interval?: number; // in milliseconds
  onSave?: (note: any) => void;
  onError?: (error: any) => void;
}

export const useNoteAutoSave = (note: any, options: AutoSaveOptions = {}) => {
  const { interval = 5000, onSave, onError } = options; // Default to 5 seconds
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const noteRef = useRef(note);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update ref when note changes
  useEffect(() => {
    noteRef.current = note;
  }, [note]);

  const saveNote = async () => {
    if (!noteRef.current || !noteRef.current.id) {
      console.warn('Attempted to save note, but note or note.id is missing');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      console.log('Auto-saving note:', noteRef.current);
      const result = await noteActions.updateNote(noteRef.current.id, noteRef.current);
      
      if (result.success) {
        setLastSaved(new Date());
        onSave?.(result.note);
        console.log('Note auto-saved successfully');
      } else {
        throw new Error(result.error || 'Failed to save note');
      }
    } catch (err: any) {
      console.error('Error auto-saving note:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to auto-save note';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setIsSaving(false);
    }
  };

  const startAutoSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(async () => {
      await saveNote();
      startAutoSave(); // Restart the cycle
    }, interval);
  };

  const stopAutoSave = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
  };

  // Start auto-save when note has an ID and content
  useEffect(() => {
    if (note?.id) {
      startAutoSave();
    }
    
    return () => {
      stopAutoSave();
    };
  }, [note?.id, interval]);

  return {
    isSaving,
    lastSaved,
    error,
    saveNote, // Manual save function
    startAutoSave,
    stopAutoSave
  };
};