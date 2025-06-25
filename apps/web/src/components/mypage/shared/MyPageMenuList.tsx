'use client';
import BidderMenuList from '../bidder/BidderMenuList';
import AuctioneerMenuList from '../auctioneer/AuctioneerMenuList';
import { AUCTIONEER_MENU, BIDDER_MENU } from 'src/constants/mypage';
import type { UserRoleDataProps } from 'src/types/mypage';

const MyPageMenuList = ({ role }: UserRoleDataProps) => {
  return (
    <nav className="mt-6">
      <ul className="space-y-3">
        {role === 'BIDDER' && BIDDER_MENU.map((el) => <BidderMenuList key={el.label} el={el} />)}
        {role === 'AUCTIONEER' && AUCTIONEER_MENU.map((el) => <AuctioneerMenuList key={el.label} el={el} />)}
      </ul>
    </nav>
  );
};

export default MyPageMenuList;
