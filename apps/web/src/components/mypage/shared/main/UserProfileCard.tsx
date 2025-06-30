import Image from 'next/image';
import RoleBadge from './RoleBadge';
import SectionCard from '../../../common/ui/SectionCard';
import { ROLE_LABEL } from 'src/constants/mypage';
import { formatNumber } from 'src/utils/formatNumber';
import type { UserRoleDataProps } from 'src/types/mypage';

const UserProfileCard = ({ role, userInfo }: UserRoleDataProps) => {
  return (
    <SectionCard>
      <div className="flex items-start justify-between">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-xl font-bold">{userInfo.nickname || userInfo.social_name || '사용자'}</h2>
            <RoleBadge role={role === 'BUYER' ? ROLE_LABEL.BUYER : ROLE_LABEL.SELLER} />
          </div>
          <p className="text-sm text-(--color-warm-gray)">{userInfo.email}</p>
          {role === 'SELLER' && (
            <p className="mt-0.5 text-sm text-(--color-warm-gray)">
              {/* 나중에 실제 주소 필드로 변경 */}
              서울특별시 서대문구
            </p>
          )}
        </div>
        <div className="relative flex size-14 shrink-0 overflow-hidden rounded-full bg-(--color-primary) text-white">
          {userInfo.avatar ? (
            <Image src={userInfo.avatar} alt="프로필" width={56} height={56} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-medium">아바타</span>
          )}
        </div>
      </div>
      <div className="mt-4 border-t border-(--color-warm-gray)/30 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">보유 포인트</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-(--color-accent)">{formatNumber(userInfo.point ?? 0)}</span>
            <span className="font-medium text-(--color-accent)">P</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-(--color-warm-gray)">
          마지막 업데이트:
          {userInfo.updated_at ? new Date(userInfo.updated_at).toLocaleDateString('ko-KR') : '정보 없음'}
        </p>
      </div>
    </SectionCard>
  );
};

export default UserProfileCard;
