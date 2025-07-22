import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getAuction, getAuctionCardList, patchAuction, postAuction } from 'src/entities/auction/api';
import { auctionFormKeys, auctionListKeys } from 'src/entities/auction/queries/queryKeyFactory';
import type { AuctionListProps, EpisodeCount, FetchedAuction } from 'src/entities/auction/types';
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

export const useGetAuctionListQuery = (order: string) => {
  const { ref, inView } = useInView();
  const {
    data: fetchedAuctions,
    isError,
    error,
    isPending,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: auctionListKeys.order(order),
    queryFn: ({ pageParam }: { pageParam: number }): Promise<{ data: (AuctionRow & EpisodeCount)[]; nextId: number }> =>
      getAuctionCardList({ order, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId,
    staleTime: 0,
    enabled: Boolean(order) === true
  });

  return { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, ref, inView };
};
