import Image from 'next/image';
import NotAuctionImage from 'src/assets/images/auctionDefault.png';
import BaseCard from '../../widgets/BaseCard';
import AuctionTimer from '../auction/AuctionTimer';
import type { AuctionInfoForEpisodeType } from 'src/entities/auction/types';

const EpisodesAuctionCard = async ({ auctionInfo }: { auctionInfo: AuctionInfoForEpisodeType }) => {
  //NOTE - 속성 값
  const imageUrls = auctionInfo.image_urls;
  const auctionTitle = auctionInfo.title;
  const endDate = auctionInfo.end_date;
  const auctionUser = auctionInfo.users;

  const auctionImage = imageUrls && imageUrls.length > 0 ? imageUrls[0] : NotAuctionImage;

  return (
    <BaseCard>
      <div className="flex gap-2">
        <div className="flex flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={auctionImage!}
            alt="테스트 이미지입니다."
            width={80}
            height={80}
            className="object-cover"
            priority
          />
        </div>

        <div className="flex w-full flex-col justify-between">
          <div>
            <p className="font-medium">{auctionTitle}</p>
            <div className="flex items-center">
              <address className="max-w-[45%] truncate text-sm text-[--color-warm-gray]">
                {auctionUser.address_id}
              </address>
            </div>
          </div>

          <AuctionTimer endDate={endDate} />
        </div>
      </div>
    </BaseCard>
  );
};

export default EpisodesAuctionCard;
