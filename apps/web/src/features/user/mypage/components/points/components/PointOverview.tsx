import PageTitle from 'src/shared/ui/PageTitle';
import PointDisplay from 'src/shared/ui/PointDisplay';
import { formatKoreanFullDate } from 'src/shared/utils/formatKoreanDate';
import BaseCard from 'src/widgets/BaseCard';

const PointOverview = () => {
  return (
    <BaseCard as="div" variant="primary" className="w-full text-center">
      <PageTitle as="h3" className="mb-1 text-sm font-normal">
        현재 보유 포인트
      </PageTitle>
      <div>
        <p className="text-(--color-accent) mb-2">
          <PointDisplay amount={1000} className="text-2xl" />
        </p>
        <p className="text-(--color-warm-gray) text-xs">마지막 업데이트: {formatKoreanFullDate('2025-05-05')}</p>
      </div>
    </BaseCard>
  );
};

export default PointOverview;
