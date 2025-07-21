import { Card } from '@repo/ui/components/ui/card';
import { getBidderRanking } from 'src/entities/auction/api';
import BidderRankingList from 'src/features/auction/BidderRankingList';
import BidEmpty from 'src/features/auction/shared/BidEmpty';
import type { AuctionRow } from 'src/shared/supabase/types';

const BidderRankingInfoSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  //FIXME - 랭킹 변화 x 수정 필요
  const bidderRankings = await getBidderRanking(auctionId);

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <h3 className="text-(--color-text-base) font-medium">현재 최고 입찰</h3>
      {bidderRankings ? <BidderRankingList bidderRankingList={bidderRankings} /> : <BidEmpty />}
    </Card>
  );
};

export default BidderRankingInfoSection;
