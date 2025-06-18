import AuctionDetailCard from '@repo/ui/components/auctions/AuctionDetailCard';
import EpilogueList from '@repo/ui/components/auctions/EpilogueList';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const mockStories = [
  {
    id: 1,
    author: {
      name: '김하은',
      avatarUrl: 'https://i.pravatar.cc/40?u=haein_kim'
    },
    timestamp: new Date('2025-06-18T01:15:00Z').toISOString(), // 가장 최근 글
    title: '결혼식 스냅용 필름카메라 찾아요',
    content:
      '안녕하세요. 10월에 있을 제 결혼식에서 서브 스냅으로 사용할 필름카메라를 구하고 있습니다. Contax T3나 Leica Minilux Zoom 같은 작고 예쁜 자동 카메라였으면 좋겠습니다. 전문가가 아니어도 쉽게 다룰 수 있고, 결과물이 따뜻한 색감으로 나오는 모델을 선호해요. 케이스와 스트랩이 포함된 좋은 상태의 제품을 양도받고 싶습니다.'
  },
  {
    id: 2,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },

  {
    id: 3,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 4,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 5,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 6,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 12,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 7,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 8,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 9,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  },
  {
    id: 10,
    author: {
      name: '박서준',
      avatarUrl: 'https://i.pravatar.cc/40?u=seojun_park'
    },
    timestamp: new Date('2025-06-17T22:30:00Z').toISOString(),
    title: '라이카 M10-P 실버 판매합니다.',
    content:
      '소중하게 사용하던 라이카 M10-P 실버 색상 판매합니다. 2023년에 반도카메라에서 정식으로 구매했으며, 보증기간은 만료되었습니다. 사용감이 거의 없는 민트급 상태를 유지하고 있으며, 항상 제습함에 보관했습니다. 셔터 카운트는 약 3,000컷 정도입니다. 정품 배터리 2개와 충전기, 박스를 포함한 풀박스 구성입니다. 직거래는 서울 강남역에서 가능합니다.'
  }
];

const AuctionDetailPage = () => {
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
          <h1 className="text-2xl font-bold">식사권 화이트롤 + 빵</h1>
          <div>
            <p className="text-gray-400 text-sm">현재&nbsp;입찰가</p>
            <p className="text-[#8E74F2] text-lg font-semibold">850,000&nbsp;P</p>
          </div>
          <div>
            <p className="text-sm">남은 시간</p>
            <time className="text-lg font-semibold text-[#D84A5F]">2일&nbsp;23시간&nbsp;59분 남음</time>
          </div>
        </div>
        <div className="px-7 space-y-7">
          {/* 이미지 슬라이드  */}
          <AuctionDetailCard />
          {/* 상품 정보 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">상품 정보</h2>
            </div>

            <div className="px-6 py-4 leading-relaxed text-gray-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum et dolores asperiores qui obcaecati
                natus earum reprehenderit libero, dolorem, animi minima at consectetur velit placeat repellendus illo
                eaque, eveniet architecto?
              </p>
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
                    <span className="text-sm">서울 특별시 강남구 서초구 123-12</span>
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
          <EpilogueList mockStories={mockStories} />
        </div>
      </main>
    </>
  );
};

export default AuctionDetailPage;
