import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { getServerUser } from 'src/entities/auth/serverAction';
import AuctionActionButtons from 'src/features/auction/AuctionActionButtons';
import { type AuctionRow } from 'src/shared/supabase/types';
import GoBackButton from 'src/shared/ui/GoBackButton';

const AuctionDetailNavbar = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const auctionInfo = await getAuctionInfoWithAddress(auctionId); //ANCHOR - 경매 상품 및 경매 업체 정보
  const userInfo = await getServerUser();

  const isUser = auctionInfo.user_id === userInfo?.id;

  return (
    <>
      <nav className="absolute left-0 right-0 top-5 z-10 flex items-center justify-between">
        <div className="bg-gray bg-(--color-background)/70 flex h-10 w-10 justify-center rounded-sm shadow-sm">
          <GoBackButton className="-translate-x-2" />
        </div>

        {isUser && <AuctionActionButtons auctionId={auctionInfo.auction_id} />}
        {}
      </nav>
    </>
  );
};

export default AuctionDetailNavbar;
