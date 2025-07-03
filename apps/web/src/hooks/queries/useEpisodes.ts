import { useQuery } from '@tanstack/react-query';
import { episodeQueryKeys } from './keys/episodes';
import { fetchUserBiddingCount } from 'src/lib/queries/episodes';
import { getUserStoriesClient } from 'src/lib/supabase/query/episodes';

export const useGetUserBiddingCount = () => {
  return useQuery({
    queryKey: episodeQueryKeys.biddingCount(),
    queryFn: fetchUserBiddingCount
  });
};

export const useGetUserStories = () => {
  return useQuery({
    queryKey: episodeQueryKeys.userStories(),
    queryFn: getUserStoriesClient
  });
};
