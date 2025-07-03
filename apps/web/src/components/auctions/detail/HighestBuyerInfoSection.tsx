import { Card } from '@repo/ui/components/ui/card';
import { FaRegCommentDots } from 'react-icons/fa6';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import UserAvatar from 'src/components/common/UserAvatar';
import { fetchHighestBidder } from 'src/lib/queries/auctions';
import { AuctionRow } from 'src/lib/supabase/type';
import { formatNumber } from 'src/utils/formatNumber';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';

const HighestBuyerInfoSection = async ({
  auctionId,
  userInfo
}: {
  auctionId: AuctionRow['auction_id'];
  userInfo: UserInfoType;
}) => {
  // NOTE - 최고 입찰자의 정보
  const highestBuyer = await fetchHighestBidder(auctionId);
  const userNickname = highestBuyer?.buyer.nickname ?? userInfo.social_name;

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <h3 className="font-medium text-(--color-text-base)">현재 최고 입찰</h3>
      {highestBuyer ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserAvatar src={highestBuyer.buyer.avatar!} alt={userNickname!} size="sm" />
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-(--color-text-base)">{userNickname}</p>
                <p className="text-xs text-(--color-warm-gray)">&#40;{maskEmail(highestBuyer.buyer.email)}&#41;</p>
              </div>
              <p className="text-xs text-(--color-warm-gray)">{formatToKoreanDateTime(highestBuyer.bid_time)}</p>
            </div>
          </div>
          <p className="font-bold text-(--color-accent)">{formatNumber(highestBuyer.bid_point)} P</p>
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

export default HighestBuyerInfoSection;
