import BuyerMenuListItem from '../../buyer/BuyerMenuListItem';
import SellerMenuListItem from '../../seller/SellerMenuListItem';
import { SELLER_MENU, BUYER_MENU } from 'src/constants/mypage';
import type { MenuRoleProps } from 'src/types/mypage';

const MyPageMenuList = ({ role }: MenuRoleProps) => {
  return (
    <nav className="mt-6">
      <ul className="space-y-3">
        {role === 'BUYER' && BUYER_MENU.map((el) => <BuyerMenuListItem key={el.label} el={el} />)}
        {role === 'SELLER' && SELLER_MENU.map((el) => <SellerMenuListItem key={el.label} el={el} />)}
      </ul>
    </nav>
  );
};

export default MyPageMenuList;
