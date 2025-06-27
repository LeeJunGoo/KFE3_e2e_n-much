import { AUCTION_TAB_FILTERS } from 'src/constants/mypage';
import FilterListItem from '../FilterListItem';
import type { TabKey } from 'src/types/mypage';

interface AuctionStatusFiltersProps {
  tab: TabKey;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const AuctionStatusFilters = ({ tab, activeFilter, onFilterChange }: AuctionStatusFiltersProps) => {
  const filters = AUCTION_TAB_FILTERS[tab];
  const statusStyles = 'px-3 text-xs';

  return (
    <nav>
      <ul className="flex items-center gap-2 py-2">
        {filters.map((label) => (
          <FilterListItem
            key={label}
            label={label}
            isActive={activeFilter === label}
            onClick={() => onFilterChange(label)}
            className={statusStyles}
          />
        ))}
      </ul>
    </nav>
  );
};

export default AuctionStatusFilters;
