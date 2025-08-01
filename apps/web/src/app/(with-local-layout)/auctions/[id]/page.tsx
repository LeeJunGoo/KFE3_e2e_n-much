import AuctionDetailPage from 'src/features/auction/detail/AuctionDetailPage';

const AuctionDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <AuctionDetailPage params={params} />
    </>
  );
};

export default AuctionDetail;
