//TODO - 컴포넌트 분리하기 (KMH)
'use client';

import { Badge } from '@repo/ui/components/ui/badge';
import { setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa6';
import noAuctionImage from 'src/assets/images/noAuctionImage.png';
import { formatRemainingTime } from 'src/shared/utils/formatRemainingTime';
import type { AuctionCardProp } from 'src/entities/auction/types';

//TODO - LINK prefetch 찾아보기 (KMH)
const AuctionCard = ({ auction_id, imageSrc, title, endDate, favorites, episodeCount }: AuctionCardProp) => {
  setDefaultOptions({ locale: ko });
  const { status, remainTime } = formatRemainingTime(endDate);

  return (
    <li className="rounded-button hover:scale-98 active:scale-96 overflow-hidden rounded-xl bg-white shadow-sm transition-transform">
      <Link href={`/auctions/${auction_id}`}>
        <div className="relative">
          <div className="relative h-40 w-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                fill
                alt={`${title} 이미지`}
                className="object-cover"
                sizes="(min-width: 768px) 400px, 100vw" //TODO - 이것도 고쳐야하는지 물어보기 (KMH)
              />
            ) : (
              <Image src={noAuctionImage} fill={true} alt={`${title} 이미지`} className="object-fill object-top" />
            )}
          </div>
          <Badge
            className={`absolute bottom-2 right-2 ${
              status === 'urgent' ? 'bg-(--color-red)' : 'bg-(--color-accent)'
            } px-2 py-1 font-normal text-white`}
          >
            {remainTime}
          </Badge>
        </div>
        <div className="p-2">
          <h3 className="text-(--color-text-base) mb-1.5 overflow-hidden text-ellipsis text-sm font-medium">{title}</h3>
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
};
export default AuctionCard;
