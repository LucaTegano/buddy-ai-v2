'use client';

import React, { useEffect } from 'react';
import { useAppStore } from '@/app/store/useAppStore';

const SearchPage = () => {
  const { isSearchResultsOpen, searchResults, executeSearch } = useAppStore();
  
  useEffect(() => {
    // Execute search when the page loads if there's a query
    executeSearch();
  }, [executeSearch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      
      {isSearchResultsOpen && (
        <div className="space-y-4">
          {searchResults.length > 0 ? (
            searchResults.map(note => (
              <div key={note.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <p className="text-sm text-text-secondary mt-1">{note.content.substring(0, 150)}...</p>
              </div>
            ))
          ) : (
            <p className="text-text-secondary">No results found. Try a different search term.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;