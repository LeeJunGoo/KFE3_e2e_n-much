import ClosedAuctionsContainer from 'src/features/user/mypage/components/auctions/components/ClosedAuctionsContainer';
import OpenAuctionsContainer from 'src/features/user/mypage/components/auctions/components/OpenAuctionsContainer';
import BaseTabs from 'src/features/user/mypage/components/shared/BaseTabs';

const TAB_LABELS = {
  open: '경매 현황',
  closed: '경매 종료'
};

const TAB_CONTENTS = [
  { value: 'open', content: <OpenAuctionsContainer /> },
  {
    value: 'closed',
    content: <ClosedAuctionsContainer />
  }
];

const MyAuctionsTabContainer = () => {
  return <BaseTabs defaultValue="open" tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default MyAuctionsTabContainer;
