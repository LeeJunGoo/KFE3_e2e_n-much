import { Suspense } from 'react';
import AuctionList from 'src/components/auctions/AuctionList';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading... (searchParam)</p>}>
      <AuctionList />
    </Suspense>
  );
}
