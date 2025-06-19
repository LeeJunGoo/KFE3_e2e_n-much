import AuctionDetailCard from '@repo/ui/components/auctions/AuctionDetailCard';
import EpisodeList from '@repo/ui/components/auctions/EpisodeList';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaRegCommentDots } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

//mock data 현재 constants에 넣어둠, 나중에 확인하고 지워야함
import AuctionTimer from '@repo/ui/components/auctions/AuctionTimer';
import { AuctionRow } from '@repo/ui/types/auctions/index';
import { formatToKoreanDateTime } from '@repo/ui/utils/formatToKoreanDateTime';
import { notFound } from 'next/navigation';
import { mockStories } from '../../../constants/auctions/index';

type AuctionInfoType = { status: string; data: AuctionRow };

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  //NOTE - 경매 상품에 대한 정보
  const res_1 = await fetch(`http://localhost:3001/api/auctions?auction_id=${auctionId}`);

  if (!res_1.ok) {
    if (res_1.status === 404) return notFound();
    throw new Error(`경매 상품에 대한 정보를 불러오지 못했습니다.: ${res_1.statusText}`);
  }

  const auctionInfo: AuctionInfoType = await res_1.json();

  const { title, current_point, start_time, end_time, image_urls, description, address, user_id } = auctionInfo.data;

  //NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
  const res_2 = await fetch(`http://localhost:3001/api/auctions/creator?user_id=${user_id}`);

  if (!res_2.ok) {
    if (res_2.status === 404) return notFound();
    throw new Error(`경매 상품에 대한 정보를 불러오지 못했습니다.: ${res_2.statusText}`);
  }

  const { totalAuctions, activeAuctions } = await res_2.json();

  //NOTE - 경매자의 정보

  //NOTE - 최고 입찰자의 정보
  const res_3 = await fetch(`http://localhost:3001/api/auctions/highest-bid?auction_Id=${auctionId}`);

  if (!res_3.ok) {
    if (res_3.status === 404) return notFound();
    throw new Error(`입찰자에 대한 정보를 불러오지 못했습니다.: ${res_3.statusText}`);
  }

  const highestBidUser = await res_3.json();
  const highestTime = formatToKoreanDateTime(highestBidUser?.bid_time);

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
          <div className="space-x-2">
            <button className="bg-[#F4F4F7] px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors">
              수정
            </button>
            <button className="bg-[#F4F4F7] px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors">
              삭제
            </button>
          </div>
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
                <div className="w-[50px] h-[50px] bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300" />
                <div className="space-y-1">
                  <p className="font-semibold">업체이름(?)</p>
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
            {highestBidUser ? (
              <div className="px-6 py-4 space-y-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <div className="w-[50px] h-[50px] bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300">
                      {highestBidUser.user.avatar}
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold">{highestBidUser.user.nickname}</p>
                      <p className="flex items-center">
                        <IoMdTime />
                        <time className="text-sm">{highestTime}</time>
                      </p>
                    </div>
                  </div>
                  <div className="text-[#8E74F2]">
                    <p>{highestBidUser.bid_point}&nbsp;P</p>
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
          <EpisodeList mockStories={mockStories} />
        </div>
      </main>
    </>
  );
};

export default AuctionDetailPage;
