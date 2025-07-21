import { Button } from '@repo/ui/components/ui/button';
import PointDisplay from 'src/shared/ui/PointDisplay';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import BaseCard from 'src/widgets/BaseCard';

const MyAuctionListItem = () => {
  return (
    <BaseCard as="li">
      <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b pb-4">
        <div className="size-26 overflow-hidden rounded-lg border">
          {/* {item.image_urls ? (
            <Image
              src={item.image_urls[0] || ''}
              alt={title}
              width={104}
              height={104}
              className="h-full w-full object-cover"
            />
          ) : ( */}
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
            이미지 없음
          </div>
          {/* )} */}
        </div>
        <div className="flex-1">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="line-clamp-1 font-medium">경매타이틀</h3>
            {/* <LabelBadge status={status} variant={statusVariant}>
              {statusLabel}
            </LabelBadge> */}
            진행중
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            <p className="flex justify-between text-sm">
              <span className="text-(--color-warm-gray)">최종 낙찰가</span>
              <PointDisplay amount={1000} className="text-(--color-warm-gray) font-semibold" />
            </p>
            <p className="flex items-baseline justify-between text-sm">
              <span className="text-(--color-warm-gray)">내 최종 입찰가</span>
              <PointDisplay amount={1000} className="text-base" />
            </p>
            <p className="text-(--color-warm-gray) flex justify-between text-sm">
              <span>경매 종료일</span>
              <time>{formatYYYYMMDD('2025-05-05')}</time>
            </p>
          </div>
        </div>
      </div>
      <Button variant="base" className="mt-3 w-full">
        상세보기
      </Button>
    </BaseCard>
  );
};

export default MyAuctionListItem;
