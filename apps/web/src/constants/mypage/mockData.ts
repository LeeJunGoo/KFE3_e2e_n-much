import { AuctionItem } from 'src/types/mypage';

export const MOCK_AUCTION_DATA: AuctionItem[] = [
  {
    id: '1',
    title: '빈티지 카메라 라이카 M3',
    currentPrice: 850000,
    endDate: '2025-06-28T15:00:00Z',
    status: 'bidding',
    imageUrl: '',
    myBidAmount: 800000
  },
  {
    id: '2',
    title: '애플 맥북 프로 M3',
    currentPrice: 2100000,
    endDate: '2025-06-27T20:00:00Z',
    status: 'winning',
    imageUrl: '',
    myBidAmount: 2100000
  },
  {
    id: '3',
    title: '로렉스 서브마리너',
    currentPrice: 12000000,
    endDate: '2025-06-25T18:00:00Z',
    status: 'won',
    imageUrl: '',
    myBidAmount: 12000000
  },
  {
    id: '4',
    title: '명품 핸드백 에르메스',
    currentPrice: 3500000,
    endDate: '2025-06-24T14:00:00Z', // 과거 날짜
    status: 'lost',
    imageUrl: '/images/hermes.jpg',
    myBidAmount: 3000000
  },
  {
    id: '5',
    title: '아이폰 15 프로',
    currentPrice: 1200000,
    endDate: '2025-06-29T12:00:00Z',
    status: 'bidding',
    imageUrl: '',
    myBidAmount: 1150000
  }
];
