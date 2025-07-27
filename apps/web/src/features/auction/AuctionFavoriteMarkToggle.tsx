'use client';

import { useEffect, useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { type User } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaBookmark } from 'react-icons/fa6';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';
import { postUserFavoriteAuction } from 'src/entities/user/mypage/auctions/api';

const AuctionFavoriteMarkToggle = ({
  auctionInfo,
  auctionId,
  userInfo
}: {
  auctionInfo: AuctionInfoWithAddressType;
  auctionId: string;
  userInfo: User | null;
}) => {
  const userId = userInfo!.id;
  const currentfavorites = auctionInfo.favorites;
  const isIncluded = currentfavorites.includes(userId);

  const [favoriteMark, setFavoriteMark] = useState(isIncluded);

  const queryClient = useQueryClient();

  const mutate = useMutation<string, Error, { auctionId: string; updatedFavorites: string[] }, void>({
    mutationFn: async ({ auctionId, updatedFavorites }) => {
      const result = await postUserFavoriteAuction({ auctionId, updatedFavorites });
      return result;
    },
    onMutate: () => {
      setFavoriteMark((state) => !state);
    },
    onError: (error) => {
      console.error(error.message);
      setFavoriteMark((state) => !state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteAuctions', userId] });
    }
  });

  const handleFavoriteMarkClick = async () => {
    const updatedFavorites = isIncluded
      ? currentfavorites.filter((item) => item !== userId)
      : [...currentfavorites, userId];

    try {
      const result = await mutate.mutateAsync({ auctionId, updatedFavorites });
      // console.log('result: ', result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error('관심 경매를 설정하지 못했습니다.');
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    setFavoriteMark(isIncluded);
  }, [userId, isIncluded]);

  return (
    <Button variant="text" onClick={handleFavoriteMarkClick}>
      <FaBookmark
        size={100}
        className={`${favoriteMark ? 'fill-text-(--color-accent)' : 'text-(--color-warm-gray)'} size-7 transition`}
      />
    </Button>
  );
};

export default AuctionFavoriteMarkToggle;
