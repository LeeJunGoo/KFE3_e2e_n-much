import { FaCoins, FaCartShopping } from 'react-icons/fa6';
import { MdFormatListBulleted } from 'react-icons/md';

import { Button } from '@repo/ui/components/ui/button';
import PageHeader from 'src/components/common/ui/PageHeader';
import SectionHeader from 'src/components/common/ui/SectionHeader';
import PageContainer from 'src/components/layout/PageContainer';
import ListCard from 'src/components/common/ui/ListCard';
import SectionCard from 'src/components/common/ui/SectionCard';
import TransactionSection from 'src/components/mypage/points/TransactionSection';
import { activities } from 'src/constants/mypage/mockData';

//삭제 예정

const MyPoints = () => {
  return (
    <>
      <PageHeader>포인트 사용 내역</PageHeader>
      <PageContainer>
        <SectionCard className="flex flex-col items-center">
          <SectionHeader className="mb-1 text-sm font-normal">현재 보유 포인트</SectionHeader>
          <p className="mb-2 flex items-center gap-1 text-(--color-accent)">
            <span className="text-3xl font-bold">2,230</span>
            <span className="text-xl font-medium">P</span>
          </p>
          <p className="text-xs text-(--color-warm-gray)">마지막 업데이트 : 2025년 6월 27일</p>
        </SectionCard>
        <nav className="mt-6">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium">기간별 필터</h3>
              <Button variant="text" size="sm" className="text-(--color-accent)">
                초기화
              </Button>
            </div>
            <ListCard as="ul" className="flex h-auto w-full items-center justify-center space-x-1 p-2">
              <li className="w-1/4">
                <Button variant="active" className="w-full text-xs">
                  전체
                </Button>
              </li>
              <li className="w-1/4">
                <Button variant="inActive" className="w-full text-xs">
                  1개월
                </Button>
              </li>
              <li className="w-1/4">
                <Button variant="inActive" className="w-full text-xs">
                  3개월
                </Button>
              </li>
              <li className="w-1/4">
                <Button variant="inActive" className="w-full text-xs">
                  6개월
                </Button>
              </li>
            </ListCard>
          </div>
          <div className="mt-6">
            <SectionHeader className="mb-3">유형별 필터</SectionHeader>
            <ul className="flex items-center gap-2">
              <li>
                <Button variant="active" size="sm" className="text-xs">
                  <MdFormatListBulleted />
                  <span>전체</span>
                </Button>
              </li>
              <li>
                <Button variant="inActive" size="sm" className="text-xs">
                  <FaCoins className="size-3" />
                  <span>충전</span>
                </Button>
              </li>
              <li className="">
                <Button variant="inActive" size="sm" className="text-xs">
                  <FaCartShopping className="size-3" />
                  사용
                </Button>
              </li>
            </ul>
          </div>
        </nav>
        <TransactionSection activities={activities} />
      </PageContainer>
    </>
  );
};

export default MyPoints;
