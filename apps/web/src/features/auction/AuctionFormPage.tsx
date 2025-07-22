//TODO - memo 훅으로 최적화 시도 해보기

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAddressId, getAuction } from 'src/entities/auction/api';
import { addressIdKeys, auctionFormKeys } from 'src/entities/auction/queries/queryKeyFactory';
import { getServerUser } from 'src/entities/auth/serverAction';
import AuctionForm from 'src/features/auction/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import type { AuctionFormPageProps } from 'src/entities/auction/types';

const AuctionFormPage = async ({ auctionId }: AuctionFormPageProps) => {
  const isEditing = Boolean(auctionId);
  const pageTitle = isEditing ? '경매 수정하기' : '경매 등록하기';
  const userInfo = await getServerUser();
  const loggedInUserId = userInfo!.id; //NOTE - 미들웨어에서 비로그인시 메인 페이지로 리다이렉트 함
  const queryClient = new QueryClient();

  //TODO - 마이 페이지에서 주소를 변경할 때, 아래 쿼리 키의 캐시를 지워야 함 (KMH)
  await queryClient.prefetchQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: () => getAddressId(loggedInUserId)
  });

  if (!isEditing && auctionId) {
    return (
      <>
        <DetailPageHeader>{pageTitle}</DetailPageHeader>
        <AuctionForm auctionIdParam={undefined} loggedInUserId={loggedInUserId} />
      </>
    );
  }

  await queryClient.prefetchQuery({
    queryKey: auctionFormKeys.item(auctionId),
    queryFn: () => getAuction(auctionId)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{pageTitle}</DetailPageHeader>
      <AuctionForm auctionIdParam={auctionId} loggedInUserId={loggedInUserId} />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
