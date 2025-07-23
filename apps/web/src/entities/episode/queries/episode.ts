import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEpisodeInfo } from 'src/entities/episode/api';
import { episodesListKeys } from 'src/entities/episode/queries/keys/queryKeyFactory';
import type { EpisodeRow } from 'src/shared/supabase/types';

export const useDeleteEpisodeMutation = ({
  auctionId,
  currentPage
}: {
  auctionId: EpisodeRow['auction_id'];
  currentPage: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (episodeId: EpisodeRow['episode_id']) => deleteEpisodeInfo(episodeId),
    onSuccess: () => {
      toast.success('정상적으로 삭제 되었습니다.');
      queryClient.invalidateQueries({
        queryKey: episodesListKeys.item({ auctionId, page: currentPage })
      });
    },
    onError: (error) => {
      toast.error('경매 물품을  삭제하지 못했습니다. 다시 시도해주세요.');
      console.error(error.message);
    }
  });
};
