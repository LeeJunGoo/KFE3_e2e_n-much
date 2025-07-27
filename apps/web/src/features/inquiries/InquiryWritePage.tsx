import AuctionSummaryCard from 'src/features/episode/card/AuctionSummaryCard';
import InquiryForm from 'src/features/inquiries/components/InquiryForm';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const InquiryWritePage = () => {
  return (
    <>
      <DetailPageHeader>문의 작성하기</DetailPageHeader>
      <PageContainer>
        {/* <AuctionSummaryCard auctionInfo={auctionInfo} /> */}
        <InquiryForm />
      </PageContainer>
    </>
  );
};

export default InquiryWritePage;
