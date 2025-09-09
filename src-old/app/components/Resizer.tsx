"use client"
import React from 'react';

interface ResizerProps {
  onMouseDown: (event: React.MouseEvent) => void;
  className?: string;
}

const Resizer: React.FC<ResizerProps> = ({ onMouseDown, className }) => {
  return (
    <div
      // The whole div is the grab handle.
      // h-3 (12px) provides a larger, more accessible target area.
      // cursor-row-resize indicates vertical resizing.
      className={`group flex-shrink-0 flex items-center justify-center w-full h-3 cursor-row-resize ${className}`}
      onMouseDown={onMouseDown}
      aria-label="Resize panel"
      role="separator"
      // aria-orientation is horizontal, as the resizer itself is a horizontal bar.
      aria-orientation="horizontal"
    >
      {/* Visual indicator: a short, thick line that changes color on hover */}
      <div className="h-1.5 w-16 bg-border-subtle rounded-full group-hover:bg-brand-primary transition-colors duration-200" />
    </div>
  );
};

export default Resizer;