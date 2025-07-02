import { UserInfoType } from 'src/app/api/auth/user-info/route';
import GoBackButton from 'src/components/common/GoBackButton';
import { AuctionRow } from 'src/lib/supabase/type';
import EditDeleteActions from './EditDeleteActions';

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
      <nav className="absolute top-5 right-0 left-0 z-10 flex items-center justify-between">
        <div className="bg-gray flex h-10 w-10 justify-center rounded-sm bg-(--color-background)/70 shadow-sm">
          <GoBackButton className="-translate-x-2" />
        </div>
        <div>
          {/*//FIXME -  로그인된 유저가 isSeller인지 여부 */}
          {isSeller && <EditDeleteActions auctionId={auctionId} />}
        </div>
      </nav>
    </>
  );
};

export default AuctionDetailNavbar;
