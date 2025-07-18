import FavoriteAuctionsContainer from 'src/features/user/mypage/components/favorites/components/FavoriteAuctionsContainer';
import LikedEpisodesContainer from 'src/features/user/mypage/components/favorites/components/LikedEpisodesContainer';
import BaseTabs from 'src/features/user/mypage/components/shared/BaseTabs';

const TAB_LABELS = {
  favorite: '관심 경매',
  like: '좋아한 스토리'
};

const TAB_CONTENTS = [
  { value: 'favorite', content: <FavoriteAuctionsContainer /> },
  {
    value: 'like',
    content: <LikedEpisodesContainer />
  }
];

const FavoritesTabContainer = () => {
  return <BaseTabs defaultValue="favorite" tabLabels={TAB_LABELS} tabContents={TAB_CONTENTS} />;
};

export default FavoritesTabContainer;
