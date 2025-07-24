import InquiryWritePage from 'src/features/inquiries/InquiryWritePage';

const InquiryWrite = async ({ searchParams }: { searchParams: Promise<{ auction_id: string }> }) => {
  return (
    <>
      <InquiryWritePage searchParams={searchParams} />
    </>
  );
};

export default InquiryWrite;
