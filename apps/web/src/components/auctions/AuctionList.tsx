'use client';

//FIXME - tanstack query 적용하기
//TODO -  select와 url 불일치 고민하기
//TODO - 서버 컴포넌트 전환 생각해보기

import { useQuery } from '@tanstack/react-query';
import { fetchAllAuctionWithEpisodeCount } from 'src/lib/queries/auctions';
import AuctionCard from '../common/AuctionCard';
import { AuctionRow } from 'src/lib/supabase/type';

// import SelectOrder from 'src/components/auctions/SelectOrder';

// export default function AuctionList() {
//   const searchParams = useSearchParams();
//   const auctionOrderParam = searchParams.get('order') || 'end_time';
//   const [auctions, setAuctions] = useState<(AuctionRow & EpisodeCount)[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [order, setOrder] = useState<string>(auctionOrderParam);

//   async function getAllAuction(order: string | null) {
//     let fetchUrl = null;
//     if (!order) {
//       fetchUrl = `http://localhost:3001/api/auctions_with_episode_count`;
//     } else {
//       fetchUrl = `http://localhost:3001/api/auctions_with_episode_count?order=${order}`;
//     }
//     const data = await fetch(fetchUrl);
//     const result = await data.json();
//     return result;
//   }

//   useEffect(() => {
//     async function init() {
//       const result = await getAllAuction(order);
//       if (result.status === 'success' && result.data) {
//         setAuctions(result.data);
//       }
//       setIsLoading(false);
//     }

//     init();
//   }, [order]);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div className="mb-4 flex w-full justify-between">
//         <p className="text-lg font-semibold text-[#1F1F25]">경매 리스트</p>
//         <SelectOrder order={order} setOrder={setOrder} />
//       </div>
//       <div className="rounded-md bg-gray-300 px-2 py-2">
//         <p className="pt-1 pb-2 text-sm">{`총 ${auctions.length}개의 경매가 있습니다`}</p>
//         <ul className="grid grid-cols-2 gap-3">
//           {auctions.length > 0 &&
//             auctions.map((auction) => {
//               const { auction_id, status, title, current_point, end_time, episodes } = auction;
//               let { image_urls, favorites } = auction;

//               if (!image_urls) {
//                 image_urls = [];
//               }

//               if (!favorites) {
//                 favorites = [];
//               }

//               return (
//                 <AuctionCard
//                   key={auction_id}
//                   status={status}
//                   imageSrc={image_urls[0]}
//                   title={title}
//                   currentPoint={current_point}
//                   endTime={end_time}
//                   episodeCount={episodes[0]['count']}
//                   favorites={favorites.length}
//                 />
//               );
//             })}
//         </ul>
//       </div>
//     </>
//   );
// }

interface EpisodeCount {
  episodes: [{ count: number }];
}

export default function AuctionList({ order }: { order: string }) {
  const {
    data: auctions,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['auctions'],
    queryFn: () => fetchAllAuctionWithEpisodeCount(order)
  });
  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  return (
    <div className="rounded-md bg-gray-300 px-2 py-2">
      <p className="pt-1 pb-2 text-sm">{`총 ${5}개의 경매가 있습니다`}</p>
      <ul className="grid grid-cols-2 gap-3">
        {auctions.length > 0 &&
          auctions.map((auction: AuctionRow & EpisodeCount) => {
            const { auction_id, status, title, current_point, end_time, episodes } = auction;
            let { image_urls, favorites } = auction;
            if (!image_urls) {
              image_urls = [];
            }
            if (!favorites) {
              favorites = [];
            }
            return (
              <AuctionCard
                key={auction_id}
                status={status}
                imageSrc={image_urls[0]}
                title={title}
                currentPoint={current_point}
                endTime={end_time}
                episodeCount={episodes[0]['count']}
                favorites={favorites.length}
              />
            );
          })}
      </ul>
    </div>
  );
}
