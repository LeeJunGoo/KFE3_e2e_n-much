import { Tabs } from '@repo/ui/components/ui/tabs';
import FavoriteAuctionsContainer from 'src/features/user/mypage/components/favorites/components/FavoriteAuctionsContainer';
import LikedEpisodesContainer from 'src/features/user/mypage/components/favorites/components/LikedEpisodesContainer';
import BaseTabsContent from 'src/features/user/mypage/components/shared/BaseTabsContent';
import BaseTabsTrigger from 'src/features/user/mypage/components/shared/BaseTabsTrigger';

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
  return (
    <>
      <Tabs defaultValue="favorite">
        <BaseTabsTrigger tabLabels={TAB_LABELS} />
        <section className="pt-4">
          <BaseTabsContent tabContent={TAB_CONTENTS} />
        </section>
      </Tabs>
    </>
  );
};

export default FavoritesTabContainer;
