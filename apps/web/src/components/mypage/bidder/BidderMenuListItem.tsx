import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa6';
import ListCard from '../../common/ui/ListCard';
import type { MyPageMenuItem } from 'src/types/mypage';

type BidderMenuListItemProps = {
  el: MyPageMenuItem;
};

const BidderMenuListItem = ({ el }: BidderMenuListItemProps) => {
  const { href, icon, label } = el;

  return (
    <li>
      <div className="flex items-center">
        <ListCard
          as={Link}
          href={href}
          className="flex w-full items-center justify-between gap-3 transition-all duration-200 hover:bg-(--color-secondary)"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-(--color-secondary)">{icon}</span>
            <h3 className="font-medium">{label}</h3>
          </div>
          <FaChevronRight className="text-(--color-warm-gray)" />
        </ListCard>
      </div>
    </li>
  );
};
export default BidderMenuListItem;
