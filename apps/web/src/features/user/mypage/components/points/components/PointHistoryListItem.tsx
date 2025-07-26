import { FaGift } from 'react-icons/fa6';
import PointDisplay from 'src/shared/ui/PointDisplay';
import BaseCard from 'src/widgets/BaseCard';

const PointHistoryListItem = () => {
  return (
    <BaseCard as="li" className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-[#EEF2FB]">
            <FaGift className="text-(--color-accent) size-5" />
          </div>
          <div>
            <p>빈티지 아이템 경매 참여</p>
            <time className="text-(--color-warm-gray) text-sm">2025년 22월 22일</time>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-0.5">
        <PointDisplay amount={1000} />
        <p className="text-(--color-warm-gray) text-xs">잔액 : 2000P</p>
      </div>
    </BaseCard>
  );
};

export default PointHistoryListItem;
