import { Card } from '@repo/ui/components/ui/card';
import AuctionDetail from 'src/components/auctions/detail/AuctionDetail';
import AuctionDetailICarousel from 'src/components/auctions/detail/AuctionDetailICarousel';
import AuctionDetailNavbar from 'src/components/auctions/detail/AuctionDetailNavbar';
import AuctionTimer from 'src/components/auctions/detail/AuctionTimer';
import PageContainer from 'src/components/layout/PageContainer';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { fetchAuctionWithSellerInfo, fetchHighestBidder, fetchSellerAuctionCount } from 'src/lib/queries/auctions';
import { formatNumber } from 'src/utils/formatNumber';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';
import { FaRegCommentDots } from 'react-icons/fa6';

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  // <Button variant="base" size="sm">
  //   asdfasdfasdf
  // </Button>
  const [auctionInfo, highestBuyer] = await Promise.all([
    fetchAuctionWithSellerInfo(auctionId), // NOTE - 경매 상품 및 경매 업체 정보
    fetchHighestBidder(auctionId) // NOTE - 최고 입찰자의 정보
  ]);

  const { title, current_point, start_time, end_time, image_urls, seller_id, address, seller } = auctionInfo;

  // NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
  const { totalAuctions, activeAuctions } = await fetchSellerAuctionCount(seller_id);

  return (
    <>
      <PageContainer className="-pt-8 -px-5">
        <div className="relative h-68 w-full">
          {/* 이미지 슬라이더 */}
          <AuctionDetailICarousel imageUrls={image_urls} />
          {/* 상단 네비게이션 */}
          <AuctionDetailNavbar auctionId={auctionId} />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 flex-1 -translate-y-10 px-4 pb-20">
          {/* 경매 상품 정보 */}
          <AuctionDetail auctionInfo={auctionInfo}>
            <AuctionTimer highestBuyer={highestBuyer} startTime={start_time} endTime={end_time} />
          </AuctionDetail>

          {/* 판매자 정보 */}
          <Card className="mb-4 p-5 shadow-sm">
            <h3 className="font-medium text-(--color-text-base)">경매자 정보</h3>
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
          <Card className="mb-4 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-(((--color-text-base))) font-medium">사연 모음</h3>
              {/* <span className="text-sm text-[#5B80C2]">사연 {auctionData.stories.length}</span>
            </div>
            <div className="space-y-4">
              {auctionData.stories.map((story, index) => (
                <div
                  key={story.id}
                  className={`pb-4 ${index < auctionData.stories.length - 1 ? 'border-b border-[#EEF2FB]' : ''}`}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF2FB]">
                        <i className="fas fa-user-alt text-[10px] text-[#5B80C2]"></i>
                      </div>
                      <span className="text-sm font-medium">{story.author}</span>
                    </div>
                    <span className="text-xs text-(--color-warm-gray)">{story.createdAt.split(' ')[0]}</span>
                  </div>
                  <h4 className="text-(((--color-text-base))) mb-1 font-medium">{story.title}</h4>
                  <p className="mb-1 line-clamp-2 text-sm text-(--color-warm-gray)">{story.content}</p>
                  <div className="flex items-center justify-between">
            
                    {story.author === '쿠키마니아' && (
                      <div className="flex space-x-2">
                        <button className="cursor-pointer text-xs text-(--color-warm-gray)">수정</button>
                        <button className="cursor-pointer text-xs text-[#D84A5F]">삭제</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {auctionData.stories.length > 4 && (
              <div className="mt-4 flex justify-center">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className={`h-2 w-2 rounded-full ${page === 1 ? 'bg-[#5B80C2]' : 'bg-[#EEF2FB]'}`}
                    ></button>
                  ))}
                </div> */}
            </div>
            {/* )} */}
          </Card>

          {/* 사연 상세 모달
        <Dialog open={showStoryModal} onOpenChange={setShowStoryModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4 text-center text-lg font-bold">사연 상세</DialogTitle>
            </DialogHeader>
            {selectedStory && (
              <div className="py-4">
                <div className="mb-4 flex items-center">
                  <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FB]">
                    <i className="fas fa-user-alt text-sm text-[#5B80C2]"></i>
                  </div>
                  <div>
                    <p className="font-medium text-(((--color-text-base)))">{selectedStory.author}</p>
                    <p className="text-xs text-(--color-warm-gray)">{selectedStory.createdAt}</p>
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-bold text-(((--color-text-base)))">{selectedStory.title}</h3>
                <p className="mb-6 text-sm whitespace-pre-line text-(((--color-text-base)))">{selectedStory.content}</p>
                <Button
                  className="!rounded-button w-full bg-[#5B80C2] text-white hover:bg-[#4A6DA8]"
                  onClick={() => setShowStoryModal(false)}
                >
                  닫기
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog> */}
          {/* 입찰 모달 */}
        </div>
      </PageContainer>
    </>
  );
};

export default AuctionDetailPage;
