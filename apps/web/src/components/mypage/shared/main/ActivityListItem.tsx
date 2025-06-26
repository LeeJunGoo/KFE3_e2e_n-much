import { FaGavel, FaCoins } from 'react-icons/fa6';
import { BID_STATUS_LABEL } from 'src/constants/mypage';
import StatusBadge from './StatusBadge';

//NOTE - 삭제 예정
export const activities: Activity[] = [
  {
    type: 'auction',
    title: '빈티지 카메라 경매',
    date: '2025년 6월 23일',
    status: 'PROGRESS'
  },
  {
    type: 'point',
    title: '포인트 충전',
    date: '2025년 6월 22일',
    amount: 1000
  },
  {
    type: 'auction',
    title: '빈티지 시계 경매',
    date: '2025년 6월 21일',
    status: 'ENDED'
  }
];

type AuctionActivity = {
  type: 'auction';
  title: string;
  date: string;
  status: keyof typeof BID_STATUS_LABEL;
};

type PointActivity = {
  type: 'point';
  title: string;
  date: string;
  amount: number;
};

type Activity = AuctionActivity | PointActivity;

type ActivityListItemProps = {
  activity: Activity;
};

const ActivityListItem = ({ activity }: ActivityListItemProps) => {
  const { type, title, date } = activity;

  return (
    <li className="mb-3 flex items-center justify-between border-b border-(--color-warm-gray)/30 pb-4 last:mb-0 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-full bg-(--color-secondary)">
          {type === 'auction' ? (
            <FaGavel className="size-3 text-(--color-accent)" />
          ) : (
            <FaCoins className="size-3 text-(--color-accent)" />
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm font-medium">{title}</h4>
          <time className="text-xs text-(--color-warm-gray)">{date}</time>
        </div>
      </div>
      {type === 'auction' ? (
        <StatusBadge status={BID_STATUS_LABEL[activity.status]} />
      ) : (
        <span className="font-medium text-(--color-accent)">+{activity.amount.toLocaleString()}P</span>
      )}
    </li>
  );
};

export default ActivityListItem;
