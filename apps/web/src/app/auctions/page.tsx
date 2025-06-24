'use client';
import { useRouter } from 'next/navigation';

const AuctionsPage = () => {
  const router = useRouter();

  const goToAuctionDetail = () => {
    router.push('/auctions/5d7c686c-1d3d-41c4-8a7f-21977163a51c');
  };

  return (
    <div>
      auctions 페이지
      <p onClick={goToAuctionDetail}>디테일 페이지 이동하기 테스트(클릭)</p>
    </div>
  );
};

export default AuctionsPage;
