import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import type { MyPageMenuItem } from 'src/types/mypage';

type AuctioneerMenuListProps = {
  el: MyPageMenuItem;
};

const SellerMenuListItem = ({ el }: AuctioneerMenuListProps) => {
  return (
    <li className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-xs transition-all duration-200 hover:bg-(--color-secondary)">
      <Link href={el.href} className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">{el.icon}</div>
        <h3 className="font-medium">{el.label}</h3>
      </Link>
      <FaChevronRight className="text-(--color-warm-gray)" />
    </li>
  );
};

export default SellerMenuListItem;
