import { LATEST_AUCTIONS_COUNT } from 'src/entities/auction/constants';
import { getALatestAuctions } from 'src/entities/auction/serverActions';
import { type SortedAuctionItemType } from 'src/entities/auction/types';
import LatestAuctionCard from 'src/features/auction/LatestAuctionCard';
import ContentEmpty from 'src/features/auction/shared/ContentEmpty';
import AuctionSectionHeader from './shared/AuctionSectionHeader';

const LatestListSection = async () => {
  const latestAuctions = await getALatestAuctions('created_at', true, LATEST_AUCTIONS_COUNT);

  if (!latestAuctions || latestAuctions.length === 0) {
    return (
      <ContentEmpty
        titleLabel="아직 등록된 상품 정보가 없어요."
        contentLabel="새로운 정보가 등록되면 알려드릴게요.!"
        className="mt-8"
      />
    );
  }

  return (
    <div className="mt-8">
      <AuctionSectionHeader title="최신 경매" href={'/auctions?order=created_at'} />
      <ul className="overflow-hidden rounded-lg bg-white shadow-sm">
        {latestAuctions.map((auction: SortedAuctionItemType) => (
          <LatestAuctionCard key={auction.auction_id} auction={auction} />
        ))}
      </ul>
    </div>
  );
};

export default LatestListSection;
