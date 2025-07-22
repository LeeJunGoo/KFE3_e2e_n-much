import AuctionListPage from 'src/features/auction/AuctionListPage';

//TODO - 파일로 분리하기 (KMH)
interface CurrentAuctionsPageProps {
  searchParams: Promise<{ order: string }>;
}

const CurrentAuctionsPage = async ({ searchParams }: CurrentAuctionsPageProps) => {
  const { order } = await searchParams; //NOTE - 미들웨어에서 order가 없는 경우, order=end_date로 리다이렉트함

  return <AuctionListPage order={order} />;
};
export default CurrentAuctionsPage;
