import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postKeyword } from 'src/entities/search/api';

interface MutateParams {
  keyword: string;
}

export const usePostKeywordMutation = (
  optimisticUpdate: (keyword: string) => string[],
  rollback: (previous: string[]) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MutateParams, { previous: string[] }>({
    mutationFn: async ({ keyword }) => {
      await postKeyword(keyword);
      return;
    },

    // 낙관적 업데이트
    onMutate: async ({ keyword }) => {
      const previous = optimisticUpdate(keyword);
      return { previous };
    },

    // 실패 시 롤백
    onError: (error, _, context) => {
      console.error(error.message);
      if (context?.previous) {
        rollback(context.previous);
      }
    },

    // 성공 시 캐시 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['popularKeywords'] });
    }
  });
};
