import { Card } from '@repo/ui/components/ui/card';
import { fetchEpisodesById } from 'src/entities/episode/api';
import EpisodeList from 'src/features/episode/EpisodeList';
import type { AuctionRow } from 'src/shared/supabase/types';

const EpisodeDetailSection = async ({
  auctionId,
  sellerId
}: {
  auctionId: AuctionRow['auction_id'];
  sellerId: AuctionRow['user_id'];
}) => {
  //NOTE - 에피소드 리스트 및 개수
  const episodesListData = await fetchEpisodesById(auctionId);
  const episodesCount = episodesListData.count;
  return (
    <Card className="p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-(((--color-text-base))) font-medium">사연 모음</h3>
        <span className="text-(--color-accent) text-sm">사연 {episodesCount}</span>
      </div>

      {/* 사연 리스트 */}
      <EpisodeList auction_id={auctionId} sellerId={sellerId} />
    </Card>
  );
};

export default EpisodeDetailSection;
