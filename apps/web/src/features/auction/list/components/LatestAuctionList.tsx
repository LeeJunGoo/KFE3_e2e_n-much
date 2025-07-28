import { type SortedAuctionsListProps, type SortedAuctionItemType } from 'src/entities/auction/types';
import LatestAuctionCard from 'src/features/auction/card/LatestAuctionCard';

const LatestAuctionList = ({ latestAuctions }: { latestAuctions: SortedAuctionsListProps }) => {
  return (
    <ul className="overflow-hidden rounded-lg bg-white shadow-sm">
      {latestAuctions.map((auction: SortedAuctionItemType) => (
        <LatestAuctionCard key={auction.auction_id} auction={auction} />
      ))}
    </ul>
  );
};

export default LatestAuctionList;
