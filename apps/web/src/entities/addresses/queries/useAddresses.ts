import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDefaultAddressInfo, postAddressInfo } from 'src/entities/addresses/api';
import { addressQueryKeys } from 'src/entities/addresses/queries/keys';
import type { AddressInsert } from 'src/shared/supabase/types';

// 기본 주소 정보 조회 훅
export const useGetDefaultAddressInfo = (userId?: string) => {
  return useQuery({
    queryKey: addressQueryKeys.default(userId ?? ''),
    queryFn: () => getDefaultAddressInfo(userId ?? ''),
    enabled: !!userId
  });
};

// 주소 등록 훅
export const usePostAddressInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddressInsert) => postAddressInfo(payload),
    onSuccess: (_data, variables) => {
      if (variables.is_default && variables.user_id) {
        queryClient.invalidateQueries({ queryKey: addressQueryKeys.default(variables.user_id) });
      }
    }
  });
};
