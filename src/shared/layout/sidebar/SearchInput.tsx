import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/shared/store/ui.store';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon 
} from '@/shared/components/icons';

const SearchInput: React.FC = () => {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useUIStore();
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // In a real implementation, this would trigger a search
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className="p-3">
      <h3 className="px-1 text-lg font-bold text-text-primary mb-2">{t('sidebar.search')}</h3>
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          placeholder={t('sidebar.searchNotesPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-surface border border-border-subtle rounded-md py-2 pl-10 pr-8 text-sm focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          autoFocus
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;