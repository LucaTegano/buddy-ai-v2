"use client"
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Strike from '@tiptap/extension-strike';
import Highlight from '@tiptap/extension-highlight';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import ChatPanel from '@/app/components/ChatPanel';
import Resizer from '@/app/components/Resizer';
import { useResizablePanel } from '@/app/hooks/useResizablePanel';
import { useAppStore } from '@/app/store/useAppStore';
import ConfirmationModal from '@/app/components/modals/ConfirmationModal';
import EditorToolbar from '@/app/components/Notes/EditorToolBar';
import { useRouter } from 'next/navigation';
import { 
    ChatBubbleLeftRightIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon
} from '@/app/components/icons';


const ScratchpadPanel: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isChatPanelOpen, toggleChatPanel, notes, activeNoteId, moveNoteToTrash, updateNote, updateNoteTitle } = useAppStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  
  const { isResizing, panelHeight, handleMouseDownOnResizer } = useResizablePanel(
    300, 100, 0.7, { onClose: toggleChatPanel }
  );

  const activeNote = notes.find(n => n.id === activeNoteId);

  useEffect(() => {
    if (activeNote) {
      setNoteTitle(activeNote.title);
    }
  }, [activeNote]);

  const editor = useEditor({
    immediatelyRender: false, 
    extensions: [
      StarterKit, Underline, TextStyle, Color, Strike,
      Highlight.configure({ multicolor: true }),
      Blockquote, CodeBlock, HorizontalRule, TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: activeNote?.content || '',
    editorProps: {
      attributes: {
        class: 'tiptap prose dark:prose-invert prose-sm sm:prose-base m-5 focus:outline-none w-full max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
        if(activeNoteId) {
            updateNote(activeNoteId, editor.getHTML());
        }
    },
  });

  useEffect(() => {
    if (editor && activeNote && editor.getHTML() !== activeNote.content) {
      editor.commands.setContent(activeNote.content);
    } else if (editor && !activeNote) {
      editor.commands.clearContent();
    }
  }, [activeNote?.content, editor]);


  const handleConfirmDelete = () => {
    if (activeNoteId) {
      moveNoteToTrash(activeNoteId, router);
    }
    setIsDeleteModalOpen(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-grow min-h-0 bg-surface backdrop-blur-sm border border-border-subtle shadow-subtle">
        <div className="flex items-center justify-between p-3 border-b border-border-subtle">
          <input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            onBlur={() => activeNoteId && updateNoteTitle(activeNoteId, noteTitle)}
            className="text-lg font-semibold text-text-primary bg-transparent focus:outline-none focus:ring-0 border-none p-0 w-full"
            placeholder={t('scratchpad.titlePlaceholder')}
            disabled={!activeNoteId}
          />
          <button
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={!activeNoteId}
              className="p-2 rounded-md text-text-secondary hover:bg-error-subtle hover:text-error focus:outline-none focus:ring-2 focus:ring-inset focus:ring-error disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label={t('scratchpad.moveToTrash')}
              title={t('scratchpad.moveToTrash')}
          >
              <TrashIcon className="w-5 h-5"/>
          </button>
        </div>
        
        {/* 3. USE THE IMPORTED COMPONENT HERE */}
        <EditorToolbar editor={editor} />

        <div className="flex-grow overflow-y-auto">
          <EditorContent editor={editor} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-auto p-4 border-t border-border-subtle">
          <button
            onClick={toggleChatPanel}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-text-primary bg-hover/80 rounded-lg hover:bg-hover transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-primary"
            aria-label={isChatPanelOpen ? t('scratchpad.hideChat') : t('scratchpad.showChat')}
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            {t('scratchpad.chat')}
            {isChatPanelOpen ? <ChevronDownIcon className="w-5 h-5 ml-1" /> : <ChevronUpIcon className="w-5 h-5 ml-1" />}
          </button>
        </div>
        
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title={t('scratchpad.deleteModalTitle')}
          message={t('scratchpad.deleteModalMessage', { noteTitle: activeNote?.title || 'this note' })}
          confirmText={t('scratchpad.deleteModalConfirm')}
        />
      </div>
      {isChatPanelOpen && (
        <>
          <Resizer onMouseDown={handleMouseDownOnResizer} />
          <div className="flex-shrink-0" style={{ height: panelHeight }}>
            <ChatPanel />
          </div>
        </>
      )}
    </div>
  );
};

export default ScratchpadPanel;