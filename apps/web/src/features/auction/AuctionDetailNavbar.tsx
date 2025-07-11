import { UserInfoType } from 'src/app/api/auth/user-info/route';
import EditDeleteActions from 'src/features/auction/EditDeleteActions';
import { AuctionRow } from 'src/shared/supabase/types';
import GoBackButton from 'src/shared/ui/GoBackButton';

const AuctionDetailNavbar = async ({
  auctionId,
  userInfo
}: {
  auctionId: AuctionRow['auction_id'];
  userInfo: UserInfoType;
}) => {
  const isSeller = userInfo.role === 'SELLER';

  return (
    <>
      <nav className="absolute left-0 right-0 top-5 z-10 flex items-center justify-between">
        <div className="bg-gray bg-(--color-background)/70 flex h-10 w-10 justify-center rounded-sm shadow-sm">
          <GoBackButton className="-translate-x-2" />
        </div>
        <div>{isSeller && <EditDeleteActions auctionId={auctionId} />}</div>
      </nav>
    </>
  );
};

export default AuctionDetailNavbar;
