import React from 'react';

export const TypingIndicator = () => (
  <div className="flex items-end gap-2.5 my-6">
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-hover/80 text-text-secondary">
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
    </div>
  </div>
);