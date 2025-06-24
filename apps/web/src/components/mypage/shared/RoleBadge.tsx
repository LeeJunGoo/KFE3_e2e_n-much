import { Badge } from '@repo/ui/components/ui/badge';

type RoleBadgeProps = {
  role: '입찰 참여자' | '경매 진행자';
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Badge className="rounded-full border border-transparent bg-(--color-primary) px-2 py-0.5 text-xs font-semibold text-white">
      {role}
    </Badge>
  );
};

export default RoleBadge;
