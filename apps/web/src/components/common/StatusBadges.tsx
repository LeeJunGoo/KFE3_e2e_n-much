import { createLabelBadge } from './LabelBadge';
import {
  BID_STATUS_LABEL,
  AUCTION_STATUS_LABELS,
  BID_STATUS_VARIANTS,
  AUCTION_STATUS_VARIANTS
} from 'src/constants/mypage';

export type BidStatusType = keyof typeof BID_STATUS_LABEL;
export type AuctionStatusType = keyof typeof AUCTION_STATUS_LABELS;

export const BidStatusBadge = createLabelBadge<BidStatusType>(BID_STATUS_VARIANTS, BID_STATUS_LABEL);

BidStatusBadge.displayName = 'BidStatusBadge';

export const AuctionStatusBadge = createLabelBadge<AuctionStatusType>(AUCTION_STATUS_VARIANTS, AUCTION_STATUS_LABELS);

AuctionStatusBadge.displayName = 'AuctionStatusBadge';
