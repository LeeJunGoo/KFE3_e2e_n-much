import UIButton from 'src/components/common/UIButton';
import { AUCTION_TAB_FILTERS } from 'src/constants/mypage';
import type { TabKey } from 'src/types/mypage';

interface AuctionStatusFiltersProps {
  tab: TabKey;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

//삭제 예정
const FILTER_STYLES = {
  base: 'rounded-md px-3 py-1.5 text-xs whitespace-nowrap transition-colors',
  active: 'border border-(--color-accent) bg-(--color-accent) text-white',
  inactive: 'border text-(--color-accent) hover:border-transparent hover:bg-(--color-primary) hover:text-white'
} as const;

const AuctionStatusFilters = ({ tab, activeFilter, onFilterChange }: AuctionStatusFiltersProps) => {
  const filters = AUCTION_TAB_FILTERS[tab];

  return (
    <ul className="flex gap-2 py-2 pt-3">
      {filters.map((label) => (
        <li key={label}>
          <UIButton
            variant={activeFilter === label ? 'filterActive' : 'filterInactive'}
            onClick={() => onFilterChange(label)}
          >
            {label}
          </UIButton>
        </li>
      ))}
    </ul>
  );
};

export default AuctionStatusFilters;
