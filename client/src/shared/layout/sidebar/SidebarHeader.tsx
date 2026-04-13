import React from 'react';
import { ChevronDoubleLeftIcon } from '@/shared/components/icons';
import { useUIStore } from '@/shared/store/ui.store';

interface SidebarHeaderProps {
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onToggle }) => {
  const { isSidebarOpen } = useUIStore();
  
  return (
    <div className="flex items-center justify-end p-4 h-[50px] border-b border-border-subtle">
      <button 
        onClick={(e) => { 
          e.stopPropagation(); 
          onToggle(); 
        }} 
        className="p-2 rounded-lg hover:bg-hover"
      >
        <ChevronDoubleLeftIcon 
          className={`w-6 h-6 text-text-secondary transition-transform duration-300 ${
            isSidebarOpen ? '' : 'rotate-180'
          }`} 
        />
      </button>
    </div>
  );
};

export default SidebarHeader;