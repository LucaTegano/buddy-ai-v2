"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/app/store/useAppStore';
import { Note } from '@/app/models/types';

export default function NewNotePage() {
  const router = useRouter();
  const { addNote, setActiveNoteId } = useAppStore();

  useEffect(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      participantCount: 0,
      tags: [],
      isCollaborative: false,
    };
    addNote(newNote);
    setActiveNoteId(newNote.id);
    router.replace(`/note/${newNote.id}`);
  }, [addNote, router, setActiveNoteId]);

  return null; // Or a loading spinner
}