'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { toast } from '@repo/ui/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { type AuctionBidPointAmount } from 'src/entities/auction/types';
import { SELLER_MAX_POINT, SELLER_MIN_POINT } from 'src/entities/episode/constants';
import { usePatchEpisodeBidMutation } from 'src/entities/episode/queries/episode';
import { bidPointSchema, type FormValues } from 'src/entities/episode/schemas';
import { formatNumber } from 'src/shared/utils/formatNumber';
import type { EpisodeItemProps } from 'src/entities/episode/types';

type EpisodeBidModalFormProps = {
  auctionPoint: AuctionBidPointAmount;
  userPoint: number;
  role: string;
  episode: EpisodeItemProps;
  onClose: () => void;
};

const EpisodeBidModalForm = ({ auctionPoint, userPoint, role, episode, onClose }: EpisodeBidModalFormProps) => {
  const minBid = role === 'buyer' ? auctionPoint.starting_point : SELLER_MIN_POINT;
  const maxBid = role === 'buyer' ? auctionPoint.max_point : SELLER_MAX_POINT;

  const form = useForm<FormValues>({
    resolver: zodResolver(bidPointSchema(minBid, maxBid)),
    defaultValues: {
      bidAmount: undefined
    }
  });
  const { handleSubmit, reset } = form;

  const { mutateAsync, isPending, isError } = usePatchEpisodeBidMutation();

  const handleOnSubmit = async ({ bidAmount }: FormValues) => {
    if (bidAmount > userPoint) {
      toast.error('보유 포인트가 부족합니다.');
      return;
    }
    const totalBid = episode.bid_point! + bidAmount;

    mutateAsync({ episodeId: episode.episode_id, bidPoint: totalBid });

    if (isPending) {
      toast.loading(`${formatNumber(bidAmount)}P를 추가 입찰하여 총 ${formatNumber(totalBid)}P로 입찰을 시도합니다.`);
    }

    if (isError) {
      reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-6">
          <FormField
            control={form.control}
            name="bidAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className="w-fit">
                  <span className="text-(--color-warm-gray)">입찰 금액</span>
                </FormLabel>
                <div className="text-(--color-warm-gray) mb-1 text-sm">상한가: {formatNumber(maxBid)} P</div>
                <Input
                  id={field.name}
                  type="text"
                  inputMode="numeric"
                  placeholder={`${formatNumber(minBid)} P 이상 입찰 금액을 입력하세요`}
                  className="text-center"
                  {...field}
                  value={field.value ?? ''}
                  maxLength={6}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const parsed = Number(raw);
                    if (!Number.isNaN(parsed) && /^\d+$/.test(raw)) {
                      field.onChange(parsed);
                      form.clearErrors('bidAmount'); // 정상 입력 시 에러 제거
                    } else if (raw === '') {
                      field.onChange(undefined);
                      form.clearErrors('bidAmount'); // 공란도 에러 제거
                    } else {
                      field.onChange(undefined);
                      form.setError('bidAmount', {
                        type: 'manual',
                        message: '입찰 금액 또는 숫자만 입력해주세요.'
                      });
                    }
                  }}
                />
                <div className="text-(--color-warm-gray) mb-1 text-sm">하한가: {formatNumber(minBid)} P</div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            className="!rounded-button bg-(--color-secondary) text-(--color-text-base) hover:bg-(--color-warm-gray) flex-1"
            onClick={onClose}
            type="button"
          >
            취소
          </Button>
          <Button
            className="!rounded-button bg-(--color-accent) hover:bg-(--color-primary) flex-1 text-white"
            type="submit"
            disabled={isPending}
          >
            입찰하기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EpisodeBidModalForm;
