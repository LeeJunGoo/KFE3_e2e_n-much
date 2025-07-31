import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDefaultAddressInfo, postAddressInfo, getAddressList, patchAddressInfo } from 'src/entities/addresses/api';
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

  return useMutation<string, Error, { address: AddressInsert }, void>({
    mutationFn: ({ address }) => postAddressInfo(address),
    onSuccess: (_data, { address }) => {
      if (address.is_default && address.user_id) {
        queryClient.invalidateQueries({ queryKey: addressQueryKeys.default(address.user_id) });
      }
    }
  });
};

// 주소 수정 훅
export const usePatchAddressInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, { addressId: string; address: AddressInsert }, void>({
    mutationFn: async ({ addressId, address }) => {
      const status = await patchAddressInfo(addressId, address);
      return status.message;
    },
    onSuccess: (_data, { address }) => {
      if (address.user_id) {
        queryClient.invalidateQueries({ queryKey: addressQueryKeys.default(address.user_id) });
      }
    }
  });
};

export const useGetAddressList = (userId: string) => {
  return useQuery({
    queryKey: addressQueryKeys.list(userId),
    queryFn: () => getAddressList(userId),
    enabled: !!userId
  });
};
