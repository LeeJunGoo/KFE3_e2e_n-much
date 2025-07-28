import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import EpisodeActionButtons from 'src/features/episode/EpisodeActionButtons';
import EpisodeBidModal from 'src/features/episode/EpisodeBidModal';
import EpisodeInfoModal from 'src/features/episode/EpisodeInfoModal';
import EpisodeLikeToggle from 'src/features/episode/EpisodeLikeButton';
import { type AuctionRow } from 'src/shared/supabase/types';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import PageDescription from 'src/shared/ui/PageDescription';
import PageTitle from 'src/shared/ui/PageTitle';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import { maskEmail } from 'src/shared/utils/maskEmail';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeItem = ({ episode, sellerId }: { episode: EpisodeItemProps; sellerId: AuctionRow['user_id'] }) => {
  const user = useUserState();

  const isUser = episode.user_id === user?.id;
  const isSeller = sellerId && user?.id;
  const isEpisodeActions = episode.user_id === user?.id;
  const userNickname = episode.users.nick_name ?? user?.nick_name;

  return (
    <li className="list-none">
      <div className="flex justify-between">
        {/* 작성자 정보 */}
        <div className="flex gap-2 py-4">
          <BaseAvatar src={episode.users.user_avatar!} alt={userNickname} size="sm" />
          <div>
            <div className="flex items-center gap-1">
              <p className="text-(--color-text-base) text-sm font-medium">{userNickname}</p>
              <p className="text-(--color-warm-gray) text-xs">&#40;{maskEmail(episode.users.email)}&#41;</p>
            </div>
            <p className="text-(--color-warm-gray) text-xs">{formatYYYYMMDD(episode.created_at)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          {/* 입찰하기 버튼  */}
          {isUser && isSeller && <EpisodeBidModal episode={episode} />}
          {/* 좋아요 버튼 */}
          {isEpisodeActions ? null : <EpisodeLikeToggle episode={episode} />}
        </div>
      </div>
      <div>
        <PageTitle as="h4" className="mb-1 font-medium" order="left" size="md">
          {episode.title}
        </PageTitle>
        <PageDescription variant="ghost" clamp={2}>
          {episode.description}
        </PageDescription>
      </div>
      <div className="flex items-center justify-between">
        <EpisodeInfoModal episode={episode} />
        {/* 수정 및 삭제 */}
        {isEpisodeActions && <EpisodeActionButtons auctionId={episode.auction_id} episodeId={episode.episode_id} />}
      </div>
    </li>
  );
};

export default EpisodeItem;
