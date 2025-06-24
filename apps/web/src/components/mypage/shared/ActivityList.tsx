import { FaGavel } from 'react-icons/fa6';
import { FaCoins } from 'react-icons/fa6';
import StatusBadge from './StatusBadge';
import { BID_STATUS_LABEL } from 'src/constants/mypage';

const ActivityList = () => {
  return (
    <section className="mt-6">
      <h3 className="mb-3 font-medium">최근 활동</h3>
      <ul className="rounded-xl bg-white p-4 shadow-sm">
        <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
              <FaGavel className="size-3 text-(--color-accent)" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">빈티지 카메라 경매</h4>
              <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
            </div>
          </div>
          <StatusBadge status={BID_STATUS_LABEL.ENDED} />
        </li>
        <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
              <FaGavel className="size-3 text-(--color-accent)" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">빈티지 카메라 경매</h4>
              <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
            </div>
          </div>
          <StatusBadge status={BID_STATUS_LABEL.EXPECTED} />
        </li>
        <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
              <FaGavel className="size-3 text-(--color-accent)" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">빈티지 카메라 경매</h4>
              <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
            </div>
          </div>
          <StatusBadge status={BID_STATUS_LABEL.PROGRESS} />
        </li>
        <li className="mb-3 flex items-center justify-between border-b pb-4 last:mb-0 last:border-b-0 last:pb-0">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
              <FaCoins className="size-3 text-(--color-accent)" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-medium">포인트 충전</h4>
              <time className="text-xs text-(--color-warm-gray)">2025년 6월 23일</time>
            </div>
          </div>
          <span className="font-medium text-(--color-accent)">+1,000P</span>
        </li>
      </ul>
    </section>
  );
};

export default ActivityList;
