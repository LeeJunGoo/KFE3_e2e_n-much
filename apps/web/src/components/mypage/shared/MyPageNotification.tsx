import { MdInfoOutline } from 'react-icons/md';
import type { UserRoleDataProps } from 'src/types/mypage';

const MyPageNotification = ({ role }: UserRoleDataProps) => {
  return (
    <section className="mt-6 w-full rounded-xl bg-white p-4 shadow-xs">
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
          <button className="mt-3 w-full rounded-lg bg-(--color-primary) py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-(--color-accent)">
            스토리 확인하기
          </button>
        </>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-(--color-warm-gray)">
            현재 작성하신 경매가 2건 있습니다. 종료 시간을 확인해 주세요.
          </p>
          <button className="mt-3 w-full rounded-lg bg-(--color-primary) py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-(--color-accent)">
            경매 확인하기
          </button>
        </>
      )}
    </section>
  );
};

export default MyPageNotification;
