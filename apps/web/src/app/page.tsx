import AuctionCard from 'src/components/common/AuctionCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ul className="flex flex-wrap gap-6">
        <AuctionCard />
        <AuctionCard />
        <AuctionCard />
      </ul>
    </main>
  );
}
