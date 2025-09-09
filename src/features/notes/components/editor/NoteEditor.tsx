"use client";

import React, { useState, useEffect, useRef } from 'react';
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
import { useNoteAutoSave } from '../../hooks/useNoteAutoSave';

interface NoteEditorProps {
  note: Partial<Note>; // Accepts a complete or partial Note object
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
  // Safely initialize state with a fallback value
  const [noteTitle, setNoteTitle] = useState(note?.title || 'Untitled Note');
  
  // Safely initialize refs with fallback values
  const lastSavedTitleRef = useRef(note?.title || 'Untitled Note');
  const lastSavedContentRef = useRef(note?.content || '');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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
    onUpdate: ({ editor }) => {
      // Guarded logic is already safe
      if (!isNewNote && note.id) {
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
          checkAndSaveNote();
        }, 1000);
      }
    },
  });

  // Use the auto-save hook for periodic saving
  const { isSaving, lastSaved, error: autoSaveError, saveNote: triggerAutoSave } = useNoteAutoSave(
    note,
    {
      interval: 5000, // Save every 5 seconds
      onSave: (updatedNote) => {
        console.log('Note auto-saved:', updatedNote);
        // Update refs with the latest saved content
        lastSavedTitleRef.current = updatedNote.title;
        lastSavedContentRef.current = updatedNote.content;
      },
      onError: (error) => {
        console.error('Auto-save error:', error);
      }
    }
  );

  const checkAndSaveNote = () => {
    // Guarded logic is already safe
    if (!isNewNote && note.id) {
      const currentTitle = noteTitle;
      const currentContent = editor?.getHTML() || '';
      
      if (currentTitle !== lastSavedTitleRef.current || currentContent !== lastSavedContentRef.current) {
        noteActions.updateNote(note.id, { 
          title: currentTitle, 
          content: currentContent 
        }).then((result) => {
          if (result.success && result.note) {
            lastSavedTitleRef.current = currentTitle;
            lastSavedContentRef.current = currentContent;
          }
        });
      }
    }
  };

  useEffect(() => {
    // Guarded logic is already safe
    if (!isNewNote && note.id) {
      saveIntervalRef.current = setInterval(() => {
        checkAndSaveNote();
      }, 10000); // 10 seconds
    }
    
    return () => {
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [note.id, isNewNote]);

  // Update refs and state when the note prop changes (e.g., navigating between notes)
  useEffect(() => {
    setNoteTitle(note?.title || 'Untitled Note');
    lastSavedTitleRef.current = note?.title || 'Untitled Note';
    lastSavedContentRef.current = note?.content || '';
  }, [note?.id]); // Use optional chaining in dependency array

  // Update editor content when note changes
  useEffect(() => {
    if (editor && note && !isNewNote) {
      const newContent = note.content || '';
      if (newContent !== editor.getHTML()) {
        editor.commands.setContent(newContent, { emitUpdate: false }); // false to avoid firing onUpdate
      }
    } else if (editor && !note) {
      editor.commands.clearContent();
    }
  }, [note?.id, note?.content, editor, isNewNote]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
      if ((window as any).updateTitleTimeout) clearTimeout((window as any).updateTitleTimeout);
    };
  }, []);

  const handleTitleChange = (newTitle: string) => {
    setNoteTitle(newTitle);
    
    if ((window as any).updateTitleTimeout) {
      clearTimeout((window as any).updateTitleTimeout);
    }
    
    (window as any).updateTitleTimeout = setTimeout(() => {
      // Guarded logic is already safe
      if (!isNewNote && note.id) {
        checkAndSaveNote();
      }
    }, 1000);
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
    // CRITICAL: Add a guard to prevent deleting a note without an ID
    if (note.id) {
      noteActions.moveNoteToTrash(note.id);
      router.push('/notes');
      setIsDeleteModalOpen(false);
    } else {
      console.error("Attempted to delete a note without an ID.");
      setIsDeleteModalOpen(false); // Still close the modal
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow min-h-0 bg-surface backdrop-blur-sm border border-border-subtle shadow-subtle">
        <EditorComponents.EditorHeader
          noteTitle={noteTitle}
          isNewNote={isNewNote}
          noteId={note?.id} // Use optional chaining
          onChangeTitle={handleTitleChange}
          onSaveNote={handleSaveNewNote}
          onDeleteNote={() => setIsDeleteModalOpen(true)}
          onTitleSave={checkAndSaveNote}
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
          // Use optional chaining and a fallback for the message
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