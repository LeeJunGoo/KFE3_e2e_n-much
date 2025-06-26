import { TabsContent } from '@repo/ui/components/ui/tabs';
import AuctionListItem from './AuctionListItem';
import type { AuctionTabsContentProps } from 'src/types/mypage';

const AuctionTabsContent = ({ tab, data }: AuctionTabsContentProps) => {
  return (
    <TabsContent value={tab}>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <AuctionListItem key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <div className="text-semibold flex min-h-[30dvh] w-full items-center justify-center">
          {tab === 'ongoing' ? '진행중인 경매가 없습니다.' : '종료된 경매가 없습니다.'}
        </div>
      )}
    </TabsContent>
  );
};

export default AuctionTabsContent;
