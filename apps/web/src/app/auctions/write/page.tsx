import { Suspense } from 'react';
import AuctionForm from 'src/components/auctions/AuctionForm';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...(useSearchParams)</p>}>
      <AuctionForm />
    </Suspense>
  );
}
