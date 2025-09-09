"use client"
import { useState, useCallback, useEffect } from 'react';

export const useNewResizablePanel = (
  initialEditorHeight: number, 
  minEditorHeight = 120, 
  maxEditorHeightRatio = 0.8,
  options?: {
    onClose?: () => void;
    closeThreshold?: number;
  }
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [editorHeight, setEditorHeight] = useState(initialEditorHeight);
  const { onClose, closeThreshold = 50 } = options || {};

  const handleMouseDownOnResizer = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    }
  }, [isResizing]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';

      // Calculate the maximum height for the editor
      const maxHeight = window.innerHeight * maxEditorHeightRatio;
      
      // Calculate editor height based on mouse position
      // We subtract 160px to account for header, toolbar, and footer
      const calculatedEditorHeight = e.clientY - 160;
      
      // Check if we should close the panel
      if (onClose && calculatedEditorHeight < closeThreshold) {
        onClose();
        setIsResizing(false);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
        return;
      }

      // Apply constraints
      if (calculatedEditorHeight < minEditorHeight) {
        setEditorHeight(minEditorHeight);
      } else if (calculatedEditorHeight > maxHeight) {
        setEditorHeight(maxHeight);
      } else {
        setEditorHeight(calculatedEditorHeight);
      }
    }
  }, [isResizing, minEditorHeight, maxEditorHeightRatio, onClose, closeThreshold]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Calculate chat panel height based on editor height
  const chatPanelHeight = window.innerHeight - editorHeight - 160; // 160px for header, toolbar, footer

  return { 
    isResizing, 
    editorHeight, 
    chatPanelHeight,
    handleMouseDownOnResizer 
  };
};