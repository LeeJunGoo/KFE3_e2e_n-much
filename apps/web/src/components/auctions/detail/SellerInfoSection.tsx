import { Card } from '@repo/ui/components/ui/card';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import UserAvatar from 'src/components/common/UserAvatar';
import { fetchSellerAuctionCount } from 'src/lib/queries/auctions';
import { SellerInfoType } from 'src/types/auctions/detail';

type SellerInfoSectionProps = SellerInfoType & { userInfo: UserInfoType } & { address: string[] };

const SellerInfoSection = async ({ seller, address, userInfo }: SellerInfoSectionProps) => {
  // NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
  const { totalAuctions, activeAuctions } = await fetchSellerAuctionCount(seller.seller_id);
  const userNickname = seller.nickname ?? userInfo.social_name;

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <h3 className="font-medium text-(--color-text-base)">판매자 정보</h3>
      <div className="mb-4 flex items-center">
        <UserAvatar src={seller.avatar!} alt={userNickname!} size="sm" />
        <div>
          <h3 className="font-sm text-sm text-(--color-text-base)">{userNickname}</h3>
          <p className="text-sm text-(--color-warm-gray)">{address[0]}</p>
        </div>
      </div>
      <div className="flex text-sm text-(--color-warm-gray)">
        <div className="flex-1">
          <p>총 경매</p>
          <p className="font-medium text-(--color-text-base)">{totalAuctions}개</p>
        </div>
        <div className="flex-1">
          <p>진행중인 경매</p>
          <p className="font-medium text-(--color-text-base)">{activeAuctions}개</p>
        </div>
      </div>
    </Card>
  );
};

export default SellerInfoSection;
