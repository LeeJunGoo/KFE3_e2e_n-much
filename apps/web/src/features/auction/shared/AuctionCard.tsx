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

//TODO - 파일로 분리하기 (KMH)
interface AuctionCardProp {
  auction_id: string;
  imageSrc: string | undefined;
  title: string;
  episodeCount: number;
  endDate: string;
  favorites: number;
}

const AuctionCard = ({ auction_id, imageSrc, title, endDate, favorites, episodeCount }: AuctionCardProp) => {
  setDefaultOptions({ locale: ko });
  const { status, remainTime } = formatRemainingTime(endDate);

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
              <Image src={noAuctionImage} fill={true} alt={`${title} 이미지`} className="object-fill object-top" />
            )}
          </div>
          <Badge
            className={`absolute bottom-2 right-2 ${
              status === 'urgent' ? 'bg-[#D84A5F] hover:bg-[#D84A5F]' : 'bg-[#5B80C2] hover:bg-[#5B80C2]'
            } px-2 py-1 font-normal text-white`}
          >
            {remainTime}
          </Badge>
        </div>
        <div className="p-2">
          <h3 className="mb-1.5 overflow-hidden text-ellipsis text-sm font-medium text-[#1F1F25]">{title}</h3>
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
