import { notFound } from 'next/navigation';
import { getAuctionSummaryInfoWithAddress } from 'src/entities/auction/api';
import { getInquiryInfo } from 'src/entities/inquiry/api';
import EpisodeAuctionCard from 'src/features/episode/EpisodeAuctionCard';
import InquiryForm from 'src/features/inquiries/components/InquiryForm';
import { createServer } from 'src/shared/supabase/client/server';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import type { InquiryRow } from 'src/shared/supabase/types';

const InquiryWritePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auctionId, inquiryId] = (await params).id;
  let initialInquiryInfo: InquiryRow | null = null;

  // NOTE - 경매 상품 및 업체 정보
  const auctionInfo = await getAuctionSummaryInfoWithAddress(auctionId!);

  //NOTE - true: 수정, false: 등록
  if (inquiryId) {
    //TODO - DB 테이블 생성 후 작업 예정
    initialInquiryInfo = await getInquiryInfo(inquiryId);
  }
  // console.log(initialInquiryInfo);

  //NOTE - 로그인된 유저 정보
  const supabase = await createServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  return (
    <>
      <DetailPageHeader>{initialInquiryInfo ? '문의 수정하기' : '문의 등록하기'}</DetailPageHeader>
      <PageContainer>
        <EpisodeAuctionCard auctionInfo={auctionInfo} />
        <InquiryForm auctionId={auctionId!} initialInquiryInfo={initialInquiryInfo} userId={user.id} />
      </PageContainer>
    </>
  );
};

export default InquiryWritePage;
