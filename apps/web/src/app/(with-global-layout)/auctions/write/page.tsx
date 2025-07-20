//TODO - 컴포넌트 이름 의논해보기 (KMH)

import AuctionFormPage from 'src/features/auction/AuctionFormPage';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { auction_id: auctionIdParam } = await searchParams;

  return <AuctionFormPage auctionId={auctionIdParam} />;
};

export default Page;
