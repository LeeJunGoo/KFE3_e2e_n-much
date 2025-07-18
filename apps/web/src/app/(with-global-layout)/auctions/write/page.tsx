//FIXME - memo 훅으로 최적화 시도 해보기

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAddressId, getAuction } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

interface AuctionFormPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const AuctionFormPage = async ({ searchParams }: AuctionFormPageProps) => {
  const { auction_id: auctionId } = await searchParams;
  const isEditing = Boolean(auctionId);
  const pageTitle = isEditing ? '경매 수정하기' : '경매 등록하기';
  const loggedInUserId = 'b021a550-5857-4330-9b0e-ed53ac81c8d6'; //FIXME - 로그인한 정보를 가져오는 함수로 대체하기 (KMH)

  if (!isEditing) {
    return (
      <>
        <DetailPageHeader>{pageTitle}</DetailPageHeader>
        <AuctionForm auctionIdParam={undefined} />
      </>
    );
  }

  //NOTE - 다른 곳에서 사용할 일이 있다면 공통으로 분리하기 (auctionList에서 사용할 것으로 예상) (KMH)
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auctionForm'],
    queryFn: () => getAuction(auctionId)
  });

  await queryClient.prefetchQuery({
    queryKey: ['addressId'],
    queryFn: () => getAddressId(loggedInUserId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{pageTitle}</DetailPageHeader>
      <AuctionForm auctionIdParam={auctionId} />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
