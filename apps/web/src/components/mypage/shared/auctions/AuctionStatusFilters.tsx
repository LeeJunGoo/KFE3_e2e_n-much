import UIButton from 'src/components/common/UIButton';
import { AUCTION_TAB_FILTERS } from 'src/constants/mypage';
import type { TabKey } from 'src/types/mypage';

interface AuctionStatusFiltersProps {
  tab: TabKey;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const AuctionStatusFilters = ({ tab, activeFilter, onFilterChange }: AuctionStatusFiltersProps) => {
  const filters = AUCTION_TAB_FILTERS[tab];
  const statusStyles = 'px-3 py-1.5 text-xs';
  const getVariant = (label: string) => (activeFilter === label ? 'active' : 'inActive');

  return (
    <ul className="flex gap-2 py-2 pt-3">
      {filters.map((label) => (
        <li key={label}>
          <UIButton variant={getVariant(label)} className={statusStyles} onClick={() => onFilterChange(label)}>
            {label}
          </UIButton>
        </li>
      ))}
    </ul>
  );
};

export default AuctionStatusFilters;
