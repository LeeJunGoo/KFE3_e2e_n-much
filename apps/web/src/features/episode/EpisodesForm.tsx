'use client';

import type { ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/ui/components/ui/form';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { patchEpisodeInfo, postEpisodeInfo } from 'src/entities/episode/api';
import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH } from 'src/entities/episode/constants';
import { episodeFormSchema } from 'src/entities/episode/schemas';
import FormActionsButton from './FormActionsButton';
import FormDescription from './FormDescription';
import FormTitle from './FormTitle';
import type { DetailFormType } from 'src/entities/episode/schemas';
import type { AuctionRow, EpisodeRow, UserRow } from 'src/shared/supabase/types';

const EpisodesForm = ({
  initialEpisodeInfo,
  auctionId,
  userId,
  children
}: {
  initialEpisodeInfo: EpisodeRow | null;
  auctionId: AuctionRow['auction_id'];
  userId: UserRow['id'];
  children: ReactNode;
}) => {
  const router = useRouter();
  const isEditMode = !!initialEpisodeInfo?.episode_id;
  const episodeId = isEditMode ? initialEpisodeInfo.episode_id : null;

  const form = useForm<DetailFormType>({
    resolver: zodResolver(episodeFormSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      title: initialEpisodeInfo?.title || '',
      description: initialEpisodeInfo?.description || ''
    }
  });

  const handleEpisodeUpsert = async (values: DetailFormType) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEpisodeUpsert)} className="mt-6">
        <FormTitle
          control={form.control}
          titleLabel="사연 제목"
          placeholder="사연 제목을 입력하세요."
          maxTitleLength={MAX_TITLE_LENGTH}
        />
        <FormDescription
          control={form.control}
          descriptionLabel="사연 내용"
          placeholder="이 경험이 당신에게 왜 특별한지 적어주세요...."
          maxDescLength={MAX_DESC_LENGTH}
        />
        {/* 사연 Tip */}
        {children}
        <FormActionsButton
          buttonLabel={isEditMode ? '수정 완료' : '사연 등록'}
          isValid={form.formState.isValid}
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

export default EpisodesForm;
