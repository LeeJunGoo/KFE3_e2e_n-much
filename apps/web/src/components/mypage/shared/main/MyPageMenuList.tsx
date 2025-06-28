'use client';
import BidderMenuListItem from '../../bidder/BidderMenuListItem';
import AuctioneerMenuListItem from '../../auctioneer/AuctioneerMenuListItem';
import { AUCTIONEER_MENU, BIDDER_MENU } from 'src/constants/mypage';
import type { UserRoleDataProps } from 'src/types/mypage';

const MyPageMenuList = ({ role }: UserRoleDataProps) => {
  return (
    <nav className="mt-6">
      <ul className="space-y-3">
        {role === 'BIDDER' && BIDDER_MENU.map((el) => <BidderMenuListItem key={el.label} el={el} />)}
        {role === 'AUCTIONEER' && AUCTIONEER_MENU.map((el) => <AuctioneerMenuListItem key={el.label} el={el} />)}
      </ul>
    </nav>
  );
};

export default MyPageMenuList;
