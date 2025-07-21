import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import AuctionDetailCarousel from 'src/features/auction/AuctionDetailCarousel';
import AuctionDetailInfo from 'src/features/auction/AuctionDetailInfo';
import AuctionDetailNavbar from 'src/features/auction/AuctionDetailNavbar';
import SellerInfoSection from 'src/features/auction/SellerInfoSection';
import PageContainer from 'src/shared/ui/PageContainer';

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;
  console.log('🚀 ~ AuctionDetailPage ~ id:', auctionId);

  // NOTE - 경매 상품 및 경매 업체 정보
  const auctionInfo = await getAuctionInfoWithAddress(auctionId);

  // const { image_urls, address, seller } = auctionInfo;

  // const supabase = await createServer();
  // const {
  //   data: { user }
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return;
  // }

  // NOTE - 로그인된 유저 정보
  // const userInfo: UserInfoType = await fetchDetailPageUserInfo(user.id);

  return (
    <PageContainer className="-pt-8 -px-5 min-h-screen">
      <div className="h-68 w-full">
        {/* 이미지 슬라이더 */}
        <AuctionDetailCarousel imageUrls={auctionInfo.image_urls} />
        {/* 상단 네비게이션 */}
        <AuctionDetailNavbar auctionId={auctionId} />
      </div>
      <div className="-translate-y-14 px-4">
        {/* 경매 상품 정보 */}
        <AuctionDetailInfo auctionInfo={auctionInfo} />

        {/* 판매자 정보 */}
        <SellerInfoSection auctionInfo={auctionInfo} />
        {/* 최고 입찰자 정보 */}
        {/* <AuctionErrorBoundary
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
          </AuctionErrorBoundary> */}
        {/* 사연 섹션 */}
        {/* <EpisodeDetailSection auctionId={auctionId} userInfo={userInfo} sellerId={seller.seller_id} /> */}
      </div>
    </PageContainer>
  );
};

export default AuctionDetailPage;
