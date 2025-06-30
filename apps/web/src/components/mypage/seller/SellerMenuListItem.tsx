import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import type { MyPageMenuItem } from 'src/types/mypage';

type SellerMenuListItemProps = {
  el: MyPageMenuItem;
};

const SellerMenuListItem = ({ el }: SellerMenuListItemProps) => {
  return (
    <li>
      <Link
        href={el.href}
        className="flex cursor-pointer items-center justify-between rounded-xl bg-white p-4 shadow-xs transition-all duration-200 hover:bg-(--color-secondary)"
      >
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">{el.icon}</div>
          <h3 className="font-medium">{el.label}</h3>
        </div>
        <FaChevronRight className="text-(--color-warm-gray)" />
      </Link>
    </li>
  );
};

export default SellerMenuListItem;
