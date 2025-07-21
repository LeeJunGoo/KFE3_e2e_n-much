import PageTitle from 'src/shared/ui/PageTitle';
import BaseCard from 'src/widgets/BaseCard';
import PointDisplay from 'src/shared/ui/PointDisplay';

const PointHistory = () => {
  return (
    <>
      <PageTitle as="h3" className="mb-2 mt-8 font-semibold">
        거래 내역
      </PageTitle>
      <ul className="space-y-3">
        <BaseCard as="li" className="flex items-center justify-between">
          <p>빈티지 아이템 경매 참여</p>
          <PointDisplay amount={1000} className="font-semibold" />
          {/* <ActivityItem activity={activity} size="md" /> */}
          {/* {'amount' in activity ? <PointSummary amount={activity.amount} balance={2730} /> : null} */}
        </BaseCard>
      </ul>
    </>
  );
};

export default PointHistory;
