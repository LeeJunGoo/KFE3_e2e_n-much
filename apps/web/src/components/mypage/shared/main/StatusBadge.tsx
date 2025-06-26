import { Badge } from '@repo/ui/components/ui/badge';
import { BID_STATUS_LABEL } from 'src/constants/mypage';

export type BidStatusType = (typeof BID_STATUS_LABEL)[keyof typeof BID_STATUS_LABEL];

type StatusBadgeProps = {
  status: BidStatusType;
};

const variantMap = {
  진행중: 'warning',
  '낙찰 예정': 'info',
  종료됨: 'muted'
} as const;

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge variant={variantMap[status]}>{status}</Badge>;
};

export default StatusBadge;
