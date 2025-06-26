import ActivityMeta from './ActivityMeta';
import ActivityItem from '../ActivityItem';
import type { Activity } from 'src/types/mypage';

type ActivityListItemProps = {
  activity: Activity;
};

const ActivityListItem = ({ activity }: ActivityListItemProps) => {
  return (
    <li className="mb-3 flex items-center justify-between border-b border-(--color-warm-gray)/30 pb-4 last:mb-0 last:border-b-0 last:pb-0">
      <ActivityItem activity={activity} size="sm" />
      <ActivityMeta activity={activity} />
    </li>
  );
};

export default ActivityListItem;
