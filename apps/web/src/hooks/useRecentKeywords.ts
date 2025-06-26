import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentKeywords';
const MAX_LENGTH = 6;

export default function useRecentKeywords() {
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    setRecentKeywords(raw ? JSON.parse(raw) : []);
  }, []);

  const insert = (keyword: string) => {
    let newrecentKeywords = recentKeywords.filter((k) => k !== keyword);
    newrecentKeywords.unshift(keyword);
    newrecentKeywords = newrecentKeywords.slice(0, MAX_LENGTH);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newrecentKeywords));
    setRecentKeywords(newrecentKeywords);
  };

  const remove = (keyword: string) => {
    const newrecentKeywords = recentKeywords.filter((k) => k !== keyword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newrecentKeywords));
    setRecentKeywords(newrecentKeywords);
  };

  const clear = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setRecentKeywords([]);
  };

  return { recentKeywords, insert, remove, clear };
}
