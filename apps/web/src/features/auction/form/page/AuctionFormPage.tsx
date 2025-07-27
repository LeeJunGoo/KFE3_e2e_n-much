//TODO - memo 훅으로 최적화 시도 해보기

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { prefetchAddressId } from 'src/entities/auction/queries/address';
import { prefetchAuctionFormData } from 'src/entities/auction/queries/auction';
import { getServerUser } from 'src/entities/auth/serverAction';
import AuctionForm from 'src/features/auction/form/components/AuctionForm';
import DetailPageHeader from 'src/widgets/DetailPageHeader';
import type { AuctionFormPageProps } from 'src/entities/auction/types';

const AuctionFormPage = async ({ auctionId }: AuctionFormPageProps) => {
  const isEditing = !!auctionId;
  const pageTitle = isEditing ? '경매 수정하기' : '경매 등록하기';
  const userInfo = await getServerUser();
  const loggedInUserId = userInfo!.id; //NOTE - 미들웨어에서 비로그인시 메인 페이지로 리다이렉트 함
  const queryClient = new QueryClient();

  //TODO - 마이 페이지에서 주소를 변경할 때, 아래 쿼리 키의 캐시를 지워야 함 (KMH)
  await prefetchAddressId(loggedInUserId, queryClient);

  if (isEditing) {
    await prefetchAuctionFormData(auctionId, queryClient);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailPageHeader>{pageTitle}</DetailPageHeader>
      <AuctionForm auctionIdParam={isEditing ? auctionId : undefined} loggedInUserId={loggedInUserId} />
    </HydrationBoundary>
  );
};

export default AuctionFormPage;
