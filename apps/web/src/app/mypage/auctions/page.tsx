'use client';
import { Tabs } from '@repo/ui/components/ui/tabs';
import { useState } from 'react';
import PageHeader from 'src/components/common/PageHeader';
import PageContainer from 'src/components/layout/PageContainer';
import AuctionStatusFilters from 'src/components/mypage/shared/auctions/AuctionStatusFilters';
import AuctionTabsContent from 'src/components/mypage/shared/auctions/AuctionTabsContent';
import AuctionTabsHeader from 'src/components/mypage/shared/auctions/AuctionTabsHeader';
import type { TabKey } from 'src/types/mypage';

const MyAuctions = () => {
  const [tabValue, setTabValue] = useState<TabKey>('ongoing');

  const handleTabChange = (value: string) => {
    if (value === 'ongoing' || value === 'closed') {
      setTabValue(value);
    }
  };

  return (
    <>
      <PageHeader title="내 경매 현황" />
      <PageContainer className="pt-1">
        <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
          <AuctionTabsHeader />
          <AuctionStatusFilters tab={tabValue} />
          <AuctionTabsContent />
        </Tabs>
      </PageContainer>
    </>
  );
};

export default MyAuctions;
