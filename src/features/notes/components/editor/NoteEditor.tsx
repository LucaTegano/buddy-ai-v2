"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditor } from '@tiptap/react';
import * as TiptapExtensions from './tiptapExtensions';
import * as EditorComponents from './editorComponents';
import { useNewResizablePanel } from '@/lib/hooks/useNewResizablePanel';
import { useRouter } from 'next/navigation';
import { Note } from '../../types/Note';
import { noteActions } from '../../actions/note.actions';
import ConfirmationModal from './ConfirmationModal';
import ChatPanel from '@/features/chat/components/ChatPanel';
import Resizer from '@/shared/components/Resizer';

interface NoteEditorProps {
  note: Partial<Note>;
  isChatPanelOpen: boolean;
  toggleChatPanel: () => void;
  isNewNote?: boolean;
  onCreateNote?: (note: Partial<Note>) => Promise<void>;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ 
  note, 
  isChatPanelOpen, 
  toggleChatPanel,
  isNewNote = false,
  onCreateNote
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState(note?.title || 'Untitled Note');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const { isResizing, editorHeight, chatPanelHeight, handleMouseDownOnResizer } = useNewResizablePanel(
    400, 120, 0.8, { onClose: toggleChatPanel }
  );

  const editor = useEditor({
    immediatelyRender: false, 
    extensions: [
      TiptapExtensions.StarterKit, TiptapExtensions.Underline, TiptapExtensions.TextStyle, TiptapExtensions.Color, TiptapExtensions.Strike,
      TiptapExtensions.Highlight.configure({ multicolor: true }),
      TiptapExtensions.Blockquote, TiptapExtensions.CodeBlock, TiptapExtensions.HorizontalRule, TiptapExtensions.TaskList,
      TiptapExtensions.TaskItem.configure({ nested: true }),
    ],
    content: note?.content || '',
    editorProps: {
      attributes: {
        class: 'tiptap prose dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none w-full max-w-none',
      },
    },
    onUpdate: () => {
      if (!isNewNote) {
        setIsDirty(true);
      }
    },
  });

  useEffect(() => {
    setNoteTitle(note?.title || 'Untitled Note');
    if (editor) {
      const newContent = note.content || '';
      if (newContent !== editor.getHTML()) {
        editor.commands.setContent(newContent, { emitUpdate: false });
      }
    }
    setIsDirty(false);
  }, [note?.id, note?.title, note?.content, editor, isNewNote]);

  const handleTitleChange = (newTitle: string) => {
    setNoteTitle(newTitle);
    if (!isNewNote) {
      setIsDirty(true);
    }
  };

  const handleSaveNote = async () => {
    if (!note.id || !isDirty) return;

    setIsSaving(true);
    const result = await noteActions.updateNote(note.id, {
      title: noteTitle,
      content: editor?.getHTML() || '',
    });

    if (result.success) {
      setIsDirty(false);
    }
    setIsSaving(false);
  };

  const handleSaveNewNote = async () => {
    if (isNewNote && onCreateNote) {
      await onCreateNote({
        title: noteTitle,
        content: editor?.getHTML() || '',
        tags: note.tags || [],
        isCollaborative: note.isCollaborative || false,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (note.id) {
      noteActions.moveNoteToTrash(note.id);
      router.push('/notes');
      setIsDeleteModalOpen(false);
    } else {
      console.error("Attempted to delete a note without an ID.");
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow min-h-0 bg-surface backdrop-blur-sm border border-border-subtle shadow-subtle">
        <EditorComponents.EditorHeader
          noteTitle={noteTitle}
          isNewNote={isNewNote}
          noteId={note?.id}
          onChangeTitle={handleTitleChange}
          onSaveNote={isNewNote ? handleSaveNewNote : handleSaveNote}
          onDeleteNote={() => setIsDeleteModalOpen(true)}
          isDirty={isDirty}
          isSaving={isSaving}
        />
        
        <div className="flex-shrink-0">
          <EditorComponents.EditorToolbar editor={editor}  />
        </div>
        <EditorComponents.EditorContentArea 
          editor={editor} 
          height={editorHeight}
        />
        <EditorComponents.EditorFooter 
          isChatPanelOpen={isChatPanelOpen}
          toggleChatPanel={toggleChatPanel}
        />
        
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t('scratchpad.deleteModalTitle')}
          message={t('scratchpad.deleteModalMessage', { noteTitle: note?.title || 'this note' })}
          confirmText={t('scratchpad.deleteModalConfirm')}
        />
      </div>
      
      {isChatPanelOpen && (
        <>
          <Resizer onMouseDown={handleMouseDownOnResizer} />
          <div className="flex-shrink-0" style={{ height: chatPanelHeight }}>
            <ChatPanel />
          </div>
        </>
      )}
    </div>
  );
};

export default NoteEditor;
