import { Card } from '@repo/ui/components/ui/card';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import { fetchEpisodesById } from 'src/entities/episode/api';
import { AuctionRow, SellerRow } from 'src/shared/supabase/types';
import EpisodeList from './EpisodeList';

const EpisodeDetailSection = async ({
  auctionId,
  userInfo,
  sellerId
}: {
  auctionId: AuctionRow['auction_id'];
  userInfo: UserInfoType;
  sellerId: SellerRow['seller_id'];
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
      <EpisodeList auction_id={auctionId} userInfo={userInfo} sellerId={sellerId} />
    </Card>
  );
};

export default EpisodeDetailSection;
