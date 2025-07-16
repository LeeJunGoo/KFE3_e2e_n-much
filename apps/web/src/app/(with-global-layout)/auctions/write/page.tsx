import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchAuctionById } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { auction_id } = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auctionForm'],
    queryFn: () => fetchAuctionById(auction_id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{auction_id ? '경매 수정' : '경매 등록'}</DetailPageHeader>
      <AuctionForm auctionIdParam={auction_id} />
    </HydrationBoundary>
  );
}
