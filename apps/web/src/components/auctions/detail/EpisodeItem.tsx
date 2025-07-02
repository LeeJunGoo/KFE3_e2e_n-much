import UserAvatar from 'src/components/common/UserAvatar';
import { EpisodeItemProps } from 'src/types/episodes';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';
import EditDeleteEpisodes from './EditDeleteEpisodes';
import EpisodeBidButton from './EpisodeBidButton';
import EpisodeMoreButton from './EpisodeMoreButton';

import { UserInfoType } from 'src/app/api/auth/user-info/route';
import { SellerRow } from 'src/lib/supabase/type';

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

  return (
    <li className="list-none space-y-1 pb-4">
      <div className="mb-5 flex items-center justify-between">
        {/* 작성자 정보 */}
        <div className="flex items-center">
          <UserAvatar src={episode.buyer.avatar!} alt={episode.buyer.nickname!} size="sm" />
          <div>
            <div className="flex items-center gap-1">
              <p className="font-medium text-(--color-text-base)">{episode.buyer.nickname}</p>
              <p className="text-xs text-(--color-warm-gray)">&#40;{maskEmail(episode.buyer.email)}&#41;</p>
            </div>
            <p className="text-xs text-(--color-warm-gray)">{episodeTime}</p>
          </div>
        </div>
        {isEpisodeBid && <EpisodeBidButton episode={episode} userInfo={userInfo} />}
      </div>
      <div>
        <h4 className="text-(((--color-text-base))) mb-1 font-medium">{episode.title}</h4>
        <p className="text-md line-clamp-2 leading-relaxed text-(--color-warm-gray)">
          {episode.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla molestias cumque neque
          amet laudantium tempore deserunt temporibus, fuga rerum itaque, totam laboriosam ad, magnam eaque aliquid
          harum error fugit minima!
        </p>
      </div>
      <div className="flex items-center justify-between">
        <EpisodeMoreButton episode={episode} />
        {isEpisodeEditDelete && <EditDeleteEpisodes auction_id={episode.auction_id} episode_id={episode.episode_id} />}
      </div>
    </li>
  );
};

export default EpisodeItem;
