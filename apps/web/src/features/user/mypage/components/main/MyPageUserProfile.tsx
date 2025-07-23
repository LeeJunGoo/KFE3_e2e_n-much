'use client';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { FiRepeat } from 'react-icons/fi';
import { useUpdateUserRole, useUserState } from 'src/entities/auth/stores/useAuthStore';
import { ROLE_CONFIG } from 'src/entities/user/mypage/main/constants';
import AddressStatus from 'src/features/user/mypage/components/main/AddressStatus';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseBadge from 'src/shared/ui/BaseBadge';
import PointDisplay from 'src/shared/ui/PointDisplay';
import BaseCard from 'src/widgets/BaseCard';

const MyPageUserProfile = () => {
  const user = useUserState();
  const updateUserRole = useUpdateUserRole();

  if (!user) return null;

  const { nick_name: name, email, user_avatar: avatarUrl } = user;

  const currentRole = (user?.role || 'buyer') as keyof typeof ROLE_CONFIG;
  const currentConfig = ROLE_CONFIG[currentRole];
  if (!currentConfig) return null;

  const roleType = currentConfig.display;
  const badgeVariant = currentConfig.variant;

  const handleRoleToggle = () => {
    const newRole = ROLE_CONFIG[currentRole].roleNext;
    updateUserRole(newRole);
    toast.success(`${ROLE_CONFIG[currentRole].roleNextToast}로 변경되었습니다.`);
  };

  return (
    <BaseCard as="section" variant="primary">
      <div>현재 role: {user?.role}</div>
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
          <BaseAvatar src={avatarUrl || ''} alt={name} size="xl" />
        </div>
      </div>
      {currentRole === 'seller' && <AddressStatus />}
      <div className="border-(--color-warm-gray)/30 border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">보유 포인트</p>
          <PointDisplay amount={1000} />
        </div>
      </div>
    </BaseCard>
  );
};

export default MyPageUserProfile;
