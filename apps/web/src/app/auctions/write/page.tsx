import { Suspense } from 'react';
import AuctionForm from 'src/components/auctions/AuctionForm';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuctionForm />
    </Suspense>
  );
}
