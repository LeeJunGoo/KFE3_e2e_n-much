import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaRegCommentDots } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import AuctionDetailCard from 'src/components/auctions/detail/AuctionDetailCard';
import AuctionTimer from 'src/components/auctions/detail/AuctionTimer';
import EditDeleteActions from 'src/components/auctions/detail/EditDeleteActions';
import EpisodeList from 'src/components/auctions/detail/EpisodeList';
import { fetchAuctionWithSellerInfo, fetchHighestBidder, fetchSellerAuctionCount } from 'src/lib/queries/auctions';
import { formatNumber } from 'src/utils/formatNumber';
import BuyerTestImage from 'assets/images/test.png';
import { getAuthInfo } from 'src/lib/supabase/query/auth';
import { Dialog } from '@repo/ui/components/ui/dialog';
import AuctionDetail from 'src/components/auctions/detail/AuctionDetail';
import { Card } from '@repo/ui/components/ui/card';
import { AlignVerticalJustifyStart } from 'lucide-react';
import AuctionDetailICarousel from 'src/components/auctions/detail/AuctionDetailICarousel';
import PageContainer from 'src/components/layout/PageContainer';
import AuctionDetailNavbar from 'src/components/auctions/detail/AuctionDetailNavbar';

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  // NOTE - 로그인 정보
  const userInfo = await getAuthInfo();
  // <Button variant="base" size="sm">
  //   asdfasdfasdf
  // </Button>
  const [auctionInfo, highestBuyer] = await Promise.all([
    fetchAuctionWithSellerInfo(auctionId), // NOTE - 경매 상품 및 경매 업체 정보
    fetchHighestBidder(auctionId) // NOTE - 최고 입찰자의 정보
  ]);

  const { title, current_point, start_time, end_time, image_urls, description, seller_id, address, seller } =
    auctionInfo;

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

        {/* </div> */}
        {/* 메인 콘텐츠 */}
        <div className="relative z-10 flex-1 -translate-y-10 px-4 pb-20">
          {/* 경매 상품 정보 */}
          <AuctionDetail auctionInfo={auctionInfo} />

          {/* 판매자 정보 */}
          <Card className="mb-4 p-5 shadow-sm">
            {/* <div className="mb-4 flex items-center">
              <AlignVerticalJustifyStart className="mr-3 h-12 w-12">
                <AvatarImage src={auctionData.seller.profileImage} alt={auctionData.seller.name} />
                <AvatarFallback>{auctionData.seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-[#1F1F25]">{auctionData.seller.name}</h3>
                <p className="text-sm text-[#B8B8B8]">{auctionData.seller.address}</p>
              </div>
            </div> */}
            <div className="flex text-sm text-[#B8B8B8]">
              <div className="flex-1">
                <p>총 경매</p>
                <p className="font-medium text-[#1F1F25]">{totalAuctions}개</p>
              </div>
              <div className="flex-1">
                <p>진행중인 경매</p>
                <p className="font-medium text-[#1F1F25]">{activeAuctions}개</p>
              </div>
            </div>
          </Card>
          {/* 최고 입찰자 정보 */}
          {/* <Card className="mb-4 p-5 shadow-sm">
            <h3 className="mb-3 font-medium text-[#1F1F25]">현재 최고 입찰</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#A3BCE5] text-white">
                  <i className="fas fa-user-alt text-xs"></i>
                </div>
                <div>
                  <p className="font-medium text-[#1F1F25]">{auctionData.topBidder.nickname}</p>
                  <p className="text-xs text-[#B8B8B8]">{auctionData.topBidder.bidTime}</p>
                </div>
              </div>
              <p className="font-bold text-[#5B80C2]">{auctionData.topBidder.bidAmount.toLocaleString()} P</p>
            </div>
          </Card> */}
          {/* 사연 섹션
          <Card className="mb-4 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-[#1F1F25]">사연 모음</h3>
              <span className="text-sm text-[#5B80C2]">사연 {auctionData.stories.length}</span>
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
                    <span className="text-xs text-[#B8B8B8]">{story.createdAt.split(' ')[0]}</span>
                  </div>
                  <h4 className="mb-1 font-medium text-[#1F1F25]">{story.title}</h4>
                  <p className="mb-1 line-clamp-2 text-sm text-[#B8B8B8]">{story.content}</p>
                  <div className="flex items-center justify-between">
                    <button
                      className="cursor-pointer text-xs text-[#5B80C2]"
                      onClick={() => {
                        setSelectedStory(story);
                        setShowStoryModal(true);
                      }}
                    >
                      더보기
                    </button>
                    {story.author === '쿠키마니아' && (
                      <div className="flex space-x-2">
                        <button className="cursor-pointer text-xs text-[#B8B8B8]">수정</button>
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
                </div>
              </div>
            )}
          </Card>
        </div> */}
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
                    <p className="font-medium text-[#1F1F25]">{selectedStory.author}</p>
                    <p className="text-xs text-[#B8B8B8]">{selectedStory.createdAt}</p>
                  </div>
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#1F1F25]">{selectedStory.title}</h3>
                <p className="mb-6 text-sm whitespace-pre-line text-[#1F1F25]">{selectedStory.content}</p>
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
