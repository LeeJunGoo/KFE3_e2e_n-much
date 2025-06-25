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
