import { useQuery } from '@tanstack/react-query';
import { episodeQueryKeys } from './keys/episodes';
import { fetchUserBiddingCount } from 'src/lib/queries/episodes';

export const useGetUserBiddingCount = () => {
  return useQuery({
    queryKey: episodeQueryKeys.biddingCount(),
    queryFn: fetchUserBiddingCount
  });
};
