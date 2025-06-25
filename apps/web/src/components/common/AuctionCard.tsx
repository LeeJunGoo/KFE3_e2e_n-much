//NOTE - 마감 임박: 1일
//FIXME - 이미지 없음에 기본 이미지 넣기
'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { differenceInHours } from 'date-fns';
import Image from 'next/image';
import { TZDate } from 'react-day-picker';
import { FaHeart } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';

interface AuctionCardProp {
  status: string;
  imageSrc: string | undefined;
  title: string;
  currentPoint: number;
  buyerCount: number;
  endTime: string;
  favorites: number;
}

export default function AuctionCard({ imageSrc, title, endTime, favorites }: AuctionCardProp) {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(endTime, 'Asia/Seoul');
  const diff = differenceInHours(now, auctionTime);
  const absDiff = Math.abs(diff);

  if (imageSrc)
    return (
      <li className="!rounded-button cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:scale-[0.98] active:scale-[0.96]">
        <div className="relative">
          <div className="h-[120px] w-full">
            {imageSrc ? (
              <Image src={imageSrc} fill={true} alt={`${title} 이미지`} className="object-cover object-top" />
            ) : (
              <p>이미지 없음</p>
            )}
          </div>

          <Badge
            className={`absolute right-2 bottom-2 ${
              absDiff < 4 ? 'bg-[#D84A5F] hover:bg-[#D84A5F]' : 'bg-[#5B80C2] hover:bg-[#5B80C2]'
            } px-2 py-1 font-normal text-white`}
          >
            {absDiff}
          </Badge>
        </div>
        <div className="p-2">
          <h3 className="mb-1.5 overflow-hidden text-sm font-medium text-ellipsis text-[#1F1F25]">{title}</h3>
          <div className="flex items-center justify-between text-xs text-[#B8B8B8]">
            <div className="flex items-center">
              <FaHeart color="#D84A5F" className="mr-1" />
              <span>{favorites}</span>
            </div>
            <div className="flex items-center">
              <FaBookOpen className="mr-1" />
              <span>{10}개의 스토리</span>
            </div>
          </div>
        </div>
      </li>
    );
}
