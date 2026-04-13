import React, { useState } from 'react';
import { CopyIcon, Check,  } from 'lucide-react';

interface ModelMessageProps {
  text: string;
}

export const ModelMessage: React.FC<ModelMessageProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    // Change 1: The main container is now a flex column. `relative` is no longer needed.
    <div className="group my-6 flex flex-col gap-2"> 
      <p className="text-sm text-text-primary break-words whitespace-pre-wrap leading-relaxed max-w-3xl">{text}</p>
      
      {/* Change 2: The icon container is now a regular block element in the flex flow. */}
      {/* The hover and transition effects remain the same. */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-surface border border-border-subtle rounded-lg shadow-sm flex items-center w-fit">
         {/* <button 
          onClick={addToNote}
          className='p-1.5 text-text-secondary hover:text-text-primary hover:bg-hover rounded-md transition-colors flex items-center mr-2'>
            <PlusIcon className='w-4 h-4 '/>
          </button> */}
          <button 
            onClick={handleCopy} 
            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-hover rounded-md transition-colors flex items-center gap-1.5"
            aria-label="Copy message"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-brand-primary" />
            ) : (
              <CopyIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};