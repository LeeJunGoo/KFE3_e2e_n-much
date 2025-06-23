import AuctionCard from 'src/components/common/AuctionCard';

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <div className="flex flex-wrap gap-6">
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </div>
    </main>
  );
}
