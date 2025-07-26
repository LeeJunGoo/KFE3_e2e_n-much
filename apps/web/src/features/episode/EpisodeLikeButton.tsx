'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { FaHeart } from 'react-icons/fa';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import type { EpisodeItemProps } from 'src/entities/episode/types';

// 사연 좋아요 시
//TODO - updateEpisodeBid() 요청해서 포인트 올리기
//TODO - 포인트 회수하는 함수 생성하기
const EpisodeLikeToggle = ({ episode }: { episode: EpisodeItemProps }) => {
  // 유저 정보
  const user = useUserState();
  // 좋아요 likes['userid', 'userId']
  const { likes } = episode;
  // 좋아요 클릭 여부
  const isLiked = episode.likes[0];
  const [liked, setLiked] = useState(isLiked ?? false);

  // 클릭 여부에 따라 아이콘 색상 변경
  const iconColor = liked ? 'text-(--color-red)' : 'text-(--color-warm-gray)';

  const handleToggle = () => {
    setLiked((state) => !state);
  };

  return (
    <Button variant="text" className="opacity-70" disabled={false} onClick={handleToggle}>
      <FaHeart className={`${iconColor} transition`} />
    </Button>
  );
};

export default EpisodeLikeToggle;
