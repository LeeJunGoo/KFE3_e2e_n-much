'use client';
import { mockStoryData } from 'src/constants/mypage/mockData';
import { useEffect, useState } from 'react';
import { Tabs } from '@repo/ui/components/ui/tabs';
import MyStoryFilters from './MyStoryFilters';
import { TabKey } from 'src/types/mypage';
import MyTabsHeader from '../shared/MyTabsHeader';
import { filterStoryByTab } from 'src/utils/mypage/storyFilters';
import MyTabsContent from '../shared/MyTabsContent';
import MyStoryListItem from './MyStoryListItem';
import { STORY_CONFIG, TAB_LABELS } from 'src/constants/mypage';
import { filterByText } from 'src/utils/mypage/filters';
import { useSearchParams } from 'next/navigation';

const MyStorySection = () => {
  const searchParams = useSearchParams();
  const [tabValue, setTabValue] = useState<TabKey>('ongoing');
  const [buttonFilter, setButtonFilter] = useState('전체');

  useEffect(() => {
    const urlTab = searchParams.get('tab') as TabKey;
    const urlFilter = searchParams.get('filter');

    if (urlTab && (urlTab === 'ongoing' || urlTab === 'closed')) {
      setTabValue(urlTab);
    }

    if (urlFilter) {
      setButtonFilter(urlFilter);
    }
  }, [searchParams]);

  // 1차 필터링 (탭)
  const tabFilteredStories = filterStoryByTab(mockStoryData, tabValue);

  // 2차 필터링 (버튼)
  const finalFilteredStories = filterByText(tabFilteredStories, buttonFilter, STORY_CONFIG.statusMap);

  const handleTabChange = (value: string) => {
    setTabValue(value as TabKey);
    setButtonFilter('전체');
  };

  const availableFilters = STORY_CONFIG.tabFilters[tabValue];

  return (
    <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
      <MyTabsHeader tabLabels={TAB_LABELS} />
      <MyStoryFilters
        availableFilters={availableFilters}
        activeFilter={buttonFilter}
        onFilterChange={setButtonFilter}
      />
      <MyTabsContent
        tab={tabValue}
        data={finalFilteredStories}
        renderItem={(item) => <MyStoryListItem item={item} />}
        itemClassName="group mb-4 flex cursor-pointer transition-colors duration-200 hover:bg-(--color-accent)/10"
      />
    </Tabs>
  );
};

export default MyStorySection;
