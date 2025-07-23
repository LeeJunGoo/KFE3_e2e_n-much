import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import AuctionDetailCarousel from 'src/features/auction/AuctionDetailCarousel';
import AuctionDetailInfo from 'src/features/auction/AuctionDetailInfo';
import AuctionDetailNavbar from 'src/features/auction/AuctionDetailNavbar';
import BidderRankingInfoSection from 'src/features/auction/BidderRankingInfoSection';
import SellerInfoSection from 'src/features/auction/SellerInfoSection';
import EpisodeDetailSection from 'src/features/episode/EpisodeDetailSection';
import PageContainer from 'src/shared/ui/PageContainer';
import GoTopButton from 'src/shared/utils/goTopButton';

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  // //ANCHOR - 경매 상품 및 경매 업체 정보
  const auctionInfo = await getAuctionInfoWithAddress(auctionId);

  return (
    <>
      <PageContainer className="-pt-8 -px-5 min-h-screen">
        <div className="h-68 w-full">
          {/* 이미지 슬라이더 */}
          <AuctionDetailCarousel imageUrls={auctionInfo.image_urls} />
          {/* 상단 네비게이션 */}
          <AuctionDetailNavbar auctionId={auctionId} />
        </div>
        <div className="-translate-y-14 px-4">
          {/* 경매 상품 정보 */}
          <AuctionDetailInfo auctionId={auctionId} />
          {/* 판매자 정보 */}
          <SellerInfoSection auctionId={auctionId} />
          {/* 입찰자 랭킹 정보 */}
          <BidderRankingInfoSection auctionId={auctionId} />
          {/* 사연 섹션 */}
          <EpisodeDetailSection auctionId={auctionId} />
        </div>
        <GoTopButton />
      </PageContainer>
    </>
  );
};

export default AuctionDetailPage;
