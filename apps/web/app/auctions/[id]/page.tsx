import AuctionDetailCard from '@repo/ui/components/auctions/AuctionDetailCard';
import EpisodeList from '@repo/ui/components/auctions/EpisodeList';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

//mock data 현재 constants에 넣어둠, 나중에 확인하고 지워야함
import { mockStories } from '../../../constants/auctions/index';
import { notFound } from 'next/navigation';
import { AuctionRow } from '@repo/ui/types/auctions/index';
import AuctionTimer from '@repo/ui/components/auctions/AuctionTimer';

type AuctionInfoType = { status: string; data: AuctionRow };

const AuctionDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: auctionId } = await params;

  const res = await fetch(`http://localhost:3001/api/auctions?auction_id=${auctionId}`);

  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error(`영화 정보를 불러오지 못했습니다.: ${res?.statusText}`);
  }
  const auctionInfo: AuctionInfoType = await res.json();

  const { title, current_point, start_time, end_time, image_urls, description, address } = auctionInfo.data;

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
                  <p className="font-semibold">풍년제과</p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt />
                    <span className="text-sm">{address}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-gray-500 text-sm">
                  <span>총 경매 수</span>
                  <span> 42건</span>
                </p>

                <p className="flex justify-between text-gray-500 text-sm">
                  <span>현재 진행중인 경매</span>
                  <span> 2건</span>
                </p>
              </div>
            </div>
          </div>
          {/* 최고 입찰가 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">최고 입찰가</h2>
            </div>
            <div className="px-6 py-4 space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="w-[50px] h-[50px] bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300" />
                  <div className="space-y-1">
                    <p className="font-semibold">이지현</p>
                    <p className="flex items-center">
                      <IoMdTime />
                      <time className="text-sm">6월 14일 오후 03:10</time>
                    </p>
                  </div>
                </div>
                <div className="text-[#8E74F2]">
                  <p>850,000P</p>
                </div>
              </div>
            </div>
          </div>
          <EpisodeList mockStories={mockStories} />
        </div>
      </main>
    </>
  );
};

export default AuctionDetailPage;
