import { Card } from '@repo/ui/components/ui/card';
import Link from 'next/link';
import AuctionTimerDynamic from 'src/features/auction/AuctionTimerDynamic';
import BaseBadge from 'src/shared/ui/BaseBadge';
import type { AuctionInfoWithAddressType } from 'src/entities/auction/types';

const AuctionDetail = ({ auctionInfo }: { auctionInfo: AuctionInfoWithAddressType }) => {
  const badgeVariant = auctionInfo.status === 'OPEN' ? 'accent' : 'red';
  const auctionStatus = auctionInfo.status === 'OPEN' ? 'OPEN' : 'CLOSED';

  return (
    //  경매 정보
    <Card className="mb-4 rounded-t-2xl p-5 shadow-md">
      <div className="mb-2">
        <div className="mb-2 flex items-start justify-between">
          <h1 className="text-(--color-text-base) text-xl font-bold leading-tight">{auctionInfo.title}</h1>
          <BaseBadge variant={badgeVariant} className="ml-2">
            {auctionStatus}
          </BaseBadge>
        </div>
        <p className="text-(--color-warm-gray) mb-3 text-sm">{auctionInfo.description}</p>

        <AuctionTimerDynamic endDate={auctionInfo.end_date} />
        <div className="mb-4">
          <p className="text-(--color-warm-gray) text-sm">현재 최고 입찰가</p>
          <p className="text-(--color-text-base) text-xl font-bold">{auctionInfo.current_point.toLocaleString()} P</p>
        </div>
        {/* //FIXME - Seller일 경우만 */}
        <div className="flex space-x-3">
          <Link
            href={`/episode/${auctionInfo.auction_id}`}
            className="bg-(--color-accent) text-(--color-secondary) hover:bg-(--color-primary) flex-1 rounded-md p-2 text-center transition-colors"
          >
            사연 작성하기
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default AuctionDetail;
