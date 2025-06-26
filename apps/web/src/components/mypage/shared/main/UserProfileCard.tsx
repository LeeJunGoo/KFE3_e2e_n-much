import { ROLE_LABEL } from 'src/constants/mypage';
import RoleBadge from './RoleBadge';
import SectionCard from '../SectionCard';
import type { UserRoleDataProps } from 'src/types/mypage';

const UserProfileCard = ({ role }: UserRoleDataProps) => {
  return (
    <SectionCard>
      <div className="flex items-start justify-between">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-xl font-bold">안주원</h2>
            <RoleBadge role={ROLE_LABEL.BIDDER} />
          </div>
          <p className="text-sm text-(--color-warm-gray)">anjuwon@email.com</p>
          {role === 'AUCTIONEER' && <p className="mt-0.5 text-sm text-(--color-warm-gray)">서울특별시 서대문구</p>}
        </div>
        <div className="relative flex size-14 shrink-0 overflow-hidden rounded-full bg-(--color-primary) text-white">
          <span className="text-lg font-medium">아바타</span>
        </div>
      </div>
      <div className="mt-4 border-t border-(--color-warm-gray)/30 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm">보유 포인트</p>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-(--color-accent)">2,230</span>
            <span className="font-medium text-(--color-accent)">P</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-(--color-warm-gray)">마지막 업데이트: 2025년 6월 25일</p>
      </div>
    </SectionCard>
  );
};

export default UserProfileCard;
