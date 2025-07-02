//NOTE - 마감 임박: 1일
//FIXME - 이미지 없음에 기본 이미지 넣기
//FIXME - 경매 상태 정하기
'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { differenceInHours, formatDistanceToNow, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { TZDate } from 'react-day-picker';
import { FaHeart } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';
import { formatNumber } from 'src/utils/formatNumber';

interface AuctionCardProp {
  auction_id: string;
  status: string;
  imageSrc: string | undefined;
  title: string;
  currentPoint: number;
  episodeCount: number;
  endTime: string;
  favorites: number;
  address: string | undefined;
}

export default function AuctionCard({
  auction_id,
  imageSrc,
  title,
  endTime,
  favorites,
  episodeCount,
  status,
  address,
  currentPoint
}: AuctionCardProp) {
  setDefaultOptions({ locale: ko });
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(endTime, 'Asia/Seoul');
  const diffDay = differenceInHours(now, auctionTime);
  const remainTime = formatDistanceToNow(auctionTime, { addSuffix: true });

  return (
    <li className="!rounded-button overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:scale-[0.98] active:scale-[0.96]">
      <Link href={`/auctions/${auction_id}`}>
        <div className="relative">
          <div className="relative h-40 w-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                fill
                alt={`${title} 이미지`}
                className="object-cover"
                sizes="(min-width: 768px) 400px, 100vw"
              />
            ) : (
              <p>이미지 없음</p>
            )}
          </div>

          <Badge
            className={`absolute bottom-2 right-2 ${
              status === 'OPEN' && -24 < diffDay && diffDay < 0
                ? 'bg-[#D84A5F] hover:bg-[#D84A5F]'
                : 'bg-[#5B80C2] hover:bg-[#5B80C2]'
            } px-2 py-1 font-normal text-white`}
          >
            {remainTime}
          </Badge>
        </div>
        <div className="p-2">
          <h3 className="mb-1.5 overflow-hidden text-ellipsis text-sm font-medium text-[#1F1F25]">{title}</h3>
          <div className="text-(--color-warm-gray) mb-2 flex items-center justify-between text-xs">
            <address className="max-w-[65%] truncate">{address}</address>
            <span className="text-(--color-accent) font-semibold">{formatNumber(currentPoint)}&nbsp;P</span>
          </div>
          <div className="text-(--color-warm-gray) flex items-center justify-between text-xs">
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
      </Link>
    </li>
  );
}
