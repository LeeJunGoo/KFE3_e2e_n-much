import { Card } from '@repo/ui/components/ui/card';
import { getEpisodesByAuctionId, getEpisodesWithPagination } from 'src/entities/episode/api';
import EpisodeList from 'src/features/episode/EpisodeList';
import EpisodeEmpty from 'src/features/episode/shared/EpisodeEmpty';
import type { AuctionRow } from 'src/shared/supabase/types';

const EpisodeDetailSection = async ({
  auctionId,
  sellerId
}: {
  auctionId: AuctionRow['auction_id'];
  sellerId: AuctionRow['user_id'];
}) => {
  //NOTE - 에피소드 리스트 및 개수
  const { episodeList, episodeCount } = await getEpisodesByAuctionId(auctionId);
  // const pageList = await getEpisodesWithPagination(auctionId, 1);
  // console.log('🚀 ~ pageList:', pageList);

  return (
    <Card className="p-5 shadow-sm">
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
        <EpisodeList episodeList={episodeList} auction_id={auctionId} sellerId={sellerId} />
      )}
    </Card>
  );
};

export default EpisodeDetailSection;
