import { Button } from '@repo/ui/components/ui/button';
import { MdInfoOutline } from 'react-icons/md';
import ListCard from '../../ListCard';
import type { UserRoleDataProps } from 'src/types/mypage';

const MyPageNotification = ({ role }: UserRoleDataProps) => {
  return (
    <ListCard as="section" className="mt-6 w-full">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">
          <MdInfoOutline className="size-5 text-(--color-accent)" />
        </div>
        <h3 className="font-medium">알림</h3>
      </div>
      {role === 'BIDDER' ? (
        <>
          <p className="text-sm leading-relaxed text-(--color-warm-gray)">
            현재 참여 중인 스토리가 2건 있습니다. 종료 시간을 확인해 주세요.
          </p>
          <Button variant="base" className="mt-3 w-full">
            스토리 확인하기
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-(--color-warm-gray)">
            현재 작성하신 경매가 2건 있습니다. 종료 시간을 확인해 주세요.
          </p>
          <Button variant="base" className="mt-3 w-full">
            경매 확인하기
          </Button>
        </>
      )}
    </ListCard>
  );
};

export default MyPageNotification;
