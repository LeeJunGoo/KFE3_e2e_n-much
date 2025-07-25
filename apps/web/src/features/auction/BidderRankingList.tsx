import React from 'react';
import { type BidderRankingInfoType } from 'src/entities/auction/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import { formatFullDateTime } from 'src/shared/utils/formatKoreanDate';
import { formatNumber } from 'src/shared/utils/formatNumber';
import { maskEmail } from 'src/shared/utils/maskEmail';

const BidderRankingList = ({ bidderRankingList }: { bidderRankingList: BidderRankingInfoType[] }) => {
  const userNickname = '닉네임';
  return (
    <ul>
      {bidderRankingList.map((bidder, index) => (
        <li key={`${bidder.users.id}${index}`} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BaseAvatar src={bidder.users.user_avatar!} alt={userNickname!} size="sm" />
            <div>
              <div className="flex items-center gap-1">
                <p className="text-(--color-text-base) text-sm font-medium">{userNickname}</p>
                <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(bidder.users.email)}&#41;</p>
              </div>
              <p className="text-(--color-warm-gray) text-xs">{formatFullDateTime(bidder.created_at)}</p>
            </div>
          </div>
          <p className="text-(--color-accent) font-bold">{formatNumber(bidder.bid_amount)} P</p>
        </li>
      ))}
    </ul>
  );
};

export default BidderRankingList;
