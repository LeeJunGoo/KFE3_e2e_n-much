import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentKeywords';
const MAX_LENGTH = 6;

export default function useRecentKeywords() {
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    setRecentKeywords(storedData ? JSON.parse(storedData) : []);
  }, []);

  const insert = (keyword: string) => {
    let newKeywords = recentKeywords.filter((k) => k !== keyword);
    newKeywords.unshift(keyword);
    if (newKeywords.length > MAX_LENGTH) {
      newKeywords = newKeywords.slice(0, MAX_LENGTH);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newKeywords));
    setRecentKeywords(newKeywords);
  };

  const remove = (keyword: string) => {
    const newKeywords = recentKeywords.filter((k) => k !== keyword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newKeywords));
    setRecentKeywords(newKeywords);
  };

  const clear = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setRecentKeywords([]);
  };

  return { recentKeywords, insert, remove, clear };
}
