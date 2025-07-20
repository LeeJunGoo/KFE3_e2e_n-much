import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getAuction, patchAuction, postAuction } from 'src/entities/auction/api';
import { auctionFormKeys } from 'src/entities/auction/queries/query-key-factory';
import type { FetchedAuction } from 'src/entities/auction/types';
import type { AuctionInsert, AuctionRow, AuctionUpdate } from 'src/shared/supabase/types';

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

export const usePostAuctionQuery = (auctionId: string | undefined) => {
  const { mutateAsync: mutatePostAuction, isPending: isPostAuctionPending } = useMutation({
    mutationFn: (formData: AuctionInsert): Promise<AuctionRow> => postAuction(formData),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: auctionFormKeys.item(auctionId) });
    },
    onError: (error) => {
      //TODO - toast로 error 표시 (KMH)
      console.error(error);
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
      console.error(error);
    }
  });
  return { mutatePatchAuction, isPatchAuctionPending };
};
