import { useQuery } from '@tanstack/react-query';
import { getUserAuctions } from 'src/entities/user/mypage/auctions/api';
import { auctionQueryKeys } from 'src/entities/user/mypage/auctions/queries/keys';
import type { UserRow } from 'src/shared/supabase/types';

export const useGetUserAuctions = (userId?: UserRow['id']) => {
  return useQuery({
    queryKey: auctionQueryKeys.user(userId || ''),
    queryFn: () => getUserAuctions(userId!),
    enabled: !!userId
  });
};
