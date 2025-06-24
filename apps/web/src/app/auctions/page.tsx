'use client';
import { useRouter } from 'next/navigation';

const AuctionsPage = () => {
  const router = useRouter();

  const goToAuctionDetail = () => {
    router.push('/auctions/e8583b1b-988e-4713-b849-44f49fb3b610');
  };

  return (
    <div>
      auctions 페이지
      <p onClick={goToAuctionDetail}>디테일 페이지 이동하기 테스트(클릭)</p>
    </div>
  );
};

export default AuctionsPage;
