import Image from 'next/image';

import { Badge } from '@repo/ui/components/ui/badge';
import NotAuctionImage from 'assets/images/auctionDefault.png';
import { differenceInHours, formatDistanceToNow, setDefaultOptions } from 'date-fns';
import { ko } from 'date-fns/locale';
import Link from 'next/link';
import { TZDate } from 'react-day-picker';
import { FaBookOpen, FaHeart } from 'react-icons/fa6';
import { SortedAuctionItemType } from 'src/entities/auction/types';

const LatestAuctionCard = ({ auction }: { auction: SortedAuctionItemType }) => {
  const auctionImage = auction.image_urls && auction.image_urls.length > 0 ? auction.image_urls[0] : NotAuctionImage;

  setDefaultOptions({ locale: ko });
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(auction.end_time, 'Asia/Seoul');
  const diffDay = differenceInHours(now, auctionTime);
  const remainTime = formatDistanceToNow(auctionTime, { addSuffix: true });

  const favoritesCount = auction.favorites?.length || 0;
  const episodesCount = auction.episodes?.length || 0;

  const isUrgent = auction.status === 'OPEN' && -24 < diffDay && diffDay < 0;
  const badgeColor = isUrgent
    ? 'bg-[var(--color-red)] hover:bg-[var(--color-red)]'
    : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent)]';

  return (
    <li className="border-(--color-warm-gray)/30 border-b last:border-b-0">
      <Link
        href={`/auctions/${auction.auction_id}`}
        className="hover:bg-(--color-secondary) flex cursor-pointer items-center p-3 transition-colors"
      >
        <div className="relative mr-3 h-20 w-20 flex-shrink-0">
          <Image src={auctionImage!} alt={auction.title} fill sizes="80px" className="rounded-lg object-contain" />
        </div>

        <div className="ml-2 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mr-2 flex-1 font-medium">{auction.title}</h3>
            </div>
            <Badge className={`${badgeColor} px-2 py-1 font-normal`}>{remainTime}</Badge>
          </div>
          <div className="text-(--color-warm-gray) mt-2 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-3">
              <i className="flex items-center gap-1">
                <FaHeart className="text-(--color-red) mr-1 text-sm" />
                <span>{favoritesCount}</span>
              </i>
              <i className="flex items-center gap-1">
                <FaBookOpen className="text-(--color-primary) text-sm" />
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
