import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuctionWIthAddress } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

interface AuctionFormPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const AuctionFormPage = async ({ searchParams }: AuctionFormPageProps) => {
  const { auction_id: auctionId } = await searchParams;

  if (!auctionId) {
    return (
      <>
        <DetailPageHeader>{'경매 등록하기'}</DetailPageHeader>
        <AuctionForm auctionIdParam={null} />
      </>
    );
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auctionForm'],
    queryFn: () => getAuctionWIthAddress(auctionId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{'경매 수정하기'}</DetailPageHeader>
      <AuctionForm auctionIdParam={auctionId} />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
