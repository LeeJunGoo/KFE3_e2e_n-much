//TODO - 컴포넌트 이름 의논해보기 (KMH)

import { AuctionMutationPageProps } from 'src/entities/auction/types';
import AuctionFormPage from 'src/features/auction/AuctionFormPage';

const AuctionMutationPage = async ({ searchParams }: AuctionMutationPageProps) => {
  const { auction_id: auctionIdParam } = await searchParams;

  return <AuctionFormPage auctionId={auctionIdParam} />;
};

export default AuctionMutationPage;
