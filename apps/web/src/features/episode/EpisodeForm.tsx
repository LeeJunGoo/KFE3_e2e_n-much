'use client';

import { useState, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@repo/ui/components/ui/form';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { patchEpisodeInfo, postEpisodeInfo } from 'src/entities/episode/api';
import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH } from 'src/entities/episode/constants';
import { episodeFormSchema } from 'src/entities/episode/schemas';
import FormActionButton from 'src/shared/ui/FormActionButton';
import FormDescription from 'src/shared/ui/FormDescription';
import FormTitle from 'src/shared/ui/FormTitle';
import type { DetailFormType } from 'src/entities/episode/schemas';
import type { AuctionRow, EpisodeRow, UserRow } from 'src/shared/supabase/types';

const EpisodeForm = ({
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
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isEditMode = !!initialEpisodeInfo?.episode_id;
  const episodeId = initialEpisodeInfo?.episode_id;

  const form = useForm<DetailFormType>({
    resolver: zodResolver(episodeFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: initialEpisodeInfo?.title || '',
      description: initialEpisodeInfo?.description || ''
    }
  });
  const handleEpisodeUpsert = async (values: DetailFormType) => {
    const { title, description } = values;

    try {
      const status = isEditMode
        ? await patchEpisodeInfo({ episodeId, title, description }) // 수정
        : await postEpisodeInfo({ auctionId, userId, title, description }); // 등록

      if (status === 'success') {
        setIsRedirecting(true);
        const message = isEditMode ? '사연을 수정하였습니다.' : '사연을 등록하였습니다.';
        router.push(`/auctions/${auctionId}`);
        toast.success(message);
      }
    } catch (error) {
      const message = isEditMode ? '사연을 수정하지 못했습니다.' : '사연을 등록하지 못했습니다.';
      toast.error(message);
      if (error instanceof Error) {
        console.error(error.message);
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
        <FormActionButton
          buttonLabel={isEditMode ? '수정 완료' : '사연 등록'}
          isSubmitting={form.formState.isSubmitting}
          isRedirecting={isRedirecting}
        />
      </form>
    </Form>
  );
};

export default EpisodeForm;
