import { createLabelBadge } from './LabelBadge';
import { BID_STATUS_LABEL, AUCTION_STATUS_LABELS } from 'src/constants/mypage';

export type BidStatusType = (typeof BID_STATUS_LABEL)[keyof typeof BID_STATUS_LABEL];
export type AuctionStatusType = keyof typeof AUCTION_STATUS_LABELS;

export const BidStatusBadge = createLabelBadge<BidStatusType>({
  진행중: 'warning',
  '낙찰 예정': 'info',
  종료됨: 'muted'
});

BidStatusBadge.displayName = 'BidStatusBadge';

export const AuctionStatusBadge = createLabelBadge<AuctionStatusType>(
  {
    bidding: 'warning',
    winning: 'info',
    won: 'success',
    lost: 'error'
  },
  AUCTION_STATUS_LABELS
);

AuctionStatusBadge.displayName = 'AuctionStatusBadge';
