"use client";

import React from 'react';
import { EditorContent, Editor } from '@tiptap/react';

interface EditorContentAreaProps {
  editor: Editor | null;
  height?: number;
}

const EditorContentArea: React.FC<EditorContentAreaProps> = ({ editor, height }) => {
  return (
    <div 
      className={`overflow-y-auto ${!height ? 'flex-grow' : ''}`} 
      style={height ? { height: `${height}px` } : undefined}
    >
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorContentArea;