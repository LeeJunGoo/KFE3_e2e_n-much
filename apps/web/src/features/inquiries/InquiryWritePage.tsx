import { notFound } from 'next/navigation';
import { getAuctionSummaryInfoWithAddress } from 'src/entities/auction/api';
import EpisodeAuctionCard from 'src/features/episode/EpisodeAuctionCard';
import InquiryForm from 'src/features/inquiries/components/InquiryForm';
import { createServer } from 'src/shared/supabase/client/server';
import PageContainer from 'src/shared/ui/PageContainer';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

//TODO - DB 테이블 생성 후 이동 예정
type InquiryRow = {
  inquiry_id: string;
  auction_id: string;
  user_id: string;
  title: string;
  description: string;
};

const InquiryWritePage = async ({ searchParams }: { searchParams: Promise<{ auction_id: string }> }) => {
  const auctionId = (await searchParams).auction_id;
  let initialInquiryInfo: InquiryRow | null = null;

  // NOTE - 경매 상품 및 업체 정보
  const auctionInfo = await getAuctionSummaryInfoWithAddress(auctionId!);

  //NOTE - episodeId true: 수정, false: 등록
  if (auctionId) {
    //TODO - DB 테이블 생성 후 작업 예정
    // initialInquriyInfo = await getInquriyInfo(auctionId);

    initialInquiryInfo = {
      inquiry_id: '1',
      auction_id: auctionId,
      user_id: 'user-1',
      title: '테스트',
      description: '테스트입니다.'
    };
  }

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
