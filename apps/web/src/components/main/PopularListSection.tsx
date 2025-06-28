import Link from 'next/link';
import { fetchSortedAuctions } from 'src/lib/actions/serverActions';
import { SortedAuctionItemType } from 'src/types/main';
import PopularAuctionCard from './PopularAuctionCard';
import PageTitle from '../common/ui/PageTitle';

const PopularListSection = async () => {
  const popularAuctions = await fetchSortedAuctions('favorites', false, 5);

  if (!popularAuctions || popularAuctions.length === 0) {
    return (
      <div className="flex h-50 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500">
        아직 등록된 정보가 없어요
      </div>
    );
  }

  return (
    <div className="mt-8 px-4">
      <div className="mb-4 flex items-center justify-between">
        <PageTitle>인기 경매</PageTitle>
        <Link href="/auctions?order=favorites" className="cursor-pointer text-sm text-(--color-accent)">
          더보기
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {popularAuctions.map((auction: SortedAuctionItemType) => (
          <PopularAuctionCard key={auction.auction_id} auction={auction} />
        ))}
      </ul>
    </div>
  );
};

export default PopularListSection;
