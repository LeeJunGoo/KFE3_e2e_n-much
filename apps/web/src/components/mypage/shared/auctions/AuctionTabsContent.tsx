import { TabsContent } from '@repo/ui/components/ui/tabs';

const AuctionTabsContent = () => {
  return (
    <>
      <TabsContent value="ongoing">Make changes to your account here.</TabsContent>
      <TabsContent value="closed">Change your password here.</TabsContent>
    </>
  );
};

export default AuctionTabsContent;
