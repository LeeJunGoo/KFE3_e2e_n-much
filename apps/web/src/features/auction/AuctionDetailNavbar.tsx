import EditDeleteActions from 'src/features/auction/EditDeleteActions';
import GoBackButton from 'src/shared/ui/GoBackButton';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionDetailNavbar = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const isSeller = userInfo.role === 'SELLER';

  return (
    <>
      <nav className="absolute left-0 right-0 top-5 z-10 flex items-center justify-between">
        <div className="bg-gray bg-(--color-background)/70 flex h-10 w-10 justify-center rounded-sm shadow-sm">
          <GoBackButton className="-translate-x-2" />
        </div>
        {isSeller && <EditDeleteActions auctionId={auctionId} />}
      </nav>
    </>
  );
};

export default AuctionDetailNavbar;
