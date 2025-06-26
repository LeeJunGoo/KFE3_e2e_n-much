import { TabsList } from '@repo/ui/components/ui/tabs';
import TabTriggerItem from '../../../common/TabTriggerItem';
import { AUCTION_TABS } from 'src/constants/mypage';

const AuctionTabsHeader = () => {
  return (
    <TabsList className="rounded-none">
      {AUCTION_TABS.map((tab) => (
        <TabTriggerItem key={tab.label} {...tab} className="text-md py-3" />
      ))}
    </TabsList>
  );
};

export default AuctionTabsHeader;
