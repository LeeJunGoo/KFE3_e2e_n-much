import { z } from 'zod';
import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH, MIN_DESC_LENGTH, MIN_TITLE_LENGTH } from './constants';

export const episodeFormSchema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, { message: '제목은 최소 2글자 이상이어야 합니다.' })
    .max(MAX_TITLE_LENGTH, { message: '제목은 최대 50글자 이하이어야 합니다.' }),
  description: z
    .string()
    .min(MIN_DESC_LENGTH, { message: '사연은 최소 5글자 이상이어야 합니다.' })
    .max(MAX_DESC_LENGTH, { message: '사연은 최대 1000글자 이하이어야 합니다.' })
});

export type EpisodeFormType = z.infer<typeof episodeFormSchema>;
