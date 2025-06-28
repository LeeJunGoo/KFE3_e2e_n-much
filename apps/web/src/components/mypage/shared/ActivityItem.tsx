import { twMerge } from 'tailwind-merge';
import { ACTIVITY_MAP, SIZE_MAP } from 'src/constants/mypage';
import type { Activity } from 'src/types/mypage';

type Props = {
  activity: Activity;
  size?: 'sm' | 'md';
};

const ActivityItem = ({ activity, size = 'sm' }: Props) => {
  const { title, date, type } = activity;
  const { icon: Icon } = ACTIVITY_MAP[type];
  const styles = SIZE_MAP[size];

  return (
    <div className={twMerge('flex items-center gap-2', styles.gap)}>
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
