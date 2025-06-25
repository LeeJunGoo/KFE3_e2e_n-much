import { Badge } from '@repo/ui/components/ui/badge';
import { BID_STATUS_LABEL } from 'src/constants/mypage';

export type BidStatusType = (typeof BID_STATUS_LABEL)[keyof typeof BID_STATUS_LABEL];

type StatusBadgeProps = {
  status: BidStatusType;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const colorMap: Record<BidStatusType, string> = {
    진행중: 'bg-(--color-accent)',
    '낙찰 예정': 'bg-(--color-green)',
    종료됨: 'bg-(--color-light-gray)'
  };

  return (
    <Badge
      className={`rounded-md border border-transparent px-2.5 py-0.5 text-xs font-semibold text-white ${colorMap[status]}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
