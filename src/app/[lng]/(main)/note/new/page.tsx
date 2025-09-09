"use client";

import React from 'react';
import { noteActions } from '@/features/notes/actions/note.actions';
import NoteEditor from '@/features/notes/components/NoteEditor';
import { useChatStore } from '@/features/chat/store/chat.store';
import {useRouter} from 'next/router';

export default function NewNotePage() {
  const { isChatPanelOpen, toggleChatPanel } = useChatStore();
  const router = useRouter();
    const newNoteData = {
      title: 'Untitled Note',
      content: '',
      tags: [],
      isCollaborative: false,
    };
  return (
    <NoteEditor 
      note={newNoteData} 
      isChatPanelOpen={isChatPanelOpen} 
      toggleChatPanel={toggleChatPanel} 
      isNewNote={true}
      onCreateNote={async (newNoteData) => {
        const result = await noteActions.createNote(newNoteData);
        if (result.success && result.note) {
          router.push(`/note/${result.note.id}`);
        }
      }}
    />
  );
}