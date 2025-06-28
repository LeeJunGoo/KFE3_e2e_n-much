import { formatNumber } from 'src/utils/formatNumber';

const PointOverview = () => {
  return (
    <>
      <p className="mb-2 flex items-center gap-1 text-(--color-accent)">
        <span className="text-3xl font-bold">{formatNumber(2230)}</span>
        <span className="text-xl font-medium">P</span>
      </p>
      <p className="text-xs text-(--color-warm-gray)">마지막 업데이트 : 2025년 6월 27일</p>
    </>
  );
};

export default PointOverview;
