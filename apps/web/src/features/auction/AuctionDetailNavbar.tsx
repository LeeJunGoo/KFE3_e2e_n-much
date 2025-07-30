import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import { selectUser } from 'src/entities/auth/supabase/client';
import AuctionFavoriteMarkToggle from 'src/features/auction/AuctionFavoriteMarkToggle';
import AuctionActionButtons from 'src/features/auction/button/AuctionActionButtons';
import { type AuctionRow } from 'src/shared/supabase/types';
import ClientContainer from 'src/shared/ui/ClientContainer';
import GoBackButton from 'src/shared/ui/GoBackButton';

const AuctionDetailNavbar = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId); //ANCHOR - 경매 상품 및 경매 업체 정보
  const userInfo = await getServerUser();

  // 현재 유저가 경매 물품의 판매자인지의 여부
  const isUser = auctionInfo.user_id === userInfo?.id;

  return (
    <>
      <ClientContainer>
        <nav className="absolute left-0 right-0 top-5 z-10 flex items-center justify-between">
          <div className="bg-gray bg-(--color-background)/70 flex size-10 justify-center rounded-sm shadow-sm">
            <GoBackButton className="-translate-x-2" />
          </div>

          {isUser && <AuctionActionButtons auctionId={auctionInfo.auction_id} />}
          {!isUser && (
            <AuctionFavoriteMarkToggle auctionInfo={auctionInfo} auctionId={auctionId} userId={userInfo!.id} />
          )}
        </nav>
      </ClientContainer>
    </>
  );
};

export default AuctionDetailNavbar;
