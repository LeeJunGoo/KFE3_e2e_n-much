'use client';

import { Button } from '@repo/ui/components/ui/button';
import React, { useEffect, useState } from 'react';
import { FiAward } from 'react-icons/fi';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import { toast } from '@repo/ui/components/ui/sonner';
import { fetchUpdateEpisodeBid } from 'src/lib/queries/episodes';
import { EpisodeItemProps } from 'src/types/episodes';
import { formatNumber } from 'src/utils/formatNumber';

const EpisodeBidButton = ({ episode }: { episode: EpisodeItemProps }) => {
  const [showEpisodeModal, setShowEpisodeModal] = useState<boolean>(false);
  const [bidAmount, setBidAmount] = useState<string>('');

  // 입찰 처리
  const handleBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bidAmount) return toast.error('입찰 가격을 입력해주세요.');

    const amount = parseInt(bidAmount);
    if (isNaN(amount) || amount <= episode.bid_point) {
      toast.error('현재 입찰가보다 높은 금액을 입력해주세요.');
      return;
    }
    /* //FIXME - 로그인된 유저의 보유 포인트 */
    if (amount > 20000) {
      toast.error('보유 포인트가 부족합니다.');
      return;
    }

    try {
      const newTotalBid = episode.bid_point + Number(bidAmount);
      toast.loading(
        `${formatNumber(Number(bidAmount))}P를 추가 입찰하여 총 ${formatNumber(newTotalBid)}P로 입찰을 시도합니다.`
      );

      const data = await fetchUpdateEpisodeBid(episode.auction_id, episode.episode_id, Number(bidAmount));

      if (data === 'success') {
        toast.success('입찰을 성공하셨습니다.');
        window.location.reload();
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error('입찰에 실패하셨습니다.');
      }
    } finally {
      setShowEpisodeModal(false);
    }
  };

  useEffect(() => {
    if (!showEpisodeModal) return setBidAmount('');
  }, [showEpisodeModal]);

  return (
    <>
      <div className="flex flex-col justify-end gap-1">
        <Button
          size="sm"
          className="bg-[#8E74F9] hover:bg-[#3f3562]"
          onClick={() => {
            setShowEpisodeModal(true);
          }}
        >
          <FiAward />
          입찰하기
        </Button>
      </div>
      <Dialog open={showEpisodeModal} onOpenChange={setShowEpisodeModal}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="mb-4 text-center text-lg font-bold">{episode.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBid}>
            <div className="mb-5 text-center">
              <p className="mb-1 text-sm text-(--color-warm-gray)">현재 보유 포인트</p>
              {/* //FIXME - 로그인된 유저의 보유 포인트 */}
              <p className="text-xl font-bold text-(--color-text-base)">1000 P</p>
            </div>
            <div className="mb-5">
              <p className="mb-2 text-sm text-(--color-accent)">
                현재 최고 입찰가: {formatNumber(episode.bid_point)} P
              </p>
              <Input
                type="number"
                placeholder="입찰 금액을 입력하세요"
                className="w-full border-(--color-warm-gary) focus:border-0"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min={episode.bid_point}
                //FIXME - 로그인된 유저의 보유 포인트
                // max={userPoints}
              />
              <p className="mt-1 text-xs text-(--color-accent)">* 현재 입찰가보다 높은 금액을 입력해주세요</p>
            </div>
            <div className="flex space-x-3">
              <Button
                className="!rounded-button flex-1 bg-(--color-secondary) text-(--color-text-base) hover:bg-(--color-warm-gray)"
                onClick={() => setShowEpisodeModal(false)}
                type="button"
              >
                취소
              </Button>
              <Button
                className="!rounded-button flex-1 bg-(--color-accent) text-white hover:bg-(--color-primary)"
                type="submit"
              >
                입찰하기
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EpisodeBidButton;
