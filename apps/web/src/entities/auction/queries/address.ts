import { useQuery } from '@tanstack/react-query';
import { getAddressId } from 'src/entities/auction/api';
import { addressIdKeys } from 'src/entities/auction/queries/queryKeyFactory';
import type { AddressId } from 'src/entities/auction/types';

export const useGetAddressIdQuery = (loggedInUserId: string) => {
  const {
    data: fetchedAddressId,
    isPending: isAddressIdFetching,
    isError: isAddressIdFetchingError,
    error: fetchingAddressIdError
  } = useQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: (): Promise<AddressId> => getAddressId(loggedInUserId),
    select: (data: AddressId) => data.address_id,
    enabled: !!loggedInUserId,
    staleTime: Infinity
  });

  return { fetchedAddressId, isAddressIdFetching, isAddressIdFetchingError, fetchingAddressIdError };
};
