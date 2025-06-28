'use client';
import { Tabs } from '@repo/ui/components/ui/tabs';
import MyTabsHeader from '../MyTabsHeader';
import MyTabsContent from '../MyTabsContent';
import MyAuctionListItem from './MyAuctionListItem'; // 추가!
import { useState } from 'react';
import { filterByTabKey } from 'src/utils/mypage/auctionFilters';
import { MOCK_AUCTION_DATA } from 'src/constants/mypage/mockData';
import { TAB_LABELS } from 'src/constants/mypage';
import type { TabKey } from 'src/types/mypage';

const MyAuctionTabsSection = () => {
  const [tabValue, setTabValue] = useState<TabKey>('ongoing');
  const filteredAuctions = filterByTabKey(MOCK_AUCTION_DATA, tabValue);

  const handleTabChange = (value: string) => {
    setTabValue(value as TabKey);
  };

  return (
    <section>
      <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
        <MyTabsHeader tabLabels={TAB_LABELS} />
        <MyTabsContent
          tab={tabValue}
          data={filteredAuctions}
          renderItem={(item) => <MyAuctionListItem item={item} />}
          itemClassName="mb-4"
          emptyMessage={{
            ongoing: '진행중인 경매가 없습니다.',
            closed: '종료된 경매가 없습니다.'
          }}
        />
      </Tabs>
    </section>
  );
};

export default MyAuctionTabsSection;
