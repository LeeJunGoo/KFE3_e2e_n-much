import PageHeader from 'src/components/common/PageHeader';
import PageContainer from 'src/components/layout/PageContainer';
import AuctionTabsSection from 'src/components/mypage/shared/auctions/AuctionTabsSection';

const MyAuctions = () => {
  return (
    <>
      <PageHeader>내 경매 현황</PageHeader>
      <PageContainer className="pt-2">
        <AuctionTabsSection />
      </PageContainer>
    </>
  );
};

export default MyAuctions;
