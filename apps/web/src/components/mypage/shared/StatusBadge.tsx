import { Badge } from '@repo/ui/components/ui/badge';

type StatusBadgeProps = {
  status: '진행중' | '낙찰 예정' | '종료됨';
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge>{status}</Badge>;
};

export default StatusBadge;
