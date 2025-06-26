'use client';
import { Tabs } from '@repo/ui/components/ui/tabs';
import AuctionTabsHeader from './AuctionTabsHeader';
import AuctionStatusFilters from './AuctionStatusFilters';
import AuctionTabsContent from './AuctionTabsContent';
import { useMemo, useState } from 'react';
import { filterAuctionsByStatus, filterAuctionsByTab } from 'src/utils/mypage/auctionFilters';
import { MOCK_AUCTION_DATA } from 'src/constants/mypage/mockData';
import type { TabKey } from 'src/types/mypage';

const AuctionTabsSection = () => {
  const [tabValue, setTabValue] = useState<TabKey>('ongoing');
  const [activeFilter, setActiveFilter] = useState<string>('전체');

  // 필터링된 데이터 계산
  const filteredData = useMemo(() => {
    const tabFiltered = filterAuctionsByTab(MOCK_AUCTION_DATA, tabValue);
    const statusFiltered = filterAuctionsByStatus(tabFiltered, activeFilter);

    return statusFiltered;
  }, [tabValue, activeFilter]);

  const handleTabChange = (value: string) => {
    if (value === 'ongoing' || value === 'closed') {
      setTabValue(value);
      setActiveFilter('전체');
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <section>
      <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
        <AuctionTabsHeader />
        <AuctionStatusFilters tab={tabValue} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        <AuctionTabsContent tab={tabValue} data={filteredData} />
      </Tabs>
    </section>
  );
};

export default AuctionTabsSection;
