import { Badge } from '@repo/ui/components/ui/badge';
import { ROLE_LABEL } from 'src/constants/mypage';

type RoleBadgeType = (typeof ROLE_LABEL)[keyof typeof ROLE_LABEL];

type RoleBadgeProps = {
  role: RoleBadgeType;
};

const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <Badge className="rounded-full border border-transparent bg-(--color-primary) px-2 py-0.5 text-xs font-semibold text-white">
      {role}
    </Badge>
  );
};

export default RoleBadge;
