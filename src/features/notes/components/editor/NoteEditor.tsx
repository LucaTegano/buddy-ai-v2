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
      TiptapExtensions.StarterKit.configure({
        // Disable extensions that we're adding explicitly to avoid duplicates
        underline: false,
        strike: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        //taskList: false,
        //taskItem: false,
      }),
      TiptapExtensions.Underline, 
      TiptapExtensions.TextStyle, 
      TiptapExtensions.Color, 
      TiptapExtensions.Strike,
      TiptapExtensions.Highlight.configure({ multicolor: true }),
      TiptapExtensions.Blockquote, 
      TiptapExtensions.CodeBlock, 
      TiptapExtensions.HorizontalRule, 
      TiptapExtensions.TaskList,
      TiptapExtensions.TaskItem.configure({ nested: true }),
    ],
    content: note?.content || '',
    editorProps: {
      attributes: {
        class: 'tiptap prose dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none w-full max-w-6xl', // Increased from max-w-4xl to max-w-6xl for 50% more width
      },
    },
    onUpdate: ({ editor }) => {
      // Update the dirty state when content changes
      const currentContent = editor.getHTML();
      const isContentDirty = currentContent !== lastSavedContent;
      setIsDirty(isContentDirty);
    },
  });

  const [lastSavedContent, setLastSavedContent] = useState(note?.content || '');
  
  useEffect(() => {
    setNoteTitle(note?.title || 'Untitled Note');
    
    // Update last saved content when note changes
    if (note?.content !== undefined) {
      setLastSavedContent(note.content || '');
    }
    
    if (editor) {
      const newContent = note.content || '';
      const currentContent = editor.getHTML();
      
      // Only update editor content if it's different
      if (newContent !== currentContent) {
        editor.commands.setContent(newContent, { emitUpdate: false });
        // Reset dirty state when loading a note
        setIsDirty(false);
      }
    }
  }, [note?.id, note?.title, note?.content, editor]);

  useEffect(() => {
    // Update the dirty state when the editor content changes
    if (editor) {
      const currentContent = editor.getHTML();
      const isContentDirty = currentContent !== lastSavedContent;
      setIsDirty(isContentDirty);
    }
  }, [editor, lastSavedContent]);

  const handleTitleChange = (newTitle: string) => {
    setNoteTitle(newTitle);
    if (!isNewNote) {
      setIsDirty(true);
    }
  };

  const handleSaveNote = async () => {
    if (!note.id || !isDirty) return;

    const contentToSave = editor?.getHTML() || '';
    
    setIsSaving(true);
    const result = await noteActions.updateNote(note.id, {
      title: noteTitle,
      content: contentToSave,
    });

    if (result.success) {
      // Update the last saved content to match what we just saved
      setLastSavedContent(contentToSave);
      setIsDirty(false);
    }
    setIsSaving(false);
  };

  const handleSaveNewNote = async () => {
    if (isNewNote && onCreateNote) {
      const contentToSave = editor?.getHTML() || '';
      
      await onCreateNote({
        title: noteTitle,
        content: contentToSave,
        tags: note.tags || [],
        isCollaborative: note.isCollaborative || false,
      });
      
      // Update the last saved content after creating a new note
      setLastSavedContent(contentToSave);
      setIsDirty(false);
    }
  };

  const handleConfirmDelete = () => {
    if (note.id) {
      noteActions.moveNoteToTrash(note.id, router);
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
            {note?.id && (
            <ChatPanel noteId={parseInt(note.id, 10)} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NoteEditor;
