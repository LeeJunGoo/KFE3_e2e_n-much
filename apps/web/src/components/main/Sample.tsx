'use client';

import { Card } from '@repo/ui/components/ui/card';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { Separator } from '@repo/ui/components/ui/separator';
import { Badge } from 'lucide-react';
import React, { useState } from 'react';
const Sample = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20warm%20and%20emotional%20scene%20of%20people%20sharing%20stories%20over%20dinner%2C%20soft%20lighting%2C%20intimate%20atmosphere%2C%20gentle%20bokeh%20effect%2C%20emotional%20connection%20between%20diverse%20individuals%2C%20pastel%20colors%2C%20storytelling%20moment%20captured%20with%20cinematic%20quality%2C%20high-resolution%20photography&width=800&height=400&seq=hero1&orientation=landscape',
      title: '당신의 이야기가 가치를 만듭니다',
      description: '숫자보다 감성이 더 중요한 곳, 스토리 경매에 참여하세요'
    },
    {
      id: 2,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20person%20writing%20a%20heartfelt%20letter%20or%20story%20with%20a%20vintage%20fountain%20pen%2C%20warm%20lighting%2C%20emotional%20ambiance%2C%20handwritten%20notes%20visible%2C%20coffee%20cup%20nearby%2C%20cozy%20atmosphere%2C%20film%20photography%20aesthetic%2C%20storytelling%20moment&width=800&height=400&seq=hero2&orientation=landscape',
      title: '진심을 담은 이야기',
      description: '당신의 진솔한 이야기로 특별한 경험을 얻어보세요'
    },
    {
      id: 3,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20group%20of%20friends%20celebrating%20a%20special%20moment%2C%20emotional%20reunion%2C%20warm%20ambient%20lighting%2C%20genuine%20smiles%20and%20tears%20of%20joy%2C%20intimate%20setting%20with%20soft%20focus%20background%2C%20cinematic%20color%20grading%2C%20storytelling%20through%20photography&width=800&height=400&seq=hero3&orientation=landscape',
      title: '감동이 이어지는 공간',
      description: '가격보다 가치 있는 스토리로 마음을 움직여보세요'
    }
  ];
  // Ending soon auctions
  const endingSoonAuctions = [
    {
      id: 1,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20gourmet%20dinner%20setting%20with%20elegant%20plating%2C%20soft%20lighting%2C%20premium%20restaurant%20ambiance%2C%20high-end%20culinary%20experience%2C%20artistic%20food%20presentation%2C%20warm%20atmosphere%2C%20professional%20food%20photography%20style&width=280&height=160&seq=end1&orientation=landscape',
      title: '미쉐린 스타 레스토랑 2인 식사권',
      timeLeft: '2시간 남음',
      stories: 18,
      likes: 45
    },
    {
      id: 2,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20cozy%20cafe%20interior%20with%20vintage%20decor%2C%20warm%20lighting%2C%20artistic%20latte%20art%20visible%20on%20coffee%20cups%2C%20intimate%20seating%20arrangement%2C%20wooden%20elements%2C%20soft%20bokeh%20effect%2C%20inviting%20atmosphere&width=280&height=160&seq=end2&orientation=landscape',
      title: '오래된 책방 카페 브런치 초대권',
      timeLeft: '5시간 남음',
      stories: 24
    },
    {
      id: 3,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20private%20cooking%20class%20setting%20with%20chef%20and%20ingredients%20prepared%2C%20warm%20lighting%2C%20intimate%20kitchen%20environment%2C%20culinary%20tools%20visible%2C%20educational%20cooking%20setup%2C%20premium%20cooking%20experience&width=280&height=160&seq=end3&orientation=landscape',
      title: '프라이빗 쿠킹 클래스 체험권',
      timeLeft: '8시간 남음',
      stories: 15
    },
    {
      id: 4,
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20romantic%20dinner%20setup%20on%20a%20rooftop%20with%20city%20skyline%20view%2C%20candles%2C%20flower%20petals%2C%20intimate%20table%20for%20two%2C%20sunset%20lighting%2C%20premium%20dining%20experience%2C%20elegant%20wine%20glasses&width=280&height=160&seq=end4&orientation=landscape',
      title: '루프탑 프라이빗 디너 2인권',
      timeLeft: '12시간 남음',
      stories: 32
    }
  ];
  // Popular auctions
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
      {/* Top Navigation Bar */}
      <div className="fixed top-0 right-0 left-0 z-50 flex h-14 items-center justify-between bg-white px-4 shadow-sm">
        <div className="text-xl font-semibold text-[#1F1F25]">
          <span className="text-[#5B80C2]">스토리</span>옥션
        </div>
        <div className="flex items-center gap-4">
          <i className="fas fa-bell cursor-pointer text-[#5B80C2]"></i>
        </div>
      </div>
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
          <ScrollArea className="w-full pb-4 whitespace-nowrap">
            <div className="flex gap-3">
              {endingSoonAuctions.map((auction) => (
                <Card
                  key={auction.id}
                  className="!rounded-button w-[280px] shrink-0 cursor-pointer overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative">
                    <img src={auction.imageUrl} alt={auction.title} className="h-40 w-full object-cover" />
                    <Badge className="absolute right-2 bottom-2 border-0 bg-[#5B80C2] text-white hover:bg-[#5B80C2]">
                      {auction.timeLeft}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="truncate font-medium text-[#1F1F25]">{auction.title}</h3>
                    <div className="mt-2 flex items-center justify-between text-sm text-[#B8B8B8]">
                      <div className="flex items-center gap-3">
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
                </Card>
              ))}
            </div>
          </ScrollArea>
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
                    <img
                      src={auction.imageUrl}
                      alt={auction.title}
                      className="mr-3 h-20 w-20 rounded-lg object-cover"
                    />
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
      {/* Bottom Navigation Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-50 flex h-16 items-center justify-around border-t border-[#C6C7D1] bg-white">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex h-full w-1/4 cursor-pointer flex-col items-center justify-center ${activeTab === 'home' ? 'text-[#5B80C2]' : 'text-[#B8B8B8]'}`}
        >
          <i className="fas fa-home text-lg"></i>
          <span className="mt-1 text-xs">홈</span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex h-full w-1/4 cursor-pointer flex-col items-center justify-center ${activeTab === 'search' ? 'text-[#5B80C2]' : 'text-[#B8B8B8]'}`}
        >
          <i className="fas fa-search text-lg"></i>
          <span className="mt-1 text-xs">검색</span>
        </button>
        <button
          onClick={() => setActiveTab('auctions')}
          className={`flex h-full w-1/4 cursor-pointer flex-col items-center justify-center ${activeTab === 'auctions' ? 'text-[#5B80C2]' : 'text-[#B8B8B8]'}`}
        >
          <i className="fas fa-gavel text-lg"></i>
          <span className="mt-1 text-xs">경매현황</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex h-full w-1/4 cursor-pointer flex-col items-center justify-center ${activeTab === 'profile' ? 'text-[#5B80C2]' : 'text-[#B8B8B8]'}`}
        >
          <i className="fas fa-user text-lg"></i>
          <span className="mt-1 text-xs">프로필</span>
        </button>
      </div>
    </div>
  );
};
export default Sample;
