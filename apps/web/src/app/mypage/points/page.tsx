import { Button } from '@repo/ui/components/ui/button';
import { FaGavel } from 'react-icons/fa6';
import PageHeader from 'src/components/common/PageHeader';
import PageContainer from 'src/components/layout/PageContainer';
import ListCard from 'src/components/mypage/ListCard';
import SectionCard from 'src/components/mypage/shared/SectionCard';

const MyPoints = () => {
  return (
    <>
      <PageHeader>포인트 사용 내역</PageHeader>
      <PageContainer>
        <SectionCard>
          <h3>현재 보유 포인트</h3>
          <p>2,230P</p>
        </SectionCard>
        <nav>
          <div>
            <div>
              <h3>기간별 필터</h3>
              <Button variant="text" size="sm" className="text-(--color-accent)">
                초기화
              </Button>
            </div>
            <ul>
              <li>전체</li>
              <li>1개월</li>
              <li>3개월</li>
              <li>6개월</li>
            </ul>
          </div>
          <div>
            <h3>유형별 필터</h3>
            <ul>
              <li>전체</li>
              <li>충전</li>
              <li>사용</li>
              <li>경매</li>
            </ul>
          </div>
        </nav>
        <section>
          <h3>거래 내역</h3>
          <ul>
            <ListCard as="li">
              <div className="flex items-center gap-2">
                <div className="bg-(--color-secondary) flex size-8 items-center justify-center rounded-full">
                  <FaGavel className="text-(--color-accent) size-3" />
                  {/* <FaCoins - className="size-3 text-(--color-accent)" /> */}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-medium">타이틀</h4>
                  <time className="text-(--color-warm-gray) text-xs">2025.05.05</time>
                </div>
              </div>
            </ListCard>
          </ul>
        </section>
      </PageContainer>
    </>
  );
};

export default MyPoints;
