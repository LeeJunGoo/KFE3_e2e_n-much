'use client';
import Image from 'next/image';
import { useGetUser } from '../../../hooks/queries/useUsers';
import { useGetUserEpisodes } from '../../../hooks/queries/useEpisodes';
import {
  useCreatedAuctions,
  useGetAuction,
  useGetAuctions,
  useGetBidAuctions
} from '../../../hooks/queries/useAuctions';

const MyAuctionOverviewPage = () => {
  const TEST_USER_ID = '9c3f2e9c-dcc3-4c3f-8d42-1f7dfcc44374';
  const TEST_AUCTION_ID = '9e525843-9047-4f17-8dc7-368f9311bf57';
  const TEST_CREATED_AUCTIONS = 'a85dc1ce-abbd-42e6-ae58-86bf230b99aa';

  //유저 정보
  const { data } = useGetBidAuctions(TEST_USER_ID);

  console.log(data);

  return (
    <section>
      <ul className="flex justify-center items-center pb-2 text-center border-b border-gray-300">
        <li className="w-2/4">진행 중</li>
        <li className="w-2/4">종료됨</li>
      </ul>
      <ul className="mt-10 flex flex-wrap items-start gap-4">
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
              <span className="text-sm text-gray-500">12명 입찰</span>
              <span className="text-sm text-gray-500">2일 14시간 </span>
            </div>
          </div>
        </li>
        <li className="w-[calc(33.333%-0.7rem)] flex-shrink-0 overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
          <div className="relative">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=11"
              alt="image"
              width={300}
              height={100}
              className="object-cover h-38"
              unoptimized
            />
            <span className="text-xs text-white absolute top-2 right-2 px-2 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full">
              진행중
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              안주원제과점의 신메뉴 출시 기념 한정판 빵 어쩌고저쩌고 어쩌고 저쩌고
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">현재 입찰가</span>
              <span className="font-bold text-lg text-purple-500">10,000 P</span>
            </div>
            <div className="flex justify-between items-center my-1">
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
