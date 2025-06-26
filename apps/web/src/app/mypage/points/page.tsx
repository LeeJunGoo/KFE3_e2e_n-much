import PageHeader from 'src/components/common/PageHeader';
import PageContainer from 'src/components/layout/PageContainer';
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
              <span>초기화</span>
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
        <section></section>
      </PageContainer>
    </>
  );
};

export default MyPoints;
