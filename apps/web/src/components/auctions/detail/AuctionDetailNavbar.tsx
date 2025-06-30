import React from 'react';
import GoBackButton from 'src/components/common/GoBackButton';
import EditDeleteActions from './EditDeleteActions';
import { AuctionRow } from 'src/lib/supabase/type';

const AuctionDetailNavbar = ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  return (
    <>
      <nav className="absolute top-5 right-0 left-0 z-10 flex items-center justify-between">
        <div className="bg-gray flex h-10 w-10 justify-center rounded-sm bg-(--color-background)/70">
          <GoBackButton className="-translate-x-2" />
        </div>
        <div>
          <EditDeleteActions auctionId={auctionId} />
        </div>
      </nav>
    </>
  );
};

export default AuctionDetailNavbar;
