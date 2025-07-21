import EditDeleteActions from 'src/features/auction/EditDeleteActions';
import GoBackButton from 'src/shared/ui/GoBackButton';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionDetailNavbar = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  return (
    <>
      <nav className="absolute left-0 right-0 top-5 z-10 flex items-center justify-between">
        <div className="bg-gray bg-(--color-background)/70 flex h-10 w-10 justify-center rounded-sm shadow-sm">
          <GoBackButton className="-translate-x-2" />
        </div>
        {/* //FIXME - 유저 정보 */}
        {/* {isSeller && <EditDeleteActions auctionId={auctionId} />} */}
        {<EditDeleteActions auctionId={auctionId} />}
      </nav>
    </>
  );
};

export default AuctionDetailNavbar;
