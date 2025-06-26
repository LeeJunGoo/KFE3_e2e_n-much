import PageHeader from 'src/components/common/ui/PageHeader';
import SectionHeader from 'src/components/common/ui/SectionHeader';
import PageContainer from 'src/components/layout/PageContainer';
import SectionCard from 'src/components/common/ui/SectionCard';
import TransactionSection from 'src/components/mypage/points/TransactionSection';
import { activities } from 'src/constants/mypage/mockData';
import PointOverview from 'src/components/mypage/shared/points/PointOverview';
import DateRangeFilter from 'src/components/mypage/shared/points/DateRangeFilter';
import ActivityTypeFilter from 'src/components/mypage/shared/points/ActivityTypeFilter';

const MyPoints = () => {
  return (
    <>
      <PageHeader>포인트 사용 내역</PageHeader>
      <PageContainer>
        <SectionCard className="flex flex-col items-center">
          <SectionHeader className="mb-1 text-sm font-normal">현재 보유 포인트</SectionHeader>
          <PointOverview />
        </SectionCard>
        <nav className="mt-6">
          <DateRangeFilter />
          <ActivityTypeFilter />
        </nav>
        <TransactionSection activities={activities} />
      </PageContainer>
    </>
  );
};

export default MyPoints;
