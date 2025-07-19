import AuctionTimer from 'src/features/auction/shared/AuctionTimer';
import { type AuctionRow } from 'src/shared/supabase/types';
import { formatRemainingTime } from 'src/shared/utils/formatRemainingTime';

const AuctionTimerStatic = ({ endDate }: { endDate: AuctionRow['end_date'] }) => {
  const { status, formattedTime } = formatRemainingTime(endDate);

  return <AuctionTimer remainTime={formattedTime} status={status} className={'mb-3'} />;
};

export default AuctionTimerStatic;
