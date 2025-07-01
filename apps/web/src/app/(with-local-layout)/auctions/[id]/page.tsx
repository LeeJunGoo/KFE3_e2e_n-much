import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { Card } from '@repo/ui/components/ui/card';
import { FaRegCommentDots } from 'react-icons/fa6';
import AuctionDetail from 'src/components/auctions/detail/AuctionDetail';
import AuctionDetailICarousel from 'src/components/auctions/detail/AuctionDetailICarousel';
import AuctionDetailNavbar from 'src/components/auctions/detail/AuctionDetailNavbar';
import AuctionTimer from 'src/components/auctions/detail/AuctionTimer';
import EpisodeList from 'src/components/auctions/detail/EpisodeList';
import PageContainer from 'src/components/layout/PageContainer';
import { fetchAuctionWithSellerInfo, fetchHighestBidder, fetchSellerAuctionCount } from 'src/lib/queries/auctions';
import { fetchEpisodesById } from 'src/lib/queries/episodes';
import { formatNumber } from 'src/utils/formatNumber';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  const [auctionInfo, highestBuyer] = await Promise.all([
    fetchAuctionWithSellerInfo(auctionId), // NOTE - 경매 상품 및 경매 업체 정보
    fetchHighestBidder(auctionId) // NOTE - 최고 입찰자의 정보
  ]);

  const { title, current_point, start_time, end_time, image_urls, seller_id, address, seller } = auctionInfo;

  // NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
  const { totalAuctions, activeAuctions } = await fetchSellerAuctionCount(seller_id);

  //NOTE - 에피소드 리스트 및 개수
  const episodesListData = await fetchEpisodesById(auctionId);
  const episodes = episodesListData.episode;
  const episodesCount = episodesListData.count;

  return (
    <>
      <PageContainer className="-pt-8 -px-5 min-h-screen">
        <div className="h-68 w-full">
          {/* 이미지 슬라이더 */}
          <AuctionDetailICarousel imageUrls={image_urls} />
          {/* 상단 네비게이션 */}
          <AuctionDetailNavbar auctionId={auctionId} />
        </div>
        {/* 메인 콘텐츠 */}
        <div className="-translate-y-14 px-4">
          {/* 경매 상품 정보 */}
          <AuctionDetail auctionInfo={auctionInfo}>
            {/* //FIXME - 타이머 한국 시간으로 수정 */}
            <AuctionTimer highestBuyer={highestBuyer} startTime={start_time} endTime={end_time} />
          </AuctionDetail>

          {/* 판매자 정보 */}
          <Card className="mb-4 p-5 shadow-sm">
            <h3 className="font-medium text-(--color-text-base)">판매자 정보</h3>
            <div className="mb-4 flex items-center">
              <Avatar className="mr-3 h-12 w-12">
                <AvatarImage src={seller.avatar!} alt={seller.nickname!} />
                {/* //FIXME - 기본 아타바로 변경해야합니다. */}
                <AvatarFallback>{'아바타가 존재하지 않습니다.'}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-(--color-text-base)">{seller.nickname}</h3>
                {/* //FIXME - 판매자의 주소로 변경해야합니다. */}
                <p className="text-sm text-(--color-warm-gray)">{address[0]}</p>
              </div>
            </div>
            <div className="flex text-sm text-(--color-warm-gray)">
              <div className="flex-1">
                <p>총 경매</p>
                <p className="font-medium text-(--color-text-base)">{totalAuctions}개</p>
              </div>
              <div className="flex-1">
                <p>진행중인 경매</p>
                <p className="font-medium text-(--color-text-base)">{activeAuctions}개</p>
              </div>
            </div>
          </Card>
          {/* 최고 입찰자 정보 */}
          <Card className="mb-4 p-5 shadow-sm">
            <h3 className="font-medium text-(--color-text-base)">현재 최고 입찰</h3>
            {highestBuyer ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* //FIXME - 아바타 이미지 넣기 */}
                  <Avatar className="mr-3 h-12 w-12">
                    <AvatarImage src={seller.avatar!} alt={seller.nickname!} />
                    {/* //FIXME - 기본 아타바로 변경해야합니다. */}
                    <AvatarFallback>{'아바타가 존재하지 않습니다.'}</AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-(--color-text-base)">{highestBuyer.buyer.nickname}</p>
                      <p className="text-xs text-(--color-warm-gray)">
                        &#40;{maskEmail(highestBuyer.buyer.email)}&#41;
                      </p>
                    </div>
                    <p className="text-xs text-(--color-warm-gray)">{formatToKoreanDateTime(highestBuyer.bid_time)}</p>
                  </div>
                </div>
                <p className="font-bold text-(--color-accent)">{formatNumber(highestBuyer.bid_point)} P</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-b-lg bg-slate-50 px-6 py-10 text-center">
                <FaRegCommentDots className="text-4xl text-slate-400" />
                <div>
                  <p className="font-semibold text-slate-700">아직 첫 입찰자가 없어요</p>
                  <p className="mt-1 text-sm text-slate-500">가장 먼저 입찰하여 상품을 차지할 기회를 잡아보세요!</p>
                </div>
              </div>
            )}
          </Card>
          {/* 사연 섹션 */}
          <Card className="p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-(((--color-text-base))) font-medium">사연 모음</h3>
              <span className="text-sm text-(--color-accent)">사연 {episodesCount}</span>
            </div>

            {/* 사연 리스트 */}
            <EpisodeList auction_id={auctionId} />
          </Card>

          {/* 입찰 모달 */}
        </div>
      </PageContainer>
    </>
  );
};

export default AuctionDetailPage;
