import InquiryList from 'src/features/inquiries/components/InquiryList';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

const InquiriesPage = () => {
  return (
    <>
      <DetailPageHeader>문의 내역</DetailPageHeader>
      <PageContainer>
        <InquiryList />
      </PageContainer>
    </>
  );
};

export default InquiriesPage;
