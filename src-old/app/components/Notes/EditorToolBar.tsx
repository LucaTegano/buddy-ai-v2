"use client"
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Editor } from '@tiptap/react';
import Tooltip from './Tooltip';
import { 
    BoldIcon, ItalicIcon, UnderlineIcon, ListOrderedIcon, ListBulletIcon,
    ArrowUturnLeftIcon, ArrowUturnRightIcon, PaintBrushIcon, XMarkIcon,
    StrikethroughIcon, HighlightIcon, BlockquoteIcon, CodeIcon, HorizontalRuleIcon,
    CheckBadgeIcon
} from '@/app/components/icons';

// --- Reusable Toolbar Button (kept co-located for simplicity) ---
const ToolbarButton = ({ onClick, title, isActive, disabled, children }: { 
    onClick: () => void; 
    title: string; 
    isActive?: boolean; 
    disabled?: boolean; 
    children: React.ReactNode; 
}) => (
    <Tooltip text={title}>
        <button
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded-md transition-colors disabled:text-text-disabled disabled:cursor-not-allowed ${
                isActive ? 'bg-brand-subtle text-brand-primary' : 'text-text-secondary hover:bg-hover'
            }`}
        >
            {children}
        </button>
    </Tooltip>
);

// --- Main Editor Toolbar Component ---
interface EditorToolbarProps {
    editor: Editor | null;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
    const { t } = useTranslation();

    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center flex-wrap gap-1 p-2 border-b border-border-subtle bg-surface">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title={t('scratchpad.undo')}>
                <ArrowUturnLeftIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title={t('scratchpad.redo')}>
                <ArrowUturnRightIcon className="w-5 h-5" />
            </ToolbarButton>
            
            <div className="w-px h-6 bg-border-subtle mx-1"></div>

            <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title={t('scratchpad.bold')}>
                <BoldIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title={t('scratchpad.italic')}>
                <ItalicIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title={t('scratchpad.underline')}>
                <UnderlineIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title={t('scratchpad.strikethrough')}>
                <StrikethroughIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffcc00' }).run()} isActive={editor.isActive('highlight')} title={t('scratchpad.highlight')}>
                <HighlightIcon className="w-5 h-5" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border-subtle mx-1"></div>

            <select
                onChange={(e) => {
                    const level = parseInt(e.target.value);
                    if (level === 0) {
                        editor.chain().focus().setNode('paragraph').run();
                    } else {
                        editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 }).run();
                    }
                }}
                value={editor.isActive('heading', { level: 1 }) ? 1 : editor.isActive('heading', { level: 2 }) ? 2 : editor.isActive('heading', { level: 3 }) ? 3 : 0}
                className="p-1.5 text-sm bg-transparent rounded-md text-text-primary hover:bg-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                title={t('scratchpad.fontSize')}
            >
                <option value="0">{t('scratchpad.default')}</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
            </select>
            <div className="relative flex items-center" title={t('scratchpad.color')}>
                <PaintBrushIcon className="w-5 h-5 absolute left-2 pointer-events-none text-text-secondary" />
                <input
                    type="color"
                    onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                    value={editor.getAttributes('textStyle').color || '#000000'}
                    className="w-10 h-9 p-0 pl-8 bg-transparent border-none cursor-pointer"
                />
            </div>
             <ToolbarButton onClick={() => editor.chain().focus().unsetColor().run()} title={t('scratchpad.resetColor')}>
                <XMarkIcon className="w-5 h-5" />
            </ToolbarButton>

            <div className="w-px h-6 bg-border-subtle mx-1"></div>

            <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title={t('scratchpad.bulletList')}>
                <ListBulletIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title={t('scratchpad.numberedList')}>
                <ListOrderedIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} title={t('scratchpad.checklist')}>
                <CheckBadgeIcon className="w-5 h-5" />
            </ToolbarButton>
            
            <div className="w-px h-6 bg-border-subtle mx-1"></div>

            <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title={t('scratchpad.blockquote')}>
                <BlockquoteIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title={t('scratchpad.codeBlock')}>
                <CodeIcon className="w-5 h-5" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title={t('scratchpad.divider')}>
                <HorizontalRuleIcon className="w-5 h-5" />
            </ToolbarButton>
        </div>
    );
};

export default EditorToolbar;