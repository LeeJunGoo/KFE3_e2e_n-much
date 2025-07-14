//NOTE - searchParams 카멜 케이스 구조 분해 할당 카멜 케이스로 나옴
//NOTE - auction_id 빈 값일 경우 null로 처리
//NOTE - PageHeader 사라짐

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchAuctionById } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
// import PageHeader from 'src/widgets/PageHeader';

const AuctionWritePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  const { auction_id } = await searchParams;

  if (!auction_id) {
    return <AuctionForm auctionIdParam={undefined} />;
  } else {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ['auctionForm'],
      queryFn: () => fetchAuctionById(auction_id)
    });

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <PageHeader>{auction_id ? '경매 수정' : '경매 등록'}</PageHeader> */}
        <AuctionForm auctionIdParam={auction_id} />
      </HydrationBoundary>
    );
  }
};

export default AuctionWritePage;
