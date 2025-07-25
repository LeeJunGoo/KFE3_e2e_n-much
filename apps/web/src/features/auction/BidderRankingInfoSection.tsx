import { Card } from '@repo/ui/components/ui/card';
import { getBidderRanking } from 'src/entities/auction/api';
import BidderRankingList from 'src/features/auction/BidderRankingList';
import BidEmpty from 'src/features/auction/shared/BidEmpty';
import PageTitle from 'src/shared/ui/PageTitle';
import type { AuctionRow } from 'src/shared/supabase/types';

const BidderRankingInfoSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  //FIXME - 랭킹 변화 x 수정 필요
  const bidderRankings = await getBidderRanking(auctionId);
  const isBidder = bidderRankings && bidderRankings.length > 0;

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <PageTitle className="font-medium" size="md" order="left">
        현재 최고 입찰
      </PageTitle>
      {/* {isBidder ? <BidderRankingList bidderRankingList={bidderRankings} /> : <BidEmpty />} */}
    </Card>
  );
};

export default BidderRankingInfoSection;
