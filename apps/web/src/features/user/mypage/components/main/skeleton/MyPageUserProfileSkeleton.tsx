import { Skeleton } from '@repo/ui/components/ui/skeleton';
import BaseCard from 'src/widgets/BaseCard';

const MyPageUserProfileSkeleton = () => {
  return (
    <BaseCard as="section" variant="primary">
      <div className="flex items-start justify-between pb-1">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="w-18 h-7" />
            <Skeleton className="w-26 h-6 rounded-full" />
          </div>
          <Skeleton className="mt-2 h-4 w-40" />
        </div>
        <Skeleton className="size-14 shrink-0 rounded-full" />
      </div>
      <div className="border-(--color-warm-gray)/30 border-t pt-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </BaseCard>
  );
};

export default MyPageUserProfileSkeleton;
