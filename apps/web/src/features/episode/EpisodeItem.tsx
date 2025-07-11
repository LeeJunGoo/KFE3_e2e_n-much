import { EpisodeItemProps } from 'src/entities/episode/types';
import EditDeleteEpisodes from 'src/features/episode/EditDeleteEpisodes';
import EpisodeBidButton from 'src/features/episode/EpisodeBidButton';
import EpisodeMoreButton from 'src/features/episode/EpisodeMoreButton';
import { formatToKoreanDateTime } from 'src/shared/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/shared/utils/maskEmail';

import { UserInfoType } from 'src/app/api/auth/user-info/route';
import { SellerRow } from 'src/shared/supabase/types';
import UserAvatar from 'src/shared/ui/UserAvatar';

const EpisodeItem = ({
  episode,
  userInfo,
  sellerId
}: {
  episode: EpisodeItemProps;
  userInfo: UserInfoType;
  sellerId: SellerRow['seller_id'];
}) => {
  const episodeTime = formatToKoreanDateTime(episode.created_at);
  const isEpisodeBid = userInfo.seller_id === sellerId || episode.buyer_id === userInfo.buyer_id;
  const isEpisodeEditDelete = episode.buyer_id === userInfo.buyer_id;
  const userNickname = episode.buyer.nickname ?? userInfo.social_name;

  return (
    <li className="list-none space-y-1 pb-4">
      <div className="mb-5 flex items-center justify-between">
        {/* 작성자 정보 */}
        <div className="flex items-center">
          <UserAvatar src={episode.buyer.avatar!} alt={userNickname} size="sm" />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-(--color-text-base) text-sm font-medium">{userNickname}</p>
              <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(episode.buyer.email)}&#41;</p>
            </div>
            <p className="text-(--color-warm-gray) text-xs">{episodeTime}</p>
          </div>
        </div>
        {isEpisodeBid && <EpisodeBidButton episode={episode} userInfo={userInfo} />}
      </div>
      <div>
        <h4 className="text-(((--color-text-base))) mb-1 font-medium">{episode.title}</h4>
        <p className="text-md text-(--color-warm-gray) line-clamp-2 leading-relaxed">{episode.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <EpisodeMoreButton episode={episode} userInfo={userInfo} />
        {isEpisodeEditDelete && <EditDeleteEpisodes auction_id={episode.auction_id} episode_id={episode.episode_id} />}
      </div>
    </li>
  );
};

export default EpisodeItem;
