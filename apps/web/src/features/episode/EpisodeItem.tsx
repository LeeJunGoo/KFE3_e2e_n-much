import type { EpisodeItemProps } from 'src/entities/episode/types';
import EditDeleteEpisodes from 'src/features/episode/EditDeleteEpisodes';
import { AuctionRow } from 'src/shared/supabase/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import { maskEmail } from 'src/shared/utils/maskEmail';
import EpisodeInfoModal from './EpisodeInfoModal';

const EpisodeItem = ({ episode, sellerId }: { episode: EpisodeItemProps; sellerId: AuctionRow['user_id'] }) => {
  const episodeTime = formatYYYYMMDD(episode.created_at);

  //FIXME - buyer 필요
  // const isEpisodeBid = userInfo.seller_id === sellerId || episode.buyer_id === userInfo.buyer_id;
  // const isEpisodeEditDelete = episode.buyer_id === userInfo.buyer_id;
  // const userNickname = episode.buyer.nickname ?? userInfo.social_name;
  const isEpisodeBid = true;
  const isEpisodeEditDelete = true;
  const userNickname = 'Buyer 닉네임';

  return (
    <li className="list-none space-y-1 pb-4">
      <div className="mb-5 flex items-center justify-between">
        {/* 작성자 정보 */}
        <div className="flex items-center gap-2">
          <BaseAvatar src={episode.users.user_avatar!} alt={userNickname} size="sm" />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-(--color-text-base) text-sm font-medium">{userNickname}</p>
              <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(episode.users.email)}&#41;</p>
            </div>
            <p className="text-(--color-warm-gray) text-xs">{episodeTime}</p>
          </div>
        </div>
        {/* {isEpisodeBid && <EpisodeBidButton episode={episode} />} */}
      </div>
      <div>
        <h4 className="text-(((--color-text-base))) mb-1 font-medium">{episode.title}</h4>
        <p className="text-md text-(--color-warm-gray) line-clamp-2 leading-relaxed">{episode.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <EpisodeInfoModal episode={episode} />
        {isEpisodeEditDelete && <EditDeleteEpisodes auction_id={episode.auction_id} episode_id={episode.episode_id} />}
      </div>
    </li>
  );
};

export default EpisodeItem;
