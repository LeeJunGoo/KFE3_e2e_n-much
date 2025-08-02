import { Skeleton } from '@repo/ui/components/ui/skeleton';

const AddressStatusSkeleton = () => {
  return (
    <div className="text-(--color-warm-gray) border-(--color-warm-gray)/30 mt-3 border-t py-4 text-sm">
      <div className="flex items-start justify-between">
        <Skeleton className="mb-5 h-6 w-10" />
      </div>
      <div className="flex items-start gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="-translate-y-1">
          <div className="mb-1 flex items-center gap-2">
            <Skeleton className="w-30 h-5" />
          </div>
          <p className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <Skeleton className="h-5 w-60" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressStatusSkeleton;
