'use client';
import { createContext } from 'react';
import type { ReactNode } from 'react';
import useAuth from 'src/entities/user/auth/hooks/useAuth';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuth();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export { AuthContext };
export type { AuthContextType };
