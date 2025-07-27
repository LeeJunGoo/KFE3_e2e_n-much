'use client';

import { useEffect, useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { getEpisodeInfo } from 'src/entities/episode/api';
import { postUserLikesEpisode } from 'src/entities/user/mypage/episodes/api';
import { LIKE_EPISODE_BID_POINT } from 'src/entities/user/mypage/episodes/constants';
import type { EpisodeItemProps } from 'src/entities/episode/types';

const EpisodeLikeToggle = ({ episode }: { episode: EpisodeItemProps }) => {
  const user = useUserState();
  const userId = user!.id;
  const episodeId = episode.episode_id;
  const prevLikes = episode.likes;
  const isIncluded = prevLikes.includes(userId);

  const [likeMark, setLikeMark] = useState(isIncluded);

  const mutate = useMutation<
    string,
    Error,
    { episodeId: string; updatedLikes: string[]; updatedBidPoint: number },
    void
  >({
    mutationFn: async ({ episodeId, updatedLikes, updatedBidPoint }) => {
      const result = await postUserLikesEpisode({ episodeId, updatedLikes, updatedBidPoint });
      return result;
    },
    onMutate: () => {
      setLikeMark((state) => !state);
    },
    onError: (error) => {
      console.error(error.message);
      setLikeMark((state) => !state);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['???', userId] });
    }
  });

  const handleLikeMarkClick = async () => {
    // 버튼 클릭 시점에 최신 값 가져오기
    const episodeInfo = await getEpisodeInfo(episodeId);
    // console.log('episodeInfo: ', episodeInfo);
    const currentLikes = episodeInfo.likes;
    const currentBidPoint = episodeInfo.bid_point;

    const updatedLikes = isIncluded ? currentLikes.filter((item) => item !== userId) : [...currentLikes, userId];

    const updatedBidPoint = isIncluded
      ? currentBidPoint! - LIKE_EPISODE_BID_POINT
      : currentBidPoint! + LIKE_EPISODE_BID_POINT;

    try {
      const result = await mutate.mutateAsync({ episodeId, updatedLikes, updatedBidPoint });
      // console.log('result: ', result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('좋아요를 설정하지 못했습니다.');
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    setLikeMark(isIncluded);
  }, [isIncluded]);

  return (
    <Button variant="text" className="opacity-70" disabled={false} onClick={handleLikeMarkClick}>
      <FaHeart className={`${likeMark ? 'text-(--color-red)' : 'text-(--color-warm-gray)'} transition`} />
    </Button>
  );
};

export default EpisodeLikeToggle;
