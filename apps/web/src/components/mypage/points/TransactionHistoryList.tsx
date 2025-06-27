import ListCard from 'src/components/common/ui/ListCard';
import PointSummary from '../shared/points/PointSummary';
import ActivityItem from '../shared/ActivityItem';
import type { Activity } from 'src/types/mypage';

interface TransactionHistoryListProps {
  activities: Activity[];
}

const TransactionHistoryList = ({ activities }: TransactionHistoryListProps) => {
  return (
    <ul className="space-y-3">
      {activities.map((activity, idx) => (
        <ListCard key={idx} as="li" className="flex items-center justify-between">
          <ActivityItem activity={activity} size="md" />
          {'amount' in activity ? <PointSummary amount={activity.amount} balance={2730} /> : null}
        </ListCard>
      ))}
    </ul>
  );
};

export default TransactionHistoryList;
