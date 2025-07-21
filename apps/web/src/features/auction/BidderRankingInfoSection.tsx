import { Card } from '@repo/ui/components/ui/card';
import { FaRegCommentDots } from 'react-icons/fa6';
import { getBidderRanking } from 'src/entities/auction/api';
import type { AuctionRow } from 'src/shared/supabase/types';

const BidderRankingInfoSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const highestBuyer = await getBidderRanking(auctionId);
  const userNickname = '닉네임';
  // const userNickname = highestBuyer?.buyer.nickname ?? userInfo.social_name;
  // const date = formatYYYYMMDD();

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <h3 className="text-(--color-text-base) font-medium">현재 최고 입찰</h3>
      {highestBuyer ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* <UserAvatar src={highestBuyer.buyer.avatar!} alt={userNickname!} size="sm" /> */}
            <div>
              <div className="flex items-center gap-1">
                <p className="text-(--color-text-base) text-sm font-medium">{userNickname}</p>
                {/* <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(highestBuyer.buyer.email)}&#41;</p> */}
              </div>
              {/* <p className="text-(--color-warm-gray) text-xs">{formatKoreanDate(highestBuyer.bid_time)}</p> */}
            </div>
          </div>
          {/* <p className="text-(--color-accent) font-bold">{formatNumber(highestBuyer.bid_point)} P</p> */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-b-lg bg-slate-50 px-6 py-10 text-center">
          <FaRegCommentDots className="text-4xl text-slate-400" />
          <div>
            <p className="font-semibold text-slate-700">아직 첫 입찰자가 없어요</p>
            <p className="mt-1 text-sm text-slate-500">가장 먼저 입찰하여 상품을 차지할 기회를 잡아보세요!</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default BidderRankingInfoSection;
