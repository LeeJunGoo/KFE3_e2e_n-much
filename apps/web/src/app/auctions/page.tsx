'use client';
import { useRouter } from 'next/navigation';
import { useCreatedAuctions } from '../../../hooks/queries/useAuctions';
import { useGetUserEpisodes } from '../../../hooks/queries/useEpisodes';

const AuctionsPage = () => {
  const router = useRouter();
  /** 테스트 tanstack query */
  const TEST_USER_ID = '9c3f2e9c-dcc3-4c3f-8d42-1f7dfcc44374';
  const TEST_CREATED_AUCTIONS = 'a85dc1ce-abbd-42e6-ae58-86bf230b99aa';

  //경매자가 올린 데이터 리스트 불러오기
  const { data } = useCreatedAuctions(TEST_CREATED_AUCTIONS);

  const { data: episodes } = useGetUserEpisodes(TEST_USER_ID);

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
