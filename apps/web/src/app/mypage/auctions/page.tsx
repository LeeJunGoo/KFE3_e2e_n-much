'use client';
import Image from 'next/image';
import { useGetBidAuctions } from '../../../hooks/queries/useAuctions';

const MyAuctionOverviewPage = () => {
  const TEST_USER_ID = '9c3f2e9c-dcc3-4c3f-8d42-1f7dfcc44374';
  const TEST_AUCTION_ID = '9e525843-9047-4f17-8dc7-368f9311bf57';
  const TEST_CREATED_AUCTIONS = 'a85dc1ce-abbd-42e6-ae58-86bf230b99aa';

  //유저 정보
  const { data } = useGetBidAuctions(TEST_USER_ID);

  return (
    <section>
      <ul className="flex items-center justify-center border-b border-gray-300 pb-2 text-center">
        <li className="w-2/4">진행 중</li>
        <li className="w-2/4">종료됨</li>
      </ul>
      <ul className="mt-10 flex flex-wrap items-start gap-4">
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="h-38 object-cover"
              unoptimized
            />
            <span className="absolute top-2 right-2 rounded-full bg-yellow-500/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="text-lg font-bold text-purple-500">10,000 P</span>
            </div>
            <div className="my-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default MyAuctionOverviewPage;
