import { Button } from '@repo/ui/components/ui/button';
import LabelBadge from 'src/components/common/LabelBadge';
import { STATUS_LABELS, STATUS_VARIANTS } from 'src/constants/mypage';
import { formatNumber } from 'src/utils/formatNumber';
import type { MyAuctionListItemProps } from 'src/types/mypage';

const MyAuctionListItem = ({ item }: MyAuctionListItemProps) => {
  const { title, currentPrice, myBidAmount, endDate, status } = item;

  return (
    <div>
      <div className="flex items-baseline gap-3 border-b border-(--color-warm-gray)/30 pb-4">
        <div className="size-26 overflow-hidden rounded-lg border border-amber-100">
          <p className="h-full w-full">이미지영역</p>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="line-clamp-1 font-medium">{title}</h3>
            <LabelBadge status={status} variant={STATUS_VARIANTS[status]}>
              {STATUS_LABELS[status]}
            </LabelBadge>
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            <p className="flex justify-between text-sm">
              <span className="text-(--color-warm-gray)">최종 낙찰가</span>
              <span>{formatNumber(currentPrice)} 원</span>
            </p>
            <p className="flex items-baseline justify-between text-sm">
              <span className="text-(--color-warm-gray)">내 최종 입찰가</span>
              <span className="text-base font-medium text-(--color-accent)">{formatNumber(myBidAmount)} 원</span>
            </p>
            <p className="flex justify-between text-sm text-(--color-warm-gray)">
              <span>경매 종료일</span>
              <time>{endDate}</time>
            </p>
          </div>
        </div>
      </div>
      <Button variant="base" className="mt-3 w-full">
        상세보기
      </Button>
    </div>
  );
};

export default MyAuctionListItem;
