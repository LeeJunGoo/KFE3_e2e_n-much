'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { type User } from '@supabase/supabase-js';
import { FaBookmark } from 'react-icons/fa6';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';

const AuctionBookmarkToggle = ({
  auctionInfo,
  userInfo
}: {
  auctionInfo: AuctionInfoWithAddressType;
  userInfo: User | null;
}) => {
  // 현재 유저의 찜 클릭 여부
  const isBookMarked = auctionInfo.favorites[0];
  const [bookmarked, setBookmarked] = useState(isBookMarked ?? false);

  // 클릭 여부에 따라 아이콘 색상 변경
  const iconColor = bookmarked ? 'fill-text-(--color-accent)' : 'text-(--color-warm-gray)';

  const handleToggle = () => {
    setBookmarked((state) => !state);
  };

  return (
    <Button variant="text" disabled={false} onClick={handleToggle}>
      <FaBookmark size={100} className={`${iconColor} size-7 transition`} />
    </Button>
  );
};

export default AuctionBookmarkToggle;
