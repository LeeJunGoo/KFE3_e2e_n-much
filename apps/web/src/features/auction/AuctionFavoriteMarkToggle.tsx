'use client';
import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart } from 'react-icons/fa6';
import { getAuctionInfoWithAddress } from 'src/entities/auction/api';
import { type AuctionInfoWithAddressType } from 'src/entities/auction/types';
import { postUserFavoriteAuction } from 'src/entities/user/mypage/auctions/api';
import { auctionQueryKeys } from 'src/entities/user/mypage/auctions/queries/keys';
import { popToast } from 'src/shared/utils/popToast';

const AuctionFavoriteMarkToggle = ({
  auctionInfo,
  auctionId,
  userId
}: {
  auctionInfo: AuctionInfoWithAddressType;
  auctionId: string;
  userId: string;
}) => {
  const prevfavorites = auctionInfo.favorites;
  const isIncluded = prevfavorites.includes(userId);
  const [isFavorite, setIsFavorite] = useState(isIncluded);
  const queryClient = useQueryClient();

  const mutate = useMutation<string, Error, { auctionId: string; updatedFavorites: string[] }, void>({
    mutationFn: async ({ auctionId, updatedFavorites }) => {
      const result = await postUserFavoriteAuction({ auctionId, updatedFavorites });
      return result;
    },
    onMutate: () => {
      setIsFavorite((state) => !state);
    },
    onError: () => {
      setIsFavorite((state) => !state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionQueryKeys.favorite(userId) });
    }
  });

  const handleFavoriteMarkClick = async () => {
    try {
      // 버튼 클릭 시점에 최신 값 가져오기
      const auctionInfo = await getAuctionInfoWithAddress(auctionId);
      const currentfavorites = auctionInfo.favorites;
      const updatedFavorites = isFavorite
        ? currentfavorites.filter((item) => item !== userId)
        : [...currentfavorites, userId];

      const result = await mutate.mutateAsync({ auctionId, updatedFavorites });
      if (result) {
        const alertTitle = isFavorite ? '관심 경매 해제 성공' : '관심 경매 등록 성공';
        const alertMessage = isFavorite ? '관심 경매를 해제했습니다.' : '관심 경매를 등록했습니다.';
        popToast('info', alertTitle, alertMessage, 'medium');
      }
    } catch (error) {
      if (error instanceof Error) {
        const alertTitle = isFavorite ? '관심 경매 해제 실패' : '관심 경매 등록 실패';
        const alertMessage = isFavorite ? '관심 경매를 해제하지 못했습니다.' : '관심 경매를 등록하지 못했습니다.';
        popToast('error', alertTitle, alertMessage, 'medium');
        console.error(error.message);
      }
    }
  };

  return (
    <Button
      variant="text"
      onClick={handleFavoriteMarkClick}
      className="group flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border bg-white/70 !px-3 !py-3 transition-colors duration-200"
    >
      <FaHeart
        className={`${
          isFavorite ? 'text-(--color-accent)' : 'text-(--color-warm-gray) group-hover:text-(--color-accent)'
        } h-6 w-6 transition-colors duration-200`}
      />
    </Button>
  );
};

export default AuctionFavoriteMarkToggle;
