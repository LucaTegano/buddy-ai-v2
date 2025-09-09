"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/app/store/useAppStore';
import ScratchpadPanel from '@/app/components/Notes/ScratchPadPanel';

export default function NotePage() {
  const params = useParams();
  const { setActiveNoteId } = useAppStore();
  const noteId = params.id as string;
  
  // Set the active note ID when the component mounts
  React.useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
    }
    
    // Clean up when unmounting
    return () => {
      setActiveNoteId(null);
    };
  }, [noteId, setActiveNoteId]);

  return <ScratchpadPanel />;
}