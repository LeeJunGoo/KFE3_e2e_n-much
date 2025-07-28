import { Skeleton } from '@repo/ui/components/ui/skeleton';
import BaseCard from 'src/widgets/BaseCard';

const PointOverviewSkeleton = () => {
  return (
    <BaseCard as="div" variant="primary" className="w-full text-center">
      <Skeleton className="mx-auto mb-2 h-4 w-24" />
      <Skeleton className="mx-auto h-8 w-32" />
    </BaseCard>
  );
};

export default PointOverviewSkeleton;
