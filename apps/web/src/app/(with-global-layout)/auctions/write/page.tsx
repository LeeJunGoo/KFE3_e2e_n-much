import AuctionForm from 'src/components/auctions/AuctionForm';
import PageContainer from 'src/components/layout/PageContainer';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { auction_id } = await searchParams;
  return (
    <PageContainer>
      <AuctionForm auctionIdParam={auction_id} />;
    </PageContainer>
  );
}
