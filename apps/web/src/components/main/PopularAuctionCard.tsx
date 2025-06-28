import NotAuctionImage from 'assets/images/auctionDefault.png';
import Image from 'next/image';
import Link from 'next/link';
import { FaBookOpen, FaHeart } from 'react-icons/fa6';
import { SortedAuctionItemType } from 'src/types/main';

const PopularAuctionCard = ({ auction }: { auction: SortedAuctionItemType }) => {
  const isImage = auction.image_urls && auction.image_urls.length > 0;

  const auctionImage = isImage ? auction.image_urls![0] : NotAuctionImage;
  const favoritesCount = auction.favorites?.length || 0;
  const episodesCount = auction.episodes?.length || 0;

  return (
    <li className="transition-transform hover:scale-[1.02]">
      <Link href={`/auctions/${auction.auction_id}`}>
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
          <Image
            src={auctionImage!}
            alt={auction.title}
            fill
            sizes="(min-width: 768px) 390px, 100vw"
            className="object-cover"
          />

          {/* --- [수정] 밝은 검정색 그라디언트 오버레이 --- */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-3 text-white">
            <h3 className="line-clamp-2 text-sm font-medium">{auction.title}</h3>
            {/* <address className="max-w-[65%] truncate">{address}</address> */}
            {/* <address className="mt-1 max-w-[71%] truncate text-xs not-italic">{auction.address[0]}</address> */}
            <div className="mt-2 flex items-center gap-3 text-xs">
              <i className="flex items-center gap-1 not-italic">
                <FaHeart className="mr-1 text-sm text-red-500" />
                <span>{favoritesCount}</span>
              </i>
              <i className="flex items-center gap-1 not-italic">
                <FaBookOpen className="text-sm text-blue-500" />
                <span>{episodesCount}</span>
              </i>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PopularAuctionCard;
