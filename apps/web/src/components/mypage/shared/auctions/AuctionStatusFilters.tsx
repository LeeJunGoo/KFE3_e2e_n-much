import { AUCTION_TAB_FILTERS } from 'src/constants/mypage';
import type { TabKey } from 'src/types/mypage';

interface AuctionStatusFiltersProps {
  tab: TabKey;
}

const AuctionStatusFilters = ({ tab }: AuctionStatusFiltersProps) => {
  const filters = AUCTION_TAB_FILTERS[tab];

  return (
    <ul className="flex gap-2 py-4">
      {filters.map((label) => (
        <li key={label}>
          <button>{label}</button>
        </li>
      ))}
    </ul>
  );
};

export default AuctionStatusFilters;
