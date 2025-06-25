import PageHeader from 'src/components/common/PageHeader';
import PageContainer from 'src/components/layout/PageContainer';
import AuctionTabsSection from 'src/components/mypage/shared/auctions/AuctionTabsSection';

const MyAuctions = () => {
  return (
    <>
      <PageHeader title="내 경매 현황" />
      <PageContainer className="pt-2">
        <AuctionTabsSection />
      </PageContainer>
    </>
  );
};

export default MyAuctions;
