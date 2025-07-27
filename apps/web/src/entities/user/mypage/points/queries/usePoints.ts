import { useQuery } from '@tanstack/react-query';
import { getUserPoints } from 'src/entities/user/mypage/points/api';
import { pointQueryKeys } from 'src/entities/user/mypage/points/queries/keys';
import type { UserRow } from 'src/shared/supabase/types';

export const useGetUserPoints = (userId?: UserRow['id']) => {
  return useQuery({
    queryKey: pointQueryKeys.user(userId || ''),
    queryFn: () => getUserPoints(userId!),
    enabled: !!userId
  });
};
