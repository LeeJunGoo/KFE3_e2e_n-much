import { Card } from '@repo/ui/components/ui/card';
import { UserInfoType } from 'src/app/api/auth/user-info/route';
import { fetchSellerAuctionCount } from 'src/entities/auction/api';
import { SellerInfoType } from 'src/entities/auction/types';
import UserAvatar from 'src/shared/ui/UserAvatar';

type SellerInfoSectionProps = SellerInfoType & { userInfo: UserInfoType } & { address: string[] };

const SellerInfoSection = async ({ seller, address, userInfo }: SellerInfoSectionProps) => {
  // NOTE - 경매자의 총 경매 수 및 현재 진행중인 경매 수
  const { totalAuctions, activeAuctions } = await fetchSellerAuctionCount(seller.seller_id);
  const userNickname = seller.nickname ?? userInfo.social_name;

  return (
    <Card className="mb-4 p-5 shadow-sm">
      <h3 className="text-(--color-text-base) font-medium">판매자 정보</h3>
      <div className="mb-4 flex items-center">
        <UserAvatar src={seller.avatar!} alt={userNickname!} size="sm" />
        <div>
          <h3 className="font-sm text-(--color-text-base) text-sm">{userNickname}</h3>
          <p className="text-(--color-warm-gray) text-sm">{address[0]}</p>
        </div>
      </div>
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
