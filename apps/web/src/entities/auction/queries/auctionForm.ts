import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getAddressId, getAuction, patchAuction, postAuction } from 'src/entities/auction/api';
import { ADDRESS_ID_QUERY_KEY, AUCTION_FORM_QUERY_KEY } from '../constants/queryKey';
import type { AddressId, FetchedAuction } from 'src/entities/auction/types';
import type { AuctionInsert, AuctionRow, AuctionUpdate } from 'src/shared/supabase/types';

//NOTE - auctionForm에 들어갈 데이터를 가져오는데 사용
export const auctionFormKeys = {
  all: [AUCTION_FORM_QUERY_KEY] as const,
  item: (auctionId: string | undefined) => (auctionId ? ([...auctionFormKeys.all, auctionId] as const) : [])
};

//NOTE - addressId를 가져올 때 사용
export const addressIdKeys = {
  all: [ADDRESS_ID_QUERY_KEY] as const,
  item: (userId: string | undefined) => (userId ? ([...auctionFormKeys.all, userId] as const) : [])
};

const queryClient = new QueryClient();

export const useGetAuctionQuery = (auctionIdParam: string | undefined) => {
  const {
    data: fetchedAuction,
    isLoading: isAuctionFetching,
    isError: isAuctionFetchingError,
    error: fetchingAuctionError
  } = useQuery({
    queryKey: auctionFormKeys.item(auctionIdParam),
    queryFn: (): Promise<FetchedAuction> => getAuction(auctionIdParam),
    enabled: Boolean(auctionIdParam) === true,
    staleTime: Infinity
  });

  return { fetchedAuction, isAuctionFetching, isAuctionFetchingError, fetchingAuctionError };
};

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

export const usePostAuctionQuery = (auctionId: string | undefined) => {
  const { mutateAsync: mutatePostAuction, isPending: isPostAuctionPending } = useMutation({
    mutationFn: (formData: AuctionInsert): Promise<AuctionRow> => postAuction(formData),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: auctionFormKeys.item(auctionId) });
    },
    onError: (error) => {
      //TODO - toast로 error 표시 (KMH)
    }
  });
  return { mutatePostAuction, isPostAuctionPending };
};

export const usePatchAuctionQuery = (auctionId: string | undefined) => {
  const { mutateAsync: mutatePatchAuction, isPending: isPatchAuctionPending } = useMutation({
    mutationFn: (patchMutationParam: {
      auctionIdParam: string | undefined;
      patchAuctionParam: AuctionUpdate;
    }): Promise<AuctionRow> => patchAuction(patchMutationParam.auctionIdParam, patchMutationParam.patchAuctionParam),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: auctionFormKeys.item(auctionId) });
    },
    onError: (error) => {
      //TODO - toast로 error 표시 (KMH)
    }
  });
  return { mutatePatchAuction, isPatchAuctionPending };
};
