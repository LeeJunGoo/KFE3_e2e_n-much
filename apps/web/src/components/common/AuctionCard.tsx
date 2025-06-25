'use client';

import { differenceInHours } from 'date-fns';
import Image from 'next/image';
import { TZDate } from 'react-day-picker';
import { FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

interface AuctionCardProp {
  status: string;
  imageSrc: string;
  title: string;
  currentPoint: number;
  address: string;
  buyerCount: number;
  remainTime: string;
}

export default function AuctionCard({
  status,
  imageSrc,
  title,
  currentPoint,
  address,
  buyerCount,
  remainTime
}: AuctionCardProp) {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(remainTime, 'Asia/Seoul');
  const diff = differenceInHours(now, auctionTime);
  const absDiff = Math.abs(diff);

  if (status === 'OPEN' && absDiff < 4) {
    status = '마감임박';
  } else if (status === 'CLOSED') {
    status = '마감';
  } else if (status === 'CANCELED') {
    status = '유찰';
  }
  return (
    <li className="w-48 overflow-hidden rounded-2xl border bg-white shadow-md">
      {/* 이미지 영역 */}
      <div className="relative flex h-48 items-center justify-center bg-gray-100">
        <div className="absolute top-3 right-3">
          {/* <span className="rounded-full bg-green-200 px-2 py-1 text-xs text-green-800">진행중</span> */}
          <span className="relative z-50 rounded-full bg-green-200 px-2 py-1 text-xs text-green-800">{status}</span>
        </div>
        {/* <span className="text-gray-400">이미지 영역</span> */}
        <Image src={imageSrc} alt={'경매 이미지'} fill={true} className="z-10 object-cover" />
      </div>

      {/* 본문 */}
      <div className="p-4">
        {/* <h2 className="text-md font-semibold">아이폰 14 Pro 256GB</h2> */}
        <h2 className="text-md overflow-hidden font-semibold text-ellipsis">{title}</h2>

        <div className="mt-1 flex items-center text-sm text-gray-500">
          <FaMapMarkerAlt className="mr-1 h-4 w-4" />
          {/* 부산시 해운대구 */}
          <p className="w-full overflow-hidden text-nowrap text-ellipsis">{address}</p>
        </div>

        <div className="mt-2 text-sm text-gray-600">현재가</div>
        {/* <div className="text-xl font-bold text-blue-600">890,000P</div> */}
        <div className="text-xl font-bold text-blue-600">{currentPoint}P</div>
        <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaUsers className="mr-1 h-4 w-4" />
            {/* 28명 입찰 */}
            {buyerCount}명 입찰
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1 h-4 w-4" />
            {/* 1일 8시간 */}
            {remainTime}
          </div>
        </div>
      </div>
    </li>
  );
}
