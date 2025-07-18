import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { FiRepeat } from 'react-icons/fi';
import { ROLE_CONFIG } from 'src/entities/user/mypage/main/constants';
import AddressStatus from 'src/features/user/mypage/components/main/AddressStatus';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseBadge from 'src/shared/ui/BaseBadge';
import BaseCard from 'src/widgets/BaseCard';
import PointDisplay from 'src/shared/ui/PointDisplay';
import type { RoleType, UserMetadata } from 'src/entities/user/mypage/main/types';

const MyPageUserProfile = ({ data }: UserMetadata) => {
  const { name, email, avatar_url: avatarUrl } = data;
  const role = 'buyer';
  const [currentRole, setCurrentRole] = useState<RoleType>(role);

  const currentConfig = ROLE_CONFIG[currentRole];
  const roleType = currentConfig.display;
  const badgeVariant = currentConfig.variant;

  const handleRoleToggle = () => {
    const config = ROLE_CONFIG[currentRole];
    setCurrentRole(config.roleNext);

    toast.success(`${config.roleNextToast}로 변경 되었습니다.`);
  };

  return (
    <BaseCard as="section" variant="primary">
      <div className="flex items-start justify-between pb-1">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-xl font-bold">{name}</h2>
            <Button variant="ghost" className="p-0" onClick={handleRoleToggle}>
              <BaseBadge className="rounded-full px-3 py-1" variant={badgeVariant}>
                {roleType}
                <FiRepeat className="ml-1" />
              </BaseBadge>
            </Button>
          </div>
          <p className="text-(--color-warm-gray) text-sm">{email}</p>
        </div>
        <div className="bg-(--color-primary) relative flex size-14 shrink-0 overflow-hidden rounded-full text-white">
          <BaseAvatar src={avatarUrl} alt={name} size="xl" />
        </div>
      </div>
      {currentRole === 'seller' && <AddressStatus />}
      <div className="border-(--color-warm-gray)/30 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">보유 포인트</p>
          <PointDisplay amount={1000} />
        </div>
        <p className="text-(--color-warm-gray) mt-1 text-xs">마지막 업데이트: 2025년 5월 25일</p>
      </div>
    </BaseCard>
  );
};

export default MyPageUserProfile;
