//TODO - memo 훅으로 최적화 시도 해보기
//TODO - 미들웨어에서 로그인한 유저만 접근 가능하도록 수정 (KMH)
//TODO - 상세 정보에서 수정하기 누르면 미들웨어에서 자기 계정인지 확인해서 필터링하기  (KMH)

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAddressId, getAuction } from 'src/entities/auction/api';
import AuctionForm from 'src/features/auction/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';

interface AuctionFormPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

//TODO - 분리하기 (KMH)
const EDITING_AUCTION_TITLE = '경매 수정하기';
const REGISTERING_AUCTION_TITLE = '경매 등록하기';

//TODO - 분리하기 (KMH)
const auctionFormKeys = {
  all: ['auctionForm'] as const,
  item: (auctionId: string) => [...auctionFormKeys.all, auctionId] as const
};

//TODO - 분리하기 (KMH)
const addressIdKeys = {
  all: ['addressId'] as const,
  item: (userId: string) => [...auctionFormKeys.all, userId] as const
};

const AuctionFormPage = async ({ searchParams }: AuctionFormPageProps) => {
  const { auction_id: auctionId } = await searchParams;
  const isEditing = Boolean(auctionId);
  const pageTitle = isEditing ? EDITING_AUCTION_TITLE : REGISTERING_AUCTION_TITLE;
  const loggedInUserId = 'b021a550-5857-4330-9b0e-ed53ac81c8d6'; //FIXME - 로그인한 정보를 가져오는 함수로 대체하기 (KMH)

  const queryClient = new QueryClient();

  //TODO - 마이 페이지에서 주소를 변경할 때, 아래 쿼리 키의 캐시를 지워야 함 (KMH)
  await queryClient.prefetchQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: () => getAddressId(loggedInUserId)
  });

  if (!isEditing && auctionId) {
    //TODO - auctionForm에서 경매를 수정할 경우, 캐시를 지워야 함 (KMH)
    await queryClient.prefetchQuery({
      queryKey: auctionFormKeys.item(auctionId),
      queryFn: () => getAuction(auctionId)
    });

    return (
      <>
        <DetailPageHeader>{pageTitle}</DetailPageHeader>
        <AuctionForm auctionIdParam={undefined} loggedInUserId={loggedInUserId} />
      </>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{pageTitle}</DetailPageHeader>
      <AuctionForm auctionIdParam={auctionId} loggedInUserId={loggedInUserId} />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
