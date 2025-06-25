import { Tabs, TabsContent, TabsList } from '@repo/ui/components/ui/tabs';
import GoBackButton from 'src/components/common/GoBackButton';
import PageHeader from 'src/components/common/PageHeader';
import PageContainer from 'src/components/layout/PageContainer';
import TabTriggerItem from 'src/components/mypage/shared/TabTriggerItem';

const AUCTION_TABS = [
  { label: '경매현황', value: 'ongoing' },
  { label: '경매종료', value: 'closed' }
];

const MyAuctions = () => {
  return (
    <>
      <PageHeader title="내 경매 현황" />
      <PageContainer className="pt-0">
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="rounded-none">
            {AUCTION_TABS.map((tab) => (
              <TabTriggerItem key={tab.label} {...tab} className="text-md py-3" />
            ))}
          </TabsList>
          <div>
            <button>전체</button>
            <button>입찰중</button>
            <button>낙찰 예정</button>
          </div>
          <TabsContent value="ongoing">Make changes to your account here.</TabsContent>
          <TabsContent value="closed">Change your password here.</TabsContent>
        </Tabs>
      </PageContainer>
    </>
  );
};

export default MyAuctions;
