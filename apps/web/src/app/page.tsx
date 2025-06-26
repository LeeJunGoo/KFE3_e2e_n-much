import SelectOrder from 'src/components/auctions/SelectOrder';
import AuctionCard from 'src/components/common/AuctionCard';

export default function Home() {
  const resultCount = 5;
  return (
    <main className="relative z-0 min-h-screen">
      <div className="mb-4 flex flex-row justify-between overflow-hidden">
        <p>총 {resultCount}개의 경매가 있습니다.</p>
        <SelectOrder />
      </div>

      <ul className="flex flex-row flex-wrap justify-between gap-4 align-middle">
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </ul>
    </main>
  );
}
