import { AiFillHome } from 'react-icons/ai';
import { IoSearch } from 'react-icons/io5';
import { FaGavel, FaUser } from 'react-icons/fa6';
import type { TabMenuItem } from 'src/types/main';

export const TAB_MENUS: TabMenuItem[] = [
  {
    label: '홈',
    icon: <AiFillHome size={20} />,
    href: '/',
    type: 'link'
  },
  {
    label: '검색',
    icon: <IoSearch size={20} />,
    type: 'button'
  },
  {
    label: '경매현황',
    icon: <FaGavel size={20} />,
    href: '/auctions',
    type: 'link'
  },
  {
    label: '프로필',
    icon: <FaUser size={20} />,
    href: '/mypage',
    type: 'link'
  }
];
