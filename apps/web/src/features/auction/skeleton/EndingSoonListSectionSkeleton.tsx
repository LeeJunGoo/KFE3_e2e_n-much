import { Skeleton } from '@repo/ui/components/ui/skeleton';
import AuctionBaseCardSkeleton from 'src/features/auction/skeleton/AuctionBaseCardSkeleton';
import { twMerge } from 'tailwind-merge';

const EndingSoonListSectionSkeleton = () => {
  return (
    <div className="overflow-hidden">
      <div className={twMerge('mb-4 flex items-center justify-between')}>
        {/* Title skeleton */}
        <Skeleton className="h-6 w-32 rounded" />

        {/* "더보기" skeleton */}
        <Skeleton className="h-4 w-12 rounded" />
      </div>
      <ul className="flex w-max gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <AuctionBaseCardSkeleton key={i} className="w-[70%] flex-shrink-0 sm:w-[372px]" />
        ))}
      </ul>
    </div>
  );
};

export default EndingSoonListSectionSkeleton;
