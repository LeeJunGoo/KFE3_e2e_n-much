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

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  // NOTE - 로그인 정보
  const userInfo = await getAuthInfo();

  const [auctionInfo, highestBuyer] = await Promise.all([
    fetchAuctionWithSellerInfo(auctionId), // NOTE - 경매 상품 및 경매 업체 정보
    fetchHighestBidder(auctionId) //NOTE - 최고 입찰자의 정보
  ]);

  const { title, current_point, start_time, end_time, image_urls, description, seller_id, address, seller } =
    auctionInfo;

  // NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
  const { totalAuctions, activeAuctions } = await fetchSellerAuctionCount(seller_id);

  return (
    <>
      <header className="mb-10">
        <div className="flex justify-between">
          <Link
            href={'/auctions'}
            className="flex items-center gap-2 text-[#8E74F2] hover:text-[#D6CBFF] transition-colors"
          >
            <FaArrowLeft />
            <span>경매 목록으로 돌아가기</span>
          </Link>
          {/* 경매 상품 수정 및 삭제 버튼  */}
          {userInfo?.id === seller_id && <EditDeleteActions auctionId={auctionId} />}
        </div>
      </header>
      <main className="space-y-7 scroll-smooth">
        <div className="bg-[#F3F4F6] p-4 rounded-lg space-y-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div>
            <p className="text-gray-400 text-sm">현재&nbsp;입찰가</p>
            <p className="text-[#8E74F2] text-lg font-semibold">{current_point}&nbsp;P</p>
          </div>
          <div>
            <AuctionTimer start_time={start_time} end_time={end_time} />
          </div>
        </div>
        <div className="px-7 space-y-7">
          {/* 이미지 슬라이드  */}
          <AuctionDetailCard image_urls={image_urls} />
          {/* 상품 정보 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">상품 정보</h2>
            </div>

            <div className="px-6 py-4 leading-relaxed text-gray-600">
              <p>{description}</p>
            </div>
          </div>

          {/* 업체 정보 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">업체 정보</h2>
            </div>
            <div className="px-6 py-4 space-y-5">
              <div className="flex gap-3">
                <Image
                  src={seller.avatar || BuyerTestImage}
                  alt="아바타입니다."
                  width={50}
                  height={50}
                  className=" bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300"
                ></Image>
                <div className="space-y-1">
                  <p className="font-semibold">업체이름: {seller.nickname}</p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt />
                    <span className="text-sm">{address}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-gray-500 text-sm">
                  <span>총 경매 수</span>
                  <span>{totalAuctions}</span>
                </p>

                <p className="flex justify-between text-gray-500 text-sm">
                  <span>현재 진행중인 경매</span>
                  <span>{activeAuctions}</span>
                </p>
              </div>
            </div>
          </div>
          {/* 최고 입찰가 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">최고 입찰가</h2>
            </div>
            {highestBuyer ? (
              <div className="px-6 py-4 space-y-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <Image
                      src={highestBuyer.buyer.avatar || BuyerTestImage}
                      alt="아바타입니다."
                      width={50}
                      height={50}
                      className=" bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300"
                    ></Image>

                    <div className="space-y-1">
                      <p className="font-semibold">{highestBuyer.buyer.nickname}</p>
                      <p className="flex items-center">
                        <IoMdTime />
                        <time className="text-sm">{highestBuyer.created_at}</time>
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold text-[#8E74F2]">
                    <p>{formatNumber(highestBuyer.bid_point)}&nbsp;P</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-10 text-center bg-slate-50 rounded-b-lg">
                <FaRegCommentDots className="text-4xl text-slate-400" />
                <div>
                  <p className="font-semibold text-slate-700">아직 첫 입찰자가 없어요</p>
                  <p className="mt-1 text-sm text-slate-500">가장 먼저 입찰하여 상품을 차지할 기회를 잡아보세요!</p>
                </div>
              </div>
            )}
          </div>
          <EpisodeList auction_id={auctionId} />
        </div>
      </main>
    </>
  );
};

export default AuctionDetailPage;
