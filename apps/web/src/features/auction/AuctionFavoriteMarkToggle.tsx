'use client';

import { useEffect, useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaBookmark } from 'react-icons/fa6';
import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { postUserFavoriteAuction } from 'src/entities/user/mypage/auctions/api';
import { favoriteAuctionQueryKeys } from 'src/entities/user/mypage/auctions/queries/keys';

const AuctionFavoriteMarkToggle = ({
  auctionInfo,
  auctionId
}: {
  auctionInfo: AuctionInfoWithAddressType;
  auctionId: string;
}) => {
  const user = useUserState();
  const userId = user!.id;
  const prevfavorites = auctionInfo.favorites;
  const isIncluded = prevfavorites.includes(userId);

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
      queryClient.invalidateQueries({ queryKey: favoriteAuctionQueryKeys.user(userId) });
    }
  });

  const handleFavoriteMarkClick = async () => {
    try {
      // 버튼 클릭 시점에 최신 값 가져오기
      const auctionInfo = await getAuctionInfoWithAddress(auctionId);
      // console.log('auctionInfo: ', auctionInfo);
      const currentfavorites = auctionInfo.favorites;

      const updatedFavorites = isIncluded
        ? currentfavorites.filter((item) => item !== userId)
        : [...currentfavorites, userId];

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
  }, [isIncluded]);

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
