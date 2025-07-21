import Image from 'next/image';
import NotAuctionImage from 'src/assets/images/auctionDefault.png';
import AuctionTimerStatic from 'src/features/auction/AuctionTimerStatic';
import BaseCard from 'src/widgets/BaseCard';
import type { AuctionSummaryInfoWithAddressType } from 'src/entities/auction/types';

const EpisodeAuctionCard = async ({ auctionInfo }: { auctionInfo: AuctionSummaryInfoWithAddressType }) => {
  const imageUrls = auctionInfo.image_urls;
  const auctionTitle = auctionInfo.title;
  const endDate = auctionInfo.end_date;
  const auctionUser = auctionInfo;
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
              <p className="text-(--color-warm-gray) max-w-[45%] truncate text-sm">{auctionUser.address_id}</p>
            </div>
          </div>
          <AuctionTimerStatic endDate={endDate} />
        </div>
      </div>
    </BaseCard>
  );
};

export default EpisodeAuctionCard;
