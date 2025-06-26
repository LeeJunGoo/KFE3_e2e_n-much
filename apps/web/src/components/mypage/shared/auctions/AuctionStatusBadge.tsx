import { Badge } from '@repo/ui/components/ui/badge';
import { AUCTION_STATUS_LABELS } from 'src/constants/mypage';

type AuctionStatus = keyof typeof AUCTION_STATUS_LABELS;

const AuctionStatusBadge = ({ status }: { status: AuctionStatus }) => {
  const variantMap = {
    bidding: 'warning',
    winning: 'info',
    won: 'success',
    lost: 'error'
  } as const;

  return <Badge variant={variantMap[status]}>{AUCTION_STATUS_LABELS[status]}</Badge>;
};

export default AuctionStatusBadge;
