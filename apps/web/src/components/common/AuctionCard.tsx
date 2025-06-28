'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { differenceInHours, formatDistanceToNow, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { TZDate } from 'react-day-picker';
import { FaHeart } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';
import noAuctionImage from '../../../assets/images/noAuctionImage.png';

interface AuctionCardProp {
  status: string;
  imageSrc: string | undefined;
  title: string;
  currentPoint: number;
  episodeCount: number;
  endTime: string;
  favorites: number;
}

export default function AuctionCard({ imageSrc, title, endTime, favorites, episodeCount, status }: AuctionCardProp) {
  setDefaultOptions({ locale: ko });
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(endTime, 'Asia/Seoul');
  const diffDay = differenceInHours(now, auctionTime);
  const remainTime = formatDistanceToNow(auctionTime, { addSuffix: true });

  return (
    <li className="!rounded-button cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:scale-[0.98] active:scale-[0.96]">
      <div className="relative">
        <div className="h-[120px] w-full">
          {imageSrc ? (
            <Image src={imageSrc} fill={true} alt={`${title} 이미지`} className="object-cover object-top" />
          ) : (
            <Image src={noAuctionImage} fill={true} alt={`${title} 이미지`} className="object-fill object-top" />
          )}
        </div>

        <Badge
          className={`absolute right-2 bottom-2 ${
            status === 'OPEN' && -24 < diffDay && diffDay < 0
              ? 'bg-[#D84A5F] hover:bg-[#D84A5F]'
              : 'bg-[#5B80C2] hover:bg-[#5B80C2]'
          } px-2 py-1 font-normal text-white`}
        >
          {remainTime}
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
            <span>{episodeCount}개의 스토리</span>
          </div>
        </div>
      </div>
    </li>
  );
}
