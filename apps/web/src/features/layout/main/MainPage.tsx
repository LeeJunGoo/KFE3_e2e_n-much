import { Suspense } from 'react';
import EndingSoonListSection from 'src/features/auction/EndingSoonListSection';
import LatestListSection from 'src/features/auction/LatestListSection';
import PopularListSection from 'src/features/auction/PopularListSection';
import MainBanner from 'src/features/layout/main/components/MainBanner';
import AuctionErrorBoundary from 'src/shared/ui/AuctionErrorBoundary';
import PageContainer from 'src/shared/ui/PageContainer';

const MainPage = async () => {
  return (
    <>
      <MainBanner />
      <PageContainer>
        {/* Ending Soon Auctions */}
        <AuctionErrorBoundary
          fallback={
            <div className="flex h-[200px] items-center justify-center border-2">
              <h3 className="text-[22px]">⚠️ 곧 마감 물품 섹션에서 오류가 발생했습니다.</h3>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex h-[200px] items-center justify-center">
                <span className="animate-pulse text-lg text-gray-500">{'🚚 경매 데이터를 불러오는 중입니다...'}</span>
              </div>
            }
          >
            <EndingSoonListSection />
          </Suspense>
        </AuctionErrorBoundary>
        {/* Popular Auctions */}
        <AuctionErrorBoundary
          fallback={
            <div className="flex h-[200px] items-center justify-center border-2">
              <h3 className="text-[22px]">⚠️ 인기 경매 물품 섹션에서 오류가 발생했습니다.</h3>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex h-[200px] items-center justify-center">
                <span className="animate-pulse text-lg text-gray-500">{'🚚 경매 데이터를 불러오는 중입니다...'}</span>
              </div>
            }
          >
            <PopularListSection />
          </Suspense>
        </AuctionErrorBoundary>
        {/* Latest Auctions */}
        <AuctionErrorBoundary
          fallback={
            <div className="flex h-[200px] items-center justify-center border-2">
              <h3 className="text-[22px]">⚠️ 최신 경매 물품 섹션에서 오류가 발생했습니다.</h3>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex h-[200px] items-center justify-center">
                <span className="animate-pulse text-lg text-gray-500">{'🚚 경매 데이터를 불러오는 중입니다...'}</span>
              </div>
            }
          >
            <LatestListSection />
          </Suspense>
        </AuctionErrorBoundary>
      </PageContainer>
    </>
  );
};

export default MainPage;
