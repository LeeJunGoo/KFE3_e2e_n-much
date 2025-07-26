'use client';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import PageTitle from 'src/shared/ui/PageTitle';
import PointDisplay from 'src/shared/ui/PointDisplay';
import BaseCard from 'src/widgets/BaseCard';

const PointOverview = () => {
  const user = useUserState();
  if (!user) return null;

  const { point } = user;

  return (
    <BaseCard as="div" variant="primary" className="w-full text-center">
      <PageTitle as="h3" className="mb-1 text-sm font-normal">
        현재 보유 포인트
      </PageTitle>
      <p className="text-(--color-accent) mb-2">
        <PointDisplay amount={point} className="text-2xl" />
      </p>
    </BaseCard>
  );
};

export default PointOverview;
