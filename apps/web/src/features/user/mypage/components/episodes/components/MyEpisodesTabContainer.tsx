import CompletedEpisodesContainer from 'src/features/user/mypage/components/episodes/components/CompletedEpisodesContainer';
import OngoingEpisodesContainer from 'src/features/user/mypage/components/episodes/components/OngoingEpisodesContainer';
import BaseTabs from 'src/features/user/mypage/components/shared/tabs/BaseTabs';

const TAB_LABELS = {
  ongoing: '진행중',
  completed: '종료됨'
};

const TAB_CONTENTS = [
  { value: 'ongoing', content: <OngoingEpisodesContainer /> },
  {
    value: 'completed',
    content: <CompletedEpisodesContainer />
  }
];

const MyEpisodesTabContainer = () => {
  return <BaseTabs defaultValue="ongoing" tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default MyEpisodesTabContainer;
