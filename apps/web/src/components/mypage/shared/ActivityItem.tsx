import { twMerge } from 'tailwind-merge';
import { FaCoins, FaCartShopping, FaGift, FaUserPlus, FaGavel } from 'react-icons/fa6';
import type { Activity } from 'src/types/mypage';

type ActivityItemProps = {
  activity: Activity;
  size?: 'sm' | 'md';
};

const ActivityItem = ({ activity, size = 'sm' }: ActivityItemProps) => {
  const { title, date, type } = activity;

  // 아이콘 매핑 (MdAuction → FaGavel로 변경)
  const getIcon = (activityType: string) => {
    switch (activityType) {
      case 'charge':
        return FaCoins;
      case 'auction':
        return FaGavel; // 경매 아이콘
      case 'purchase':
        return FaCartShopping;
      case 'event':
        return FaGift;
      case 'signup':
        return FaUserPlus;
      default:
        return FaCoins;
    }
  };

  // 사이즈별 스타일
  const getSizeStyles = (size: string) => {
    return size === 'md'
      ? { container: 'w-12 h-12', icon: 'text-lg', gap: 'gap-3' }
      : { container: 'w-8 h-8', icon: 'text-sm', gap: 'gap-2' };
  };

  const Icon = getIcon(type);
  const styles = getSizeStyles(size);

  return (
    <div className={twMerge('flex items-center', styles.gap)}>
      <div
        className={twMerge('flex items-center justify-center rounded-full bg-(--color-secondary)', styles.container)}
      >
        <Icon className={twMerge('text-(--color-accent)', styles.icon)} />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-medium">{title}</h4>
        <time className="text-xs text-(--color-warm-gray)">{date}</time>
      </div>
    </div>
  );
};

export default ActivityItem;
