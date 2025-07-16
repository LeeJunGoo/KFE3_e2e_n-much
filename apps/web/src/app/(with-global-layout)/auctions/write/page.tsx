//NOTE - 서영님 PageHeader import해서 사용하기

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAuctionWIthAddress } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
// import PageHeader from 'src/widgets/PageHeader';

const AuctionWritePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const { auction_id: auctionId } = await searchParams;
  if (!auctionId) {
    return <AuctionForm auctionIdParam={null} />;
  } else {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ['auctionForm'],
      queryFn: () => getAuctionWIthAddress(auctionId)
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <PageHeader>{auction_id ? '경매 수정' : '경매 등록'}</PageHeader> */}
        <AuctionForm auctionIdParam={auctionId} />
      </HydrationBoundary>
    );
  }
};

export default AuctionWritePage;
