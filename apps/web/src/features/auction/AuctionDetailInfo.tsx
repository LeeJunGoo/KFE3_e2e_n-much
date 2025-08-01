import { Card } from '@repo/ui/components/ui/card';
import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import { selectUser } from 'src/entities/auth/supabase/client';
import { getHasUserWrittenEpisode } from 'src/entities/episode/api';
import AuctionTimerDynamic from 'src/features/auction/timer/AuctionTimerDynamic';
import EpisodeWriteButton from 'src/features/episode/button/EpisodeWriteButton';
import { type AuctionRow } from 'src/shared/supabase/types';
import BaseBadge from 'src/shared/ui/BaseBadge';
import PageDescription from 'src/shared/ui/PageDescription';
import PageTitle from 'src/shared/ui/PageTitle';
import PointDisplay from 'src/shared/ui/PointDisplay';

const AuctionDetailInfo = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId); //ANCHOR - 경매 상품 및 경매 업체 정보

  const badgeVariant = auctionInfo.status === 'OPEN' ? 'accent' : 'lightGray';
  const auctionStatus = auctionInfo.status === 'OPEN' ? '진행중' : '종료됨';

  const userInfo = await getServerUser();
  const profile = await selectUser(userInfo!.id);
  const isWritten = await getHasUserWrittenEpisode(auctionInfo.auction_id, userInfo!.id);

  // 현재 유저가 경매 물품의 판매자인지의 여부
  const isUser = auctionInfo.user_id === userInfo?.id;
  // 현재 유저가 입찰 참  여자(buyer)인지의 여부
  const isBuyer = profile!.role === 'buyer';

  return (
    <Card className="mb-4 rounded-t-2xl p-5">
      <div className="mb-2">
        <div className="mb-2 flex items-start justify-between">
          <PageTitle size="lg">{auctionInfo.title}</PageTitle>
          <BaseBadge variant={badgeVariant} className="ml-2">
            {auctionStatus}
          </BaseBadge>
        </div>
        <div className="space-y-2">
          <PageDescription variant="ghost">{auctionInfo.description}</PageDescription>
          <AuctionTimerDynamic endDate={auctionInfo.end_date} />
          <div className="mt-10">
            <PageDescription variant="ghost">현재 최고 입찰가</PageDescription>
            <p className="text-xl font-bold">{<PointDisplay amount={auctionInfo.current_point} />}</p>
          </div>
        </div>
        {!isUser && isBuyer && (
          <EpisodeWriteButton auctionId={auctionInfo.auction_id} isWritten={isWritten} className="mt-3" />
        )}
      </div>
    </Card>
  );
};

export default AuctionDetailInfo;
