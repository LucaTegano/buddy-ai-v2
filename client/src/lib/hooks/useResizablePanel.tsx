"use client"
import { useState, useCallback, useEffect } from 'react';

export const useResizablePanel = (
  initialHeight: number, 
  minHeight = 100, 
  maxHeightRatio = 0.7,
  options?: {
    onClose?: () => void;
    closeThreshold?: number;
  }
) => {
  const [isResizing, setIsResizing] = useState(false);
  const [panelHeight, setPanelHeight] = useState(initialHeight);
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

      const maxHeight = window.innerHeight * maxHeightRatio;
      
      // Assumes 16px bottom padding on the main container
      const newHeight = window.innerHeight - e.clientY - 16;
      
      if (onClose && newHeight < closeThreshold) {
        onClose();
        setIsResizing(false);
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
        return;
      }

      if (newHeight < minHeight) {
        setPanelHeight(minHeight);
      } else if (newHeight > maxHeight) {
        setPanelHeight(maxHeight);
      } else {
        setPanelHeight(newHeight);
      }
    }
  }, [isResizing, minHeight, maxHeightRatio, onClose, closeThreshold]);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return { isResizing, panelHeight, handleMouseDownOnResizer };
};
