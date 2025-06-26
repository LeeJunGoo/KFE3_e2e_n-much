import UIButton from 'src/components/common/UIButton';
import type { AuctionListItemProps } from 'src/types/mypage';

const AuctionListItem = ({ item }: AuctionListItemProps) => {
  const { title, currentPrice, myBidAmount, endDate, status } = item;

  return (
    <li className="mb-4 rounded-xl bg-white p-4 shadow-xs">
      <div className="flex items-baseline gap-3 border-b border-(--color-warm-gray)/30 pb-4">
        <div className="size-26 overflow-hidden rounded-lg border border-amber-100">
          <p className="h-full w-full">이미지영역</p>
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="line-clamp-1 font-medium">{title}</h3>
            <div className="inline-flex items-center rounded-md border border-transparent bg-[#28A745] px-2.5 py-0.5 text-xs font-semibold text-white">
              {status}
            </div>
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            <p className="flex justify-between text-sm">
              <span className="text-(--color-warm-gray)">최종 낙찰가</span>
              <span>{currentPrice} 원</span>
            </p>
            <p className="flex items-baseline justify-between text-sm">
              <span className="text-(--color-warm-gray)">내 최종 입찰가</span>
              <span className="text-base font-medium text-(--color-accent)">{myBidAmount} 원</span>
            </p>
            <p className="flex justify-between text-sm text-(--color-warm-gray)">
              <span>경매 종료일</span>
              <time>{endDate}</time>
            </p>
          </div>
        </div>
      </div>
      <UIButton className="mt-3 w-full">상세보기</UIButton>
    </li>
  );
};

export default AuctionListItem;
