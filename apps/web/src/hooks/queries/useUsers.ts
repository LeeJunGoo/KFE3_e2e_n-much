import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from './keys/users';
import { fetchUserInfo, fetchUserRole } from 'src/lib/queries/auth';

// 유저 역할 불러오기
export const useGetUserRole = () => {
  return useQuery({
    queryKey: userQueryKeys.role(),
    queryFn: fetchUserRole
  });
};

// 유저 정보 불러오기
export const useGetUserInfo = () => {
  return useQuery({
    queryKey: userQueryKeys.info(),
    queryFn: fetchUserInfo
  });
};
