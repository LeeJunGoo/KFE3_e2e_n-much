import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import type { MyPageMenuItem } from 'src/types/mypage';

type BidderMenuListProps = {
  el: MyPageMenuItem;
};

const BidderMenuList = ({ el }: BidderMenuListProps) => {
  const { href, icon, label } = el;

  return (
    <li>
      <div className="flex items-center">
        <Link
          href={href}
          className="flex w-full items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-xs transition-all duration-200 hover:bg-(--color-secondary)"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">{icon}</span>
            <h3 className="font-medium">{label}</h3>
          </div>
          <FaChevronRight className="text-(--color-warm-gray)" />
        </Link>
      </div>
    </li>
  );
};
export default BidderMenuList;
