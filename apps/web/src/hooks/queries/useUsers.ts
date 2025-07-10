import { useQuery } from '@tanstack/react-query';
import { userQueryKeys } from './keys/users';
import { fetchUserRole } from 'src/lib/queries/auth';
import { getUserInfoClient } from 'src/shared/supabase/query/users';
import { UserRoleDataProps } from 'src/types/mypage';

// 유저 역할 불러오기
export const useGetUserRole = () => {
  return useQuery({
    queryKey: userQueryKeys.role(),
    queryFn: fetchUserRole
  });
};

// 유저 정보 불러오기
export const useGetUserInfo = () => {
  return useQuery<UserRoleDataProps>({
    queryKey: userQueryKeys.info(),
    queryFn: getUserInfoClient
  });
};
