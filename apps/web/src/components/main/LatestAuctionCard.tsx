import Image from 'next/image';
import React from 'react';
import { SortedAuctionItemType } from 'src/types/main';
import NotAuctionImage from 'assets/images/auctionDefault.png';
import { differenceInHours, formatDistanceToNow, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TZDate } from 'react-day-picker';
import { Badge } from '@repo/ui/components/ui/badge';
import { FaBookOpen, FaHeart } from 'react-icons/fa6';
import Link from 'next/link';

const LatestAuctionCard = ({ auction }: { auction: SortedAuctionItemType }) => {
  const auctionImage = auction.image_urls && auction.image_urls.length > 0 ? auction.image_urls[0] : NotAuctionImage;

  setDefaultOptions({ locale: ko });
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(auction.end_time, 'Asia/Seoul');
  const diffDay = differenceInHours(now, auctionTime);
  const remainTime = formatDistanceToNow(auctionTime, { addSuffix: true });

  const favoritesCount = auction.favorites && auction.favorites.length > 0 ? auction.favorites.length : 0;
  const episodesCount = auction.episodes && auction.episodes.length > 0 ? auction.episodes.length : 0;

  return (
    <li className="border-b border-(--color-warm-gray)/30 last:border-b-0">
      <Link
        href={`/auctions/${auction.auction_id}`}
        className="flex cursor-pointer items-center p-3 transition-colors hover:bg-(--color-secondary)"
      >
        <div className="relative h-20 w-20">
          <Image src={auctionImage!} alt={auction.title} fill className="mr-3 rounded-lg object-contain" />
        </div>
        <div className="ml-2 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mr-2 flex-1 font-medium text-[#1F1F25]">{auction.title}</h3>
            </div>

            <Badge
              className={`${
                auction.status === 'OPEN' && -24 < diffDay && diffDay < 0
                  ? 'bg-[#D84A5F] hover:bg-[#D84A5F]'
                  : 'bg-[#5B80C2] hover:bg-[#5B80C2]'
              } px-2 py-1 font-normal text-white`}
            >
              {remainTime}
            </Badge>
          </div>
          <div className="mt-2 flex items-center gap-3 text-sm text-[#B8B8B8]">
            <div className="flex items-center gap-3">
              <i className="flex items-center gap-1">
                <FaHeart className="mr-1 text-sm text-(--color-red)" />
                <span>{favoritesCount}</span>
              </i>

              <i className="flex items-center gap-1">
                <FaBookOpen className="text-sm text-(--color-primary)" />
                <span>{episodesCount}</span>
              </i>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LatestAuctionCard;
