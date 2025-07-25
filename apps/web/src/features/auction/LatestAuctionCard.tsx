import Image from 'next/image';
import Link from 'next/link';
import NotAuctionImage from 'src/assets/images/auctionDefault.png';
import { type SortedAuctionItemType } from 'src/entities/auction/types';
import AuctionMetaInfo from 'src/features/auction/shared/AuctionMetaInfo';
import BaseBadge from 'src/shared/ui/BaseBadge';
import PageTitle from 'src/shared/ui/PageTitle';
import { formatRemainingTime } from 'src/shared/utils/formatRemainingTime';

const LatestAuctionCard = ({ auction }: { auction: SortedAuctionItemType }) => {
  const isImage = auction.image_urls && auction.image_urls.length > 0;

  const auctionImage = isImage ? auction.image_urls![0] : NotAuctionImage;
  const { status, remainTime } = formatRemainingTime(auction.end_date);

  const favoritesCount = auction.favorites?.length || 0;
  const episodesCount = auction.episodes?.length || 0;

  const badgeVariant = status === 'ongoing' ? 'accent' : 'red';

  return (
    <li className="border-(--color-warm-gray)/30 border-b last:border-b-0">
      <Link
        href={`/auctions/${auction.auction_id}`}
        className="hover:bg-(--color-secondary) flex cursor-pointer items-center p-3 transition-colors"
      >
        <div className="relative mr-3 h-20 w-20 flex-shrink-0">
          <Image
            src={auctionImage!}
            alt={auction.title}
            fill
            sizes="80px"
            className="rounded-lg object-contain"
            priority
          />
        </div>

        <div className="ml-2 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <PageTitle>auction.title</PageTitle>
            </div>
            <BaseBadge variant={badgeVariant} className={'px-2 py-1 font-normal'}>
              {remainTime}
            </BaseBadge>
          </div>
          <AuctionMetaInfo
            favoritesCount={favoritesCount}
            episodesCount={episodesCount}
            className="text-(--color-warm-gray) mt-2 items-center"
          />
        </div>
      </Link>
    </li>
  );
};

export default LatestAuctionCard;
