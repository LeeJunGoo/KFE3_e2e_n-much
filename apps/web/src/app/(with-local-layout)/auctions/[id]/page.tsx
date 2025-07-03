import { Suspense } from 'react';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import AuctionDetail from 'src/components/auctions/detail/AuctionDetail';
import AuctionDetailICarousel from 'src/components/auctions/detail/AuctionDetailICarousel';
import AuctionDetailNavbar from 'src/components/auctions/detail/AuctionDetailNavbar';
import EpisodeDetailSection from 'src/components/auctions/detail/EpisodeDetailSection';
import HighestBuyerInfoSection from 'src/components/auctions/detail/HighestBuyerInfoSection';
import SellerInfoSection from 'src/components/auctions/detail/SellerInfoSection';
import AuctionErrorBoundary from 'src/components/common/AuctionErrorBoundary';
import LoginPrompt from 'src/components/common/LoginPrompt';
import PageContainer from 'src/components/layout/PageContainer';
import { fetchAuctionWithSellerInfo } from 'src/lib/queries/auctions';
import { fetchDetailPageUserInfo } from 'src/lib/queries/auth';
import { createClient } from 'src/lib/supabase/client/server';

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  // NOTE - 경매 상품 및 경매 업체 정보
  const auctionInfo = await fetchAuctionWithSellerInfo(auctionId);
  const { image_urls, address, seller } = auctionInfo;

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return <LoginPrompt />;
  }

  //NOTE - 로그인된 유저 정보
  const userInfo: UserInfoType = await fetchDetailPageUserInfo(user.id);

  return (
    <>
      <PageContainer className="-pt-8 -px-5 min-h-screen">
        <div className="h-68 w-full">
          {/* 이미지 슬라이더 */}
          <AuctionDetailICarousel imageUrls={image_urls} />
          {/* 상단 네비게이션 */}
          <AuctionDetailNavbar auctionId={auctionId} userInfo={userInfo} />
        </div>
        <div className="-translate-y-14 px-4">
          {/* 경매 상품 정보 */}
          <AuctionDetail auctionInfo={auctionInfo} userInfo={userInfo} />

          {/* 판매자 정보 */}
          <SellerInfoSection seller={seller} address={address} userInfo={userInfo} />
          {/* 최고 입찰자 정보 */}
          <AuctionErrorBoundary
            fallback={
              <div className="flex h-[200px] items-center justify-center border-2">
                <h3 className="text-[22px]">⚠️ 최고 입찰자 정보 섹션에서 오류가 발생했습니다.</h3>
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="flex h-[200px] items-center justify-center">
                  <span className="animate-pulse text-lg text-gray-500">{'🚚 입찰자 정보를 불러오는 중입니다...'}</span>
                </div>
              }
            >
              <HighestBuyerInfoSection auctionId={auctionId} userInfo={userInfo} />
            </Suspense>
          </AuctionErrorBoundary>
          {/* 사연 섹션 */}
          <EpisodeDetailSection auctionId={auctionId} userInfo={userInfo} sellerId={seller.seller_id} />
        </div>
      </PageContainer>
    </>
  );
};

export default AuctionDetailPage;
