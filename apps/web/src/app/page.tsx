import { Badge } from '@repo/ui/components/ui/badge';
import AuctionCard from 'src/components/common/AuctionCard';
import TestImage from 'assets/images/test.png';
import { fetchSortedAuctions } from 'src/lib/queries/auctions';

const MainPage = async () => {
  const [endingSoonAuctions, popularAuctions, latestAuctions] = await Promise.all([
    fetchSortedAuctions('end_time', 5),
    fetchSortedAuctions('favorites', 5),
    fetchSortedAuctions('created_at', 5)
  ]);

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
            imageSrc={TestImage}
            currentPoint={300}
            status="on"
            episodeCount={3}
            favorites={3}
            endTime="2025"
          />
          <AuctionCard
            title="테스트 제목입니다."
            imageSrc={TestImage}
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
        <div className="grid grid-cols-2 gap-3">
          {popularAuctions.map((auction: any) => (
            <div
              key={auction.id}
              className="relative cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
            >
              <div className="relative h-[200px] w-full">
                <img src={auction.imageUrl} alt={auction.title} className="h-full w-full rounded-lg object-cover" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <h3 className="line-clamp-2 text-sm font-medium">{auction.title}</h3>
                  <div className="mt-2 flex items-center text-xs">
                    <div className="mr-3 flex items-center">
                      <i className="fas fa-heart mr-1 text-[#D84A5F]"></i>
                      <span>{auction.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-book-open mr-1 text-[#A3BCE5]"></i>
                      <span>{auction.stories}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
          {latestAuctions.map((auction, index) => (
            <li key={auction.id} className="flex cursor-pointer items-center p-3 transition-colors hover:bg-[#EEF2FB]">
              <div className="relative">
                <img src={auction.imageUrl} alt={auction.title} className="mr-3 h-20 w-20 rounded-lg object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="mr-2 flex-1 font-medium text-[#1F1F25]">{auction.title}</h3>
                  <Badge className="border-0 bg-[#5B80C2] text-xs text-white hover:bg-[#5B80C2]">
                    {auction.timeLeft}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm text-[#B8B8B8]">
                  <div className="flex items-center">
                    <i className="fas fa-heart mr-1 text-[#D84A5F]"></i>
                    <span>{auction.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-book-open mr-1"></i>
                    <span>{auction.stories}개의 스토리</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MainPage;
