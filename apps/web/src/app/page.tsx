import AuctionCard from 'src/components/common/AuctionCard';
import LatestAuctionCard from 'src/components/main/LatestAuctionCard';
import PopularAuctionCard from 'src/components/main/PopularAuctionCard';
import { fetchSortedAuctions } from 'src/lib/queries/auctions';
import { SortedAuctionItemType } from 'src/types/main';

const MainPage = async () => {
  const [endingSoonAuctions, popularAuctions, latestAuctions] = await Promise.all([
    fetchSortedAuctions('end_time', 5),
    fetchSortedAuctions('favorites', 5),
    fetchSortedAuctions('created_at', 8)
  ]);
  console.log('🚀 ~ MainPage ~ popularAuctions:', popularAuctions);

  return (
    <div className="relative min-h-screen bg-[#F4F4F7] pb-20">
      {/* Main Content Area */}
      <div className="pt-14 pb-16">{/* Hero Slider */}</div>
      {/* Ending Soon Auctions */}
      <div className="mt-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1F1F25]">곧 종료되는 경매</h2>
          <a href="#" className="cursor-pointer text-sm text-[#5B80C2]">
            더보기
          </a>
        </div>
        <div className="flex">
          <AuctionCard
            title="테스트 제목입니다."
            imageSrc="/apps/web/assets/images/test.png"
            currentPoint={300}
            status="on"
            episodeCount={3}
            favorites={3}
            endTime="2025"
          />
          <AuctionCard
            title="테스트 제목입니다."
            imageSrc="/apps/web/assets/images/test.png"
            currentPoint={300}
            status="on"
            episodeCount={3}
            favorites={3}
            endTime="2025"
          />
        </div>
      </div>
      {/* Popular Auctions */}
      <div className="mt-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1F1F25]">인기 경매</h2>
          <a href="#" className="cursor-pointer text-sm text-[#5B80C2]">
            더보기
          </a>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {popularAuctions.map((auction: SortedAuctionItemType) => (
            <PopularAuctionCard key={auction.auction_id} auction={auction} />
          ))}
        </ul>
      </div>
      {/* Latest Auctions */}
      <div className="mt-8 px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1F1F25]">최신 경매</h2>
          <a href="#" className="cursor-pointer text-sm text-[#5B80C2]">
            더보기
          </a>
        </div>
        <ul className="overflow-hidden rounded-lg bg-white shadow-sm">
          {latestAuctions.map((auction: SortedAuctionItemType) => (
            <LatestAuctionCard key={auction.auction_id} auction={auction} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MainPage;
