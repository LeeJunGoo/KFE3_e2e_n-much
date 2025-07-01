import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pointQueryKeys } from './keys/points';
import { fetchUserPointTransactions, fetchCreatePointTransaction } from 'src/lib/queries/points';

// 포인트 거래 내역 조회
export const useGetUserPointTransactions = () => {
  return useQuery({
    queryKey: pointQueryKeys.transactions(),
    queryFn: fetchUserPointTransactions
  });
};

// 포인트 거래 내역 추가
export const useCreatePointTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreatePointTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pointQueryKeys.transactions() });
    }
  });
};
