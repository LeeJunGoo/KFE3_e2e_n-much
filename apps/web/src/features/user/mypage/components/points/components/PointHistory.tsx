import PageTitle from 'src/shared/ui/PageTitle';
import BaseCard from 'src/widgets/BaseCard';

const PointHistory = () => {
  return (
    <div>
      <PageTitle as="h3">거래 내역</PageTitle>
      <ul className="space-y-3">
        <BaseCard as="li" className="flex items-center justify-between">
          3000P
          {/* <ActivityItem activity={activity} size="md" /> */}
          {/* {'amount' in activity ? <PointSummary amount={activity.amount} balance={2730} /> : null} */}
        </BaseCard>
      </ul>
    </div>
  ); 
};

export default PointHistory;
