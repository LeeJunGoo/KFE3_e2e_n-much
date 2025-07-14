'use client';
import { useContext } from 'react';
import { AuthContext } from 'src/app/(providers)/AuthProvider';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('인증 정보를 불러올 수 없습니다');
  }
  return context;
};

export { useAuthContext };
