import { useQuery } from '@tanstack/react-query';
import { fetchUserEpisodes } from '../../lib/queries/episodes';
import { episodeQueryKeys } from './keys/episodes';

export const useGetUserEpisodes = (userId: string) => {
  return useQuery({
    queryKey: episodeQueryKeys.user(userId),
    queryFn: () => fetchUserEpisodes(userId),
    enabled: !!userId
  });
};
