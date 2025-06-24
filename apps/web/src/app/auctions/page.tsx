'use client';
import { useRouter } from 'next/navigation';

const AuctionsPage = () => {
  const router = useRouter();

  const goToAuctionDetail = () => {
    router.push('/auctions/9e525843-9047-4f17-8dc7-368f9311bf57');
  };

  return (
    <div>
      auctions 페이지
      <p onClick={goToAuctionDetail}>디테일 페이지 이동하기 테스트(클릭)</p>
    </div>
  );
};

export default AuctionsPage;
