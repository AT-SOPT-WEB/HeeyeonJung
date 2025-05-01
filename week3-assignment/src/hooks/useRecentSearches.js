import { useState } from 'react';

export function useRecentSearches(getUserInfo) {
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = (keyword) => {
    if (!keyword) return;

    getUserInfo(keyword);

    const updated = [keyword, ...recentSearches.filter(item => item !== keyword)].slice(0, 3);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleDelete = (keyword) => {
    const updated = recentSearches.filter(item => item !== keyword);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return { recentSearches, handleSearch, handleDelete };
}