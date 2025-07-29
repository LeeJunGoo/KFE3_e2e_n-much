import { Suspense } from 'react';
import EndingSoonListSection from 'src/features/auction/EndingSoonListSection';
import LatestListSection from 'src/features/auction/LatestListSection';
import PopularListSection from 'src/features/auction/PopularListSection';
import ContentEmpty from 'src/features/auction/shared/ContentEmpty';
import EndingSoonListSectionSkeleton from 'src/features/auction/skeleton/EndingSoonListSectionSkeleton';
import MainBanner from 'src/features/layout/main/components/MainBanner';
import EmptyState from 'src/features/user/mypage/components/shared/EmptyState';
import AuctionErrorBoundary from 'src/shared/ui/AuctionErrorBoundary';
import PageContainer from 'src/shared/ui/PageContainer';
import GoTopButton from 'src/shared/utils/goTopButton';

const MainPage = async () => {
  return (
    <>
      <MainBanner />
      <PageContainer>
        <AuctionErrorBoundary
          fallback={
            <EmptyState
              className="bg-(--color-background) rounded-lg border py-16 shadow-md"
              title="곧 종료되는 경매 물품을 불러오는 중 문제가 발생했어요."
              description="잠시 후 다시 시도해주세요!"
            />
          }
        >
          <Suspense fallback={<EndingSoonListSectionSkeleton />}>
            <EndingSoonListSection />
          </Suspense>
        </AuctionErrorBoundary>

        <AuctionErrorBoundary
          fallback={
            <ContentEmpty
              titleLabel="인기 경매 물품을 불러오는 중 문제가 발생했어요."
              contentLabel="잠시 후 다시 시도해주세요!"
              className="mt-8"
            />
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
            <ContentEmpty
              titleLabel="최신 경매 물품을 불러오는 중 문제가 발생했어요."
              contentLabel="잠시 후 다시 시도해주세요!"
              className="mt-8"
            />
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
        <GoTopButton />
      </PageContainer>
    </>
  );
};

export default MainPage;
