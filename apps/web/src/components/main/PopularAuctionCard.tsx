import { SortedAuctionItemType } from 'src/types/main';
import NotAuctionImage from 'assets/images/auctionDefault.png';
import Image from 'next/image';
import { FaBookOpen, FaHeart } from 'react-icons/fa6';

const PopularAuctionCard = ({ auction }: { auction: SortedAuctionItemType }) => {
  const isImage = auction.image_urls && auction.image_urls.length > 0;

  const auctionImage = isImage ? auction.image_urls![0] : NotAuctionImage;
  const favoritesCount = auction.favorites && auction.favorites.length > 0 ? auction.favorites.length : 0;
  const episodesCount = auction.episodes && auction.episodes.length > 0 ? auction.episodes.length : 0;

  return (
    <li className="relative cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]">
      <div className="relative h-[200px] w-full">
        <Image src={auctionImage!} alt={auction.title} fill className="rounded-lg object-cover p-1" />

        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="line-clamp-2 text-sm font-medium">{auction.title}</h3>
          <address className="text-xs">{auction.address[0]}</address>
          <div className="mt-2 flex items-center gap-3 text-xs">
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
    </li>
  );
};

export default PopularAuctionCard;
