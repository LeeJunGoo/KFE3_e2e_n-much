import { MAX_DESC_LENGTH, MAX_TITLE_LENGTH, MIN_DESC_LENGTH, MIN_TITLE_LENGTH } from 'src/entities/episode/constants';
import { formatNumber } from 'src/shared/utils/formatNumber';
import { z } from 'zod';

export const episodeFormSchema = z.object({
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, { message: '제목을 두 글자 이상 입력해 주세요.' })
    .max(MAX_TITLE_LENGTH, { message: '제목을 50자 이하로 입력해 주세요.' }),
  description: z
    .string()
    .min(MIN_DESC_LENGTH, { message: '사연을 다섯 글자 이상 입력해 주세요.' })
    .max(MAX_DESC_LENGTH, { message: '사연을 1,000자 이하로 입력해 주세요.' })
});

export type DetailFormType = z.infer<typeof episodeFormSchema>;

// Zod 스키마를 동적으로 생성하는 함수
export const bidPointSchema = (min: number, max: number) =>
  z.object({
    bidAmount: z
      .number({
        required_error: '입찰 금액 또는 숫자만 입력해주세요.'
      })
      .min(min, `하한가는 ${formatNumber(min)}P 입니다.`)
      .max(max, `상한가는 ${formatNumber(max)}P 입니다.`)
  });
// FormValues 타입을 동적으로 추론
export type FormValues = z.infer<ReturnType<typeof bidPointSchema>>;
