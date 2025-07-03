import { useQuery } from '@tanstack/react-query';
import { episodeQueryKeys } from './keys/episodes';
import { fetchUserBiddingCount, fetchUserStories } from 'src/lib/queries/episodes';

export const useGetUserBiddingCount = () => {
  return useQuery({
    queryKey: episodeQueryKeys.biddingCount(),
    queryFn: fetchUserBiddingCount
  });
};

export const useGetUserStories = () => {
  return useQuery({
    queryKey: episodeQueryKeys.userStories(),
    queryFn: fetchUserStories
  });
};
