import { Activity, AuctionItem } from 'src/types/mypage';

export const MOCK_AUCTION_DATA: AuctionItem[] = [
  {
    id: '1',
    title: '빈티지 카메라 라이카 M3',
    currentPrice: 850000,
    endDate: '2025-06-28T15:00:00Z',
    status: 'bidding', // 입찰중
    imageUrl: '',
    myBidAmount: 800000
  },
  {
    id: '2',
    title: '애플 맥북 프로 M3',
    currentPrice: 2100000,
    endDate: '2025-06-27T20:00:00Z',
    status: 'pending', // 낙찰예정
    imageUrl: '',
    myBidAmount: 2100000
  },
  {
    id: '3',
    title: '로렉스 서브마리너',
    currentPrice: 12000000,
    endDate: '2025-06-25T18:00:00Z', // 과거 날짜
    status: 'completed', // 낙찰완료
    imageUrl: '',
    myBidAmount: 12000000
  },
  {
    id: '4',
    title: '명품 핸드백 에르메스',
    currentPrice: 3500000,
    endDate: '2025-06-24T14:00:00Z', // 과거 날짜
    status: 'failed', // 유찰
    imageUrl: '/images/hermes.jpg',
    myBidAmount: 3000000
  },
  {
    id: '5',
    title: '아이폰 15 프로',
    currentPrice: 1200000,
    endDate: '2025-06-29T12:00:00Z',
    status: 'bidding', // 입찰중
    imageUrl: '',
    myBidAmount: 1150000
  }
];

// 포인트 활동 
export const activities: Activity[] = [
  {
    type: 'charge', // 충전
    title: '포인트 충전',
    date: '2025년 6월 22일',
    amount: 3000
  },
  {
    type: 'event', // 이벤트 보상
    title: '이벤트 보상',
    date: '2025년 6월 21일',
    amount: 500
  },
  {
    type: 'auction', // 경매 참여
    title: '경매 참여',
    date: '2025년 6월 20일',
    amount: -300
  },
  {
    type: 'signup', // 회원가입 보상
    title: '회원가입 포인트 지급',
    date: '2025년 6월 19일',
    amount: 1000
  },
  {
    type: 'purchase', // 상품 구매
    title: '상품 구매',
    date: '2025년 6월 17일',
    amount: -1500
  }
];

// 스토리 데이터 
export const mockStoryData = [
  {
    id: 1,
    title: '특별한 미식 경험을 나누고 싶어요',
    status: 'bidding', // 입찰중
    createdAt: '2025년 06월 20일',
    prize: '미쉐린 스타 레스토랑 식사권',
    description: '평생 잊지 못할 미식 경험을 선사하고 싶습니다.'
  },
  {
    id: 2,
    title: '제주도에서의 잊지 못할 추억',
    status: 'completed', // 낙찰완료
    createdAt: '2025년 06월 20일',
    prize: '제주 프리미엄 리조트 숙박권',
    description: '아름다운 제주도에서 특별한 시간을 보내세요.'
  },
  {
    id: 3,
    title: '나만의 특별한 커피 이야기',
    status: 'failed', // 유찰
    createdAt: '2025년 06월 20일',
    prize: '스페셜티 커피 원두 세트',
    description: '커피 애호가를 위한 특별한 원두 컬렉션입니다.'
  },
  {
    id: 4,
    title: '도심 속 힐링 스파 체험',
    status: 'ended', // 종료됨
    createdAt: '2025년 06월 19일',
    prize: '프리미엄 스파 패키지',
    description: '바쁜 일상에서 벗어나 완전한 힐링을 경험하세요.'
  },
  {
    id: 5,
    title: '예술가와 함께하는 원데이 클래스',
    status: 'pending', // 낙찰예정
    createdAt: '2025년 06월 18일',
    prize: '아티스트 원데이 클래스 이용권',
    description: '유명 작가와 함께하는 특별한 아트 클래스입니다.'
  },
  {
    id: 6,
    title: '한강에서 즐기는 프라이빗 크루즈',
    status: 'bidding', // 입찰중
    createdAt: '2025년 06월 17일',
    prize: '한강 프라이빗 크루즈 이용권',
    description: '로맨틱한 한강 야경을 독점으로 즐겨보세요.'
  },
  {
    id: 7,
    title: '미슐랭 셰프의 홈쿠킹 클래스',
    status: 'completed', // 낙찰완료
    createdAt: '2025년 06월 16일',
    prize: '미슐랭 셰프 쿠킹클래스 참가권',
    description: '세계적인 셰프에게 직접 배우는 요리 비법!'
  },
  {
    id: 8,
    title: '골프장에서의 특별한 하루',
    status: 'bidding', // 입찰중
    createdAt: '2025년 06월 15일',
    prize: '프리미엄 골프장 라운딩 패키지',
    description: '최고급 골프장에서 즐기는 완벽한 라운딩.'
  },
  {
    id: 9,
    title: '클래식 콘서트홀에서의 감동',
    status: 'failed', // 유찰
    createdAt: '2025년 06월 14일',
    prize: '예술의전당 VIP석 티켓',
    description: '세계적인 연주자들의 공연을 VIP석에서 감상하세요.'
  },
  {
    id: 10,
    title: '와이너리 투어와 테이스팅',
    status: 'pending', // 낙찰예정
    createdAt: '2025년 06월 13일',
    prize: '프리미엄 와이너리 투어 패키지',
    description: '유명 와이너리에서 즐기는 특별한 와인 테이스팅.'
  }
];
