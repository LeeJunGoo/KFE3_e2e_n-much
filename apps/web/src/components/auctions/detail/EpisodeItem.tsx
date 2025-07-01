import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { EpisodeItemProps } from 'src/types/episodes';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { maskEmail } from 'src/utils/maskEmail';
import EditDeleteEpisodes from './EditDeleteEpisodes';
import EpisodeBidButton from './EpisodeBidButton';
import EpisodeMoreButton from './EpisodeMoreButton';

const EpisodeItem = ({ episode }: { episode: EpisodeItemProps }) => {
  const episodeTime = formatToKoreanDateTime(episode.created_at);

  return (
    <li className="list-none space-y-1 pb-4">
      <div className="flex items-center justify-between">
        {/* 작성자 정보 */}
        <div className="flex items-center">
          {/* //FIXME - 아바타 이미지 넣기 */}
          <Avatar className="mr-3 h-12 w-12">
            <AvatarImage src={episode.buyer.avatar!} alt={episode.buyer.nickname!} />
            {/* //FIXME - 기본 아타바로 변경해야합니다. */}
            <AvatarFallback>{'아바타가 존재하지 않습니다.'}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center gap-1">
              <p className="font-medium text-(--color-text-base)">{episode.buyer.nickname}</p>
              <p className="text-xs text-(--color-warm-gray)">&#40;{maskEmail(episode.buyer.email)}&#41;</p>
            </div>
            <p className="text-xs text-(--color-warm-gray)">{episodeTime}</p>
          </div>
        </div>
        {/* //FIXME -  유효성 검사: 판매자 or 에피소드 작성자일 경우에만 */}
        <EpisodeBidButton episode={episode} />
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
        {/* //FIXME - 유효성 검사: 로그인된 유저가 에피소드 유저인 지 */}
        {episode.buyer_id !== '로그인된 유저' && (
          <EditDeleteEpisodes auction_id={episode.auction_id} episode_id={episode.episode_id} />
        )}
      </div>
    </li>
  );
};
export default EpisodeItem;
