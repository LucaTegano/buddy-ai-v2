"use client";

import React, { useEffect } from 'react';
import { noteActions } from '@/features/notes/actions/note.actions';
import NotePage from '@/features/notes/components/NotePage';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  
  useEffect(() => {
    noteActions.setActiveNoteId(unwrappedParams.id);
  }, [unwrappedParams.id]);

  return <NotePage noteId={unwrappedParams.id} />;
}