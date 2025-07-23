import EpisodeActionButtons from 'src/features/episode/EpisodeActionButtons';
import EpisodeInfoModal from 'src/features/episode/EpisodeInfoModal';
import { type AuctionRow } from 'src/shared/supabase/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import ContentDescription from 'src/shared/ui/ContentDescription';
import ContentTitle from 'src/shared/ui/ContentTitle';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import { maskEmail } from 'src/shared/utils/maskEmail';
import type { EpisodeItemProps } from 'src/entities/episode/types';

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
        <ContentTitle title={episode.title} variant="base" className="mb-1" />
        <ContentDescription description={episode.description} variant="ghost" clamp={2} />
      </div>
      <div className="flex items-center justify-between">
        <EpisodeInfoModal episode={episode} />
        {isEpisodeEditDelete && <EpisodeActionButtons auctionId={episode.auction_id} episodeId={episode.episode_id} />}
      </div>
    </li>
  );
};

export default EpisodeItem;
