import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteEpisodeInfo, getUserBidPointAmount } from 'src/entities/episode/api';
import { USER_BID_POINT_AMOUNT } from 'src/entities/episode/constants';
import { episodesListKeys } from 'src/entities/episode/queries/keys/queryKeyFactory';
import type { AuctionRow, EpisodeRow, UserRow } from 'src/shared/supabase/types';

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

export const useUserBidPointAmount = (
  auctionId: AuctionRow['auction_id'],
  userId: UserRow['id'],
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [USER_BID_POINT_AMOUNT, auctionId, userId],
    queryFn: () => getUserBidPointAmount(userId),
    enabled: options?.enabled ?? true
  });
};
