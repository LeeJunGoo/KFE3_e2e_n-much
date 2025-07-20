import {
  MAX_DESCRIPTION_LETTERS,
  MAX_TITLE_LETTERS,
  MIN_DESCRIPTION_LETTERS,
  MIN_END_TIME_LETTERS,
  MIN_MAX_POINT_NUM,
  MIN_STARTING_POINT_NUM,
  MIN_TITLE_LETTERS
} from 'src/entities/auction/constants';
import { z } from 'zod';

export const auctionFormSchema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LETTERS, {
      message: '경매 제목은 최소 5글자가 되어야 합니다.'
    })
    .max(MAX_TITLE_LETTERS, {
      message: '경매 제목은 최대 50글자가 되어야 합니다.'
    }),
  description: z
    .string()
    .min(MIN_DESCRIPTION_LETTERS, { message: '상세 내용은 최소 5글자가 되어야 합니다.' })
    .max(MAX_DESCRIPTION_LETTERS, {
      message: '상세 내용은 최대 500자가 되어야 합니다.'
    }),
  endDay: z.date({ message: '경매 종료일을 입력해야 합니다.' }),
  // .refine((day) => validateDate(day, null, false), { message: '경매 종료 일/시각은 현재 이후여야 합니다.' })
  endTime: z.string().min(MIN_END_TIME_LETTERS, { message: '경매 종료 시각을 입력해야 합니다.' }),
  // .refine((time) => validateDate(null, time, false), { message: '경매 종료 일/시각은 현재 이후여야 합니다.' }),
  startingPoint: z
    .string()
    .refine((value) => Number(value) > MIN_STARTING_POINT_NUM, { message: '최소 포인트는 0보다 커야 합니다.' }),
  maxPoint: z
    .string()
    .refine((value) => Number(value) > MIN_MAX_POINT_NUM, { message: '최대 포인트는 0보다 커야 합니다.' })
});
