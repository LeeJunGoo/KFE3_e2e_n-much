import { useQuery } from '@tanstack/react-query';
import { getAddressId } from 'src/entities/auction/api';
import { addressIdKeys } from 'src/entities/auction/queries/query-key-factory';
import type { AddressId } from 'src/entities/auction/types';

export const useGetAddressIdQuery = (loggedInUserId: string | undefined) => {
  const {
    data: fetchedAddressId,
    isLoading: isAddressIdFetching,
    isError: isAddressIdFetchingError,
    error: fetchingAddressIdError
  } = useQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: (): Promise<AddressId> => getAddressId(loggedInUserId),
    select: (data: AddressId) => data.address_id,
    enabled: Boolean(loggedInUserId) === true,
    staleTime: Infinity
  });

  return { fetchedAddressId, isAddressIdFetching, isAddressIdFetchingError, fetchingAddressIdError };
};
