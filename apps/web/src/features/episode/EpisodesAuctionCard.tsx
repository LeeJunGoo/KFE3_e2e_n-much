import Image from 'next/image';
import NotAuctionImage from 'src/assets/images/auctionDefault.png';
import { getAuctionInfoForEpisode } from 'src/entities/auction/api';
import BaseCard from '../../widgets/BaseCard';
import AuctionTimer from '../auction/AuctionTimer';
import type { AuctionRow, UserRow } from 'src/shared/supabase/types';

const EpisodesAuctionCard = async ({
  auctionId,
  userId
}: {
  auctionId: AuctionRow['auction_id'];
  userId: UserRow['id'];
}) => {
  // NOTE - 경매 상품 및 판매자 정보
  const testAuctionId = '86d7b736-a3c1-4a5f-857f-fc551b0d8282';
  const auctionInfo = await getAuctionInfoForEpisode(testAuctionId);

  const { image_urls, title, end_date, users } = auctionInfo;
  const auctionImage = image_urls && image_urls.length > 0 ? image_urls[0] : NotAuctionImage;

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
            <p className="font-medium">{title}</p>
            <div className="flex items-center">
              <address className="max-w-[45%] truncate text-sm text-[--color-warm-gray]">{users.address_id}</address>
            </div>
          </div>
          <AuctionTimer endDate={end_date} />
        </div>
      </div>
    </BaseCard>
  );
};

export default EpisodesAuctionCard;
