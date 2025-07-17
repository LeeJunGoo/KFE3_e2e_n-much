import { Badge } from '@repo/ui/components/ui/badge';
import { Card } from '@repo/ui/components/ui/card';
import Link from 'next/link';
import AuctionTimer from 'src/features/auction/shared/AuctionTimer';
import type { UserInfoType } from 'src/app/api/auth/user-info/route';
import type { SellerInfoType } from 'src/entities/auction/types';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionDetail = ({
  auctionInfo,
  userInfo
}: {
  auctionInfo: AuctionRow & SellerInfoType;
  userInfo: UserInfoType;
}) => {
  const isBuyer = userInfo.role === 'BUYER';

  //FIXME - 현재 경매가 종료 시 status 변경이 없으므로, Badge의 상태가 OPEN으로 고정
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'CLOSED':
        return 'error';
      default:
        return 'success';
    }
  };
  return (
    //  경매 정보
    <Card className="mb-4 rounded-t-2xl p-5 shadow-md">
      <div className="mb-2">
        <div className="mb-2 flex items-start justify-between">
          <h1 className="text-(--color-text-base) text-xl font-bold leading-tight">{auctionInfo.title}</h1>
          <Badge variant={getStatusBadgeColor(auctionInfo.status)} className="ml-2">
            {auctionInfo.status}
          </Badge>
        </div>
        <p className="text-(--color-warm-gray) mb-3 text-sm">{auctionInfo.description}</p>

        <AuctionTimer startTime={auctionInfo.start_time} endTime={auctionInfo.end_time} />

        <div className="mb-4">
          <p className="text-(--color-warm-gray) text-sm">현재 최고 입찰가</p>
          <p className="text-(--color-text-base) text-xl font-bold">{auctionInfo.current_point.toLocaleString()} P</p>
        </div>
        {/* 액션 버튼 */}
        <div className="flex space-x-3">
          {isBuyer && (
            <Link
              href={`/episode/${auctionInfo.auction_id}`}
              className="bg-(--color-accent) text-(--color-secondary) hover:bg-(--color-primary) flex-1 rounded-md p-2 text-center transition-colors"
            >
              사연 작성하기
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AuctionDetail;
