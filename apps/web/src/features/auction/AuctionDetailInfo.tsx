import { Card } from '@repo/ui/components/ui/card';
import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import { selectUser } from 'src/entities/auth/supabase';
import { getHasUserWrittenEpisode } from 'src/entities/episode/api';
import AuctionTimerDynamic from 'src/features/auction/AuctionTimerDynamic';
import EpisodeWriteButton from 'src/features/episode/EpisodeWriteButton';
import { type AuctionRow } from 'src/shared/supabase/types';
import BaseBadge from 'src/shared/ui/BaseBadge';
import ContentDescription from 'src/shared/ui/ContentDescription';
import ContentTitle from 'src/shared/ui/ContentTitle';
import { formatNumber } from 'src/shared/utils/formatNumber';

const AuctionDetailInfo = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId); //ANCHOR - 경매 상품 및 경매 업체 정보

  const badgeVariant = auctionInfo.status === 'OPEN' ? 'accent' : 'red';
  const auctionStatus = auctionInfo.status === 'OPEN' ? '진행중' : '종료됨';

  const userInfo = await getServerUser();
  const profile = await selectUser(userInfo!.id);
  const isWritten = await getHasUserWrittenEpisode(auctionInfo.auction_id, userInfo!.id);

  const isBuyer = profile.role === 'buyer';

  return (
    <Card className="mb-4 rounded-t-2xl p-5 shadow-md">
      <div className="mb-2">
        <div className="mb-2 flex items-start justify-between">
          <ContentTitle title={auctionInfo.title} variant="base" className="font-bold" />
          <BaseBadge variant={badgeVariant} className="ml-2">
            {auctionStatus}
          </BaseBadge>
        </div>
        <div className="space-y-2">
          <ContentDescription description={auctionInfo.description} variant="ghost" />
          <AuctionTimerDynamic endDate={auctionInfo.end_date} />
          <div className="mt-10">
            <ContentDescription description="현재 최고 입찰가" variant="ghost" />
            <p className="text-(--color-text-base) text-xl font-bold">{formatNumber(auctionInfo.current_point)} P</p>
          </div>
        </div>
        {isBuyer && <EpisodeWriteButton auctionId={auctionInfo.auction_id} isWritten={isWritten} className="mt-3" />}
      </div>
    </Card>
  );
};

export default AuctionDetailInfo;
