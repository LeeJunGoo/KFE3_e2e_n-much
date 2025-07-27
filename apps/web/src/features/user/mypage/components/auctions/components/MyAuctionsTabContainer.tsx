'use client';

import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserAuctions } from 'src/entities/user/mypage/auctions/queries/useAuctions';
import ClosedAuctionsContainer from 'src/features/user/mypage/components/auctions/components/ClosedAuctionsContainer';
import OpenAuctionsContainer from 'src/features/user/mypage/components/auctions/components/OpenAuctionsContainer';
import MyAuctionsTabSkeleton from 'src/features/user/mypage/components/auctions/skeleton/MyAuctionsTabSkeleton';
import ErrorState from 'src/features/user/mypage/components/shared/ErrorState';
import BaseTabs from 'src/features/user/mypage/components/shared/tabs/BaseTabs';
import { AUCTION_STATUS } from 'src/shared/utils/getAuctionStatusText';
import type { AuctionRow } from 'src/shared/supabase/types';

const TAB_LABELS = {
  open: '경매 현황',
  closed: '경매 종료'
};

const MyAuctionsTabContainer = () => {
  const user = useUserState();
  const { data, isPending, isError, refetch } = useGetUserAuctions(user?.id);

  if (!user) return <MyAuctionsTabSkeleton />;
  if (isPending) return <MyAuctionsTabSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const openAuctions = data?.filter((auction: AuctionRow) => auction.status === AUCTION_STATUS.OPEN);
  const closedAuctions = data?.filter((auction: AuctionRow) => auction.status === AUCTION_STATUS.CLOSED);

  const TAB_CONTENTS = [
    { value: 'open', content: <OpenAuctionsContainer auctions={openAuctions} /> },
    {
      value: 'closed',
      content: <ClosedAuctionsContainer auctions={closedAuctions} />
    }
  ];

  return <BaseTabs defaultValue="open" tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default MyAuctionsTabContainer;
