import { Card } from '@repo/ui/components/ui/card';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { getEpisodesCount, getEpisodesWithPagination } from 'src/entities/episode/api';
import { episodesListKeys } from 'src/entities/episode/queries/keys/queryKeyFactory';
import EpisodeList from 'src/features/episode/EpisodeList';
import EpisodeEmpty from 'src/features/episode/shared/EpisodeEmpty';
import { type AuctionRow } from 'src/shared/supabase/types';

const EpisodeDetailSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId); //ANCHOR - 경매 상품 및 경매 업체 정보
  const { episodeCount } = await getEpisodesCount(auctionId); //ANCHOR - 경매 상품에 대한 사연 개수

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: episodesListKeys.item({ auctionId, page: 1 }),
    queryFn: () => getEpisodesWithPagination(auctionInfo.auction_id, 1)
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Card id="episode-section-header" className="p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-(--color-text-base) font-medium">사연 모음</h3>
        <p className="text-(--color-accent) flex gap-1 text-sm font-semibold">
          <span>사연</span>
          <span>{episodeCount}</span>
        </p>
      </div>

      {/* 사연 리스트 */}
      {episodeCount === 0 ? (
        <EpisodeEmpty />
      ) : (
        <HydrationBoundary state={dehydratedState}>
          <EpisodeList episodesCount={episodeCount} auctionInfo={auctionInfo} />
        </HydrationBoundary>
      )}
    </Card>
  );
};

export default EpisodeDetailSection;
