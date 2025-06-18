'use client';
import { getAllAuctions, getAuction } from '@repo/ui/utils/supabase/query/auctions';
import { getAllUsers, getUserAuctionCount } from '@repo/ui/utils/supabase/query/users';
import { getHighestBid } from '@repo/ui/utils/supabase/query/episodes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuctionsPage = () => {
  const router = useRouter();

  //경매 정보 가져오기 테스트
  // useEffect(() => {
  //   console.log('🚀 경매정보 리스트 가져오기 - 테스트 시작!');
  //   getAllAuctions();
  // }, []);

  //해당 경매 페이지의 최고 입찰자
  useEffect(() => {
    console.log('🚀 최고 입찰자 가져오기 - 테스트 시작!');
    getHighestBid('9e525843-9047-4f17-8dc7-368f9311bf57');
  }, []);

  //경매 정보 (특정한명)
  // useEffect(() => {
  //   console.log('🚀 경매 한명 가져오기 - 테스트 시작!');
  //   getAuction('41e19b8d-bb97-465c-a98a-1b9a2d4310a5');
  // }, []);

  //경매자 총 경매수 count, 현재 진행중인 경매 count
  // useEffect(() => {
  //   console.log('🚀 경매자 이준구 가져오기 - 테스트 시작!');
  //   getUserAuctionCount('a85dc1ce-abbd-42e6-ae58-86bf230b99aa');
  // }, []);

  const goToAuctionDetail = () => {
    router.push(`/auctions/1`);
  };

  return (
    <div>
      auctions 페이지
      <p onClick={goToAuctionDetail}>디테일 페이지 이동하기 테스트(클릭)</p>
    </div>
  );
};

export default AuctionsPage;
