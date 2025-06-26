import { FaGavel, FaCoins } from 'react-icons/fa6';
import { HiDocumentText } from 'react-icons/hi';
import type { MyPageMenuItem } from 'src/types/mypage';

export const ROLE_LABEL = {
  BIDDER: '입찰 참여자',
  AUCTIONEER: '경매 진행자'
} as const;

export const BID_STATUS_LABEL = {
  PROGRESS: '진행중',
  EXPECTED: '낙찰 예정',
  ENDED: '종료됨'
} as const;

export const BIDDER_MENU: MyPageMenuItem[] = [
  {
    label: '내 경매 현황',
    icon: <FaGavel className="text-(--color-accent)" />,
    href: '/mypage/auctions'
  },
  {
    label: '포인트 사용 내역',
    icon: <FaCoins className="text-(--color-accent)" />,
    href: '/mypage/points'
  },
  {
    label: '내가 쓴 스토리',
    icon: <HiDocumentText className="size-5 text-(--color-accent)" />,
    href: '/mypage/episodes'
  }
];

export const AUCTIONEER_MENU = [
  {
    label: '내 경매 보기',
    icon: <FaGavel className="text-(--color-accent)" />,
    href: '/mypage/auctions'
  },
  {
    label: '포인트 사용 내역',
    icon: <FaCoins className="text-(--color-accent)" />,
    href: '/mypage/points'
  },
  {
    label: '주소 변경',
    icon: <HiDocumentText className="size-5 text-(--color-accent)" />,
    href: '/mypage/'
  }
];

// 내 경매 현황 tab
export const AUCTION_TABS = [
  { label: '경매현황', value: 'ongoing' },
  { label: '경매종료', value: 'closed' }
];

export const AUCTION_TAB_FILTERS = {
  ongoing: ['전체', '입찰중', '낙찰예정'],
  closed: ['전체', '낙찰', '유찰']
};

// 내 경매 현황 filter
export const AUCTION_STATUS_LABELS = {
  bidding: '입찰중',
  winning: '낙찰예정',
  won: '낙찰',
  lost: '유찰'
} as const;
