'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return <QueryClientProvider client={queryClientRef.current}>{children}</QueryClientProvider>;
};

export default QueryProvider;
