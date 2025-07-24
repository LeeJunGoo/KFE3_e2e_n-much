'use client';

import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { useGetUserEpisodes } from 'src/entities/user/mypage/episodes/queries/useEpisodes';
import CompletedEpisodesContainer from 'src/features/user/mypage/components/episodes/components/CompletedEpisodesContainer';
import OngoingEpisodesContainer from 'src/features/user/mypage/components/episodes/components/OngoingEpisodesContainer';
import MyEpisodesTabSkeleton from 'src/features/user/mypage/components/episodes/skeleton/MyEpisodesTabSkeleton';
import ErrorState from 'src/features/user/mypage/components/shared/ErrorState';
import BaseTabs from 'src/features/user/mypage/components/shared/tabs/BaseTabs';
import type { EpisodeWithAuction } from 'src/entities/user/mypage/episodes/types';

const TAB_LABELS = {
  ongoing: '진행중',
  completed: '종료됨'
};

const MyEpisodesTabContainer = () => {
  const user = useUserState();
  const { data, isPending, isError, refetch } = useGetUserEpisodes(user?.id);

  if (!user) return null;
  if (isPending) return <MyEpisodesTabSkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const ongoingEpisodes = data?.filter((episode: EpisodeWithAuction) => episode.auctions?.status === 'OPEN');
  const completedEpisodes = data?.filter((episode: EpisodeWithAuction) => episode.auctions?.status === 'CLOSED');

  const TAB_CONTENTS = [
    { value: 'ongoing', content: <OngoingEpisodesContainer episodes={ongoingEpisodes} /> },
    {
      value: 'completed',
      content: <CompletedEpisodesContainer episodes={completedEpisodes} />
    }
  ];

  return <BaseTabs defaultValue="ongoing" tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default MyEpisodesTabContainer;
