import InquiryListItem from 'src/features/inquiries/components/InquiryListItem';

const InquiryList = () => {
  // const { inquiryList, inquiryCount } = await getInquiriesByUserId(userId);

  // NOTE - 경매 상품 및 업체 정보
  // const auctionInfo = await getAuctionSummaryInfoWithAddress(auctionId!);

  return (
    <ul>
      <InquiryListItem />
    </ul>
  );
};

export default InquiryList;
