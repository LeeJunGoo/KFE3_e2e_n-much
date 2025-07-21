import { Card } from '@repo/ui/components/ui/card';
import Link from 'next/link';
import { getSellerAuctionCount } from 'src/entities/auction/api';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';
import UserAvatar from 'src/shared/ui/BaseAvatar';

const SellerInfoSection = async ({ auctionInfo }: { auctionInfo: AuctionInfoWithAddressType }) => {
  const { totalAuctions, activeAuctions } = await getSellerAuctionCount(auctionInfo.user_id);

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <div className="flex justify-between">
        <h3 className="text-(--color-text-base) font-medium">판매자 정보</h3>
        {/* //FIXME - 문의하기 페이지 이동 */}
        <Link
          href={'/'}
          className="text-(--color-warm-gray) hover:text-(--color-accent) text-sm font-semibold transition-colors"
        >
          문의하기
        </Link>
      </div>
      <div className="mb-4 flex items-center gap-2">
        <UserAvatar src={auctionInfo.company_image!} alt={auctionInfo.business_name!} size="sm" />
        <div>
          <h3 className="text-(--color-text-base)">{auctionInfo.business_name}</h3>
          <div className="text-(--color-warm-gray) text-sm">
            <span>{auctionInfo.road_address}</span>&nbsp;
            <span>{auctionInfo.detail_address}</span>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3"></div>
      <div className="text-(--color-warm-gray) flex text-sm">
        <div className="flex-1">
          <p>총 경매</p>
          <p className="text-(--color-text-base) font-medium">{totalAuctions}개</p>
        </div>
        <div className="flex-1">
          <p>진행중인 경매</p>
          <p className="text-(--color-text-base) font-medium">{activeAuctions}개</p>
        </div>
      </div>
    </Card>
  );
};

export default SellerInfoSection;
