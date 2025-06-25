import { activities } from './ActivityItem';
import ActivityItem from './ActivityItem';
import type { UserRoleDataProps } from 'src/types/mypage';

const ActivityList = ({ role }: UserRoleDataProps) => {
  if (role === 'BIDDER') {
    const recent = activities.slice(0, 5); // 최신순 5개만

    return (
      <section className="mt-6">
        <h3 className="mb-3 font-medium">최근 활동</h3>
        <ul className="rounded-xl bg-white p-4 shadow-sm">
          {recent.map((activity, idx) => (
            <ActivityItem key={idx} activity={activity} />
          ))}
        </ul>
      </section>
    );
  }

  if (role === 'AUCTIONEER') {
    const onlyAuctions = activities.filter((a) => a.type === 'auction');

    return (
      <section className="mt-6">
        <h3 className="mb-3 font-medium">최근 활동</h3>
        <ul className="rounded-xl bg-white p-4 shadow-sm">
          {onlyAuctions.map((activity, idx) => (
            <ActivityItem key={idx} activity={activity} />
          ))}
        </ul>
      </section>
    );
  }
  return null;
};

export default ActivityList;
