import { Badge } from '@repo/ui/components/ui/badge';
import { BID_STATUS_LABEL } from 'src/constants/mypage';

export type BidStatusType = (typeof BID_STATUS_LABEL)[keyof typeof BID_STATUS_LABEL];

type StatusBadgeProps = {
  status: BidStatusType;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const colorMap: Record<BidStatusType, string> = {
    진행중: 'bg-(--color-accent) text-white',
    '낙찰 예정': 'bg-(--color-green) text-white',
    종료됨: 'bg-(--color-warm-gray) text-white'
  };

  return <Badge className={colorMap[status]}>{status}</Badge>;
};

export default StatusBadge;
