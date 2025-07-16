'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { toast } from '@repo/ui/components/ui/sonner';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { patchEpisodeInfo, postEpisodeInfo } from 'src/entities/episode/api';
import { EPISODE_TIP, MAX_DESC_LENGTH, MAX_TITLE_LENGTH } from 'src/entities/episode/constants';
import { episodeFormSchema, EpisodeFormType } from 'src/entities/episode/schemas';
import type { AuctionRow, EpisodeRow, UserRow } from 'src/shared/supabase/types';
import FormActionsButton from './FormActionsButton';

const EpisodesForm = ({
  initialEpisodeInfo,
  auctionId,
  userId
}: {
  initialEpisodeInfo: EpisodeRow | null;
  auctionId: AuctionRow['auction_id'];
  userId: UserRow['id'];
}) => {
  const router = useRouter();
  const isEditMode = !!initialEpisodeInfo?.episode_id;
  const episodeId = isEditMode ? initialEpisodeInfo.episode_id : null;

  const form = useForm<EpisodeFormType>({
    resolver: zodResolver(episodeFormSchema),
    defaultValues: {
      title: initialEpisodeInfo?.title || '',
      description: initialEpisodeInfo?.description || ''
    }
  });

  // const [title, description] = form.watch(['title', 'description']);

  // const titleTextColor = title.length >= MAX_TITLE_LENGTH ? 'text-(--color-red)' : 'text-(--color-warm-gray)';
  // const descTextColor = description.length >= MAX_DESC_LENGTH ? 'text-(--color-red)' : 'text-(--color-warm-gray)';

  const handleEpisodeUpsert = async (values: EpisodeFormType) => {
    const { title, description } = values;

    try {
      const result = isEditMode
        ? await patchEpisodeInfo({ episodeId, title, description }) //NOTE - 수정 모드
        : await postEpisodeInfo({ auctionId, userId, title, description }); //NOTE - 등록 모드

      if (result === 'success') {
        const alertContent = isEditMode ? '사연을 수정하였습니다.' : '사연을 등록하였습니다.';
        toast.success(alertContent);
        router.push(`/auctions/${auctionId}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEpisodeUpsert)} className="mt-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState, formState }) => (
            <FormItem className="mb-8">
              <FormLabel className="flex gap-0.5">
                <p>사연 제목</p>
                <span className="translate-y-0.5">&#42;</span>
              </FormLabel>
              <div className="relative mt-2">
                <FormControl>
                  <Input type="text" {...field} className="h-11 bg-white p-3.5" placeholder="사연 제목을 입력하세요." />
                </FormControl>
              </div>
              <div className="relative">
                {formState.isSubmitted && fieldState.error && <FormMessage />}
                <p className={`absolute right-0 top-0 text-xs font-semibold ${titleTextColor}`}>
                  {title.length}/{MAX_TITLE_LENGTH}
                </p>
              </div>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState, formState }) => (
            <FormItem className="">
              <FormLabel className="flex gap-0.5">
                <p>상세 내용</p>
                <span className="translate-y-0.5">&#42;</span>
              </FormLabel>
              <div className="relative mt-2">
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-51 w-full resize-none break-all bg-white p-3.5"
                    placeholder="이 경험이 당신에게 왜 특별한지 적어주세요...."
                    rows={4}
                  ></Textarea>
                </FormControl>
              </div>
              <div className="relative">
                {formState.isSubmitted && fieldState.error && <FormMessage />}
                <p className={`absolute right-0 top-0 text-xs font-semibold ${descTextColor}`}>
                  {description.length}/{MAX_DESC_LENGTH}
                </p>
              </div>
            </FormItem>
          )}
        ></FormField>
        <div className="bg-(--color-secondary) my-10 rounded-lg p-4">
          <h3 className="text-(--color-accent) mb-4 text-sm font-medium">
            <i className="fas fa-lightbulb mr-2"></i>좋은 사연을 위한 팁
          </h3>
          <ul className="text-(--color-warm-gray) space-y-2 text-sm">
            {EPISODE_TIP.map((text, index) => (
              <li key={index}>&bull;&nbsp;{text}&#46;</li>
            ))}
          </ul>
        </div>
        <FormActionsButton
          resetOnClick={handleReset}
          resetLabel="초기화"
          submitLabel={isEditMode ? '수정 완료' : '사연 등록'}
        />
      </form>
    </Form>
  );
};

export default EpisodesForm;
