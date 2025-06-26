import ActiveButton from 'src/components/common/ActiveButton';
import { AUCTION_TAB_FILTERS } from 'src/constants/mypage';
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
    <ul className="flex items-center gap-2 py-2">
      {filters.map((label) => (
        <li key={label}>
          <ActiveButton active={activeFilter === label} className={statusStyles} onClick={() => onFilterChange(label)}>
            {label}
          </ActiveButton>
        </li>
      ))}
    </ul>
  );
};

export default AuctionStatusFilters;
