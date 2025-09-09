import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Strike from '@tiptap/extension-strike';
import Highlight from '@tiptap/extension-highlight';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

// Configure StarterKit to disable extensions that we're adding explicitly
// This prevents duplicate extension warnings
export { 
  StarterKit,
  Underline, 
  TextStyle, 
  Color, 
  Strike,
  Highlight, 
  Blockquote, 
  CodeBlock, 
  HorizontalRule, 
  TaskList, 
  TaskItem 
};