import { Separator } from '@repo/ui/components/ui/separator';
import { Badge } from 'lucide-react';
import React from 'react';
import Cards from './Cards';
const Sample = () => {
  const popularAuctions = [
    {
      id: 1,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20premium%20wine%20tasting%20experience%20with%20sommelier%2C%20elegant%20wine%20glasses%2C%20vineyard%20backdrop%2C%20warm%20lighting%2C%20sophisticated%20atmosphere%2C%20educational%20wine%20sampling%20setup&width=180&height=200&seq=pop1&orientation=portrait',
      title: '프리미엄 와인 테이스팅 클래스',
      likes: 128,
      stories: 42
    },
    {
      id: 2,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20traditional%20tea%20ceremony%20setting%20with%20authentic%20tea%20sets%2C%20zen%20atmosphere%2C%20minimalist%20decor%2C%20soft%20natural%20lighting%2C%20cultural%20experience%2C%20mindfulness%20moment&width=180&height=180&seq=pop2&orientation=squarish',
      title: '전통 차 예절 체험권',
      likes: 95,
      stories: 36,
      height: 'h-[180px]'
    },
    {
      id: 3,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20luxury%20hotel%20suite%20with%20panoramic%20city%20view%2C%20premium%20bedding%2C%20elegant%20interior%20design%2C%20mood%20lighting%2C%20high-end%20accommodation%20experience%2C%20sophisticated%20decor&width=180&height=180&seq=pop3&orientation=squarish',
      title: '5성급 호텔 스위트룸 숙박권',
      likes: 156,
      stories: 48,
      height: 'h-[180px]'
    },
    {
      id: 4,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20hot%20air%20balloon%20ride%20at%20sunrise%2C%20breathtaking%20aerial%20view%2C%20golden%20hour%20lighting%2C%20adventure%20experience%2C%20romantic%20setting%2C%20bucket%20list%20activity%2C%20emotional%20journey&width=180&height=240&seq=pop4&orientation=portrait',
      title: '열기구 일출 투어 티켓',
      likes: 203,
      stories: 67,
      height: 'h-[240px]'
    }
  ];
  // Latest auctions
  const latestAuctions = [
    {
      id: 1,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20musical%20concert%20ticket%20with%20artistic%20design%2C%20vibrant%20colors%2C%20premium%20event%20access%2C%20entertainment%20experience%2C%20exclusive%20show%20pass&width=80&height=80&seq=lat1&orientation=squarish',
      title: '재즈 페스티벌 VIP 티켓',
      timeLeft: '3시간 남음',
      likes: 34,
      stories: 12
    },
    {
      id: 2,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20pottery%20class%20workshop%20setting%20with%20clay%2C%20tools%2C%20and%20handcrafted%20items%2C%20artistic%20creative%20environment%2C%20hands-on%20experience%2C%20craftsmanship%20learning&width=80&height=80&seq=lat2&orientation=squarish',
      title: '도예 원데이 클래스 체험권',
      timeLeft: '5시간 남음',
      likes: 28,
      stories: 15
    },
    {
      id: 3,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20premium%20bakery%20class%20with%20pastries%20and%20baking%20tools%2C%20culinary%20learning%20experience%2C%20artisanal%20bread%20making%2C%20gourmet%20food%20education&width=80&height=80&seq=lat3&orientation=squarish',
      title: '프랑스 파티세리 베이킹 클래스',
      timeLeft: '8시간 남음',
      likes: 42,
      stories: 19
    },
    {
      id: 4,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20photography%20workshop%20in%20nature%20with%20professional%20camera%20equipment%2C%20outdoor%20learning%20experience%2C%20creative%20skill%20development%2C%20artistic%20education&width=80&height=80&seq=lat4&orientation=squarish',
      title: '자연 풍경 사진 촬영 워크샵',
      timeLeft: '12시간 남음',
      likes: 56,
      stories: 23
    },
    {
      id: 5,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20cocktail%20mixing%20masterclass%20with%20premium%20spirits%20and%20bar%20tools%2C%20mixology%20experience%2C%20craft%20beverage%20education%2C%20sophisticated%20drink%20creation&width=80&height=80&seq=lat5&orientation=squarish',
      title: '프리미엄 칵테일 마스터클래스',
      timeLeft: '24시간 남음',
      likes: 67,
      stories: 31
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F4F4F7] pb-20">
      {/* Main Content Area */}
      <div className="pt-14 pb-16">
        {/* Hero Slider */}
        <div className="mt-4 w-full"></div>
        {/* Ending Soon Auctions */}
        <div className="mt-8 px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1F1F25]">곧 종료되는 경매</h2>
            <a href="#" className="cursor-pointer text-sm text-[#5B80C2]">
              더보기
            </a>
          </div>
          <Cards />
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
          {popularAuctions.map((auction) => (
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
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          {latestAuctions.map((auction, index) => (
            <React.Fragment key={auction.id}>
              <div className="flex cursor-pointer items-center p-3 transition-colors hover:bg-[#EEF2FB]">
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
              </div>
              {index < latestAuctions.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sample;
