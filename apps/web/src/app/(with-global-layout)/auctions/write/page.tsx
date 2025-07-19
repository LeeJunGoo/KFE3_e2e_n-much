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

  const queryClient = new QueryClient();

  //TODO - 마이 페이지에서 주소를 변경할 때, 아래 쿼리 키의 캐시를 지워야 함 (KMH)
  await queryClient.prefetchQuery({
    queryKey: ['addressId', loggedInUserId],
    queryFn: () => getAddressId(loggedInUserId)
  });

  if (!isEditing) {
    //TODO - auctionForm에서 경매를 수정할 경우, 캐시를 지워야 함 (KMH)
    //FIXME - 경매 리스트의 쿼리 키에 따라서 쿼리 키 수정하기 (KMH)
    await queryClient.prefetchQuery({
      queryKey: ['auctionForm', auctionId],
      queryFn: () => getAuction(auctionId)
    });

    return (
      <>
        <DetailPageHeader>{pageTitle}</DetailPageHeader>
        <AuctionForm auctionIdParam={undefined} />
      </>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{pageTitle}</DetailPageHeader>
      <AuctionForm auctionIdParam={auctionId} />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
