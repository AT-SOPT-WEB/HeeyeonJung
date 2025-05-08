import { useState } from 'react';

export function useRecentSearches(getUserInfo) {
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSearch = (keyword) => {
    if (!keyword) return;

    const normalized = keyword.trim().toLowerCase();

    const isDuplicate = recentSearches.some(item => item.toLowerCase() === normalized);
    if (isDuplicate) {
      getUserInfo(normalized);
      return;
    }

    const updated = [normalized, ...recentSearches].slice(0, 3);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));

    getUserInfo(normalized);
  };

  const handleDelete = (keyword) => {
    const updated = recentSearches.filter(item => item !== keyword);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return { recentSearches, handleSearch, handleDelete };
}
