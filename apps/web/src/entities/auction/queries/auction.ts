import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { getAddressId, getAuction, getAuctionCardList, patchAuction, postAuction } from 'src/entities/auction/api';
import { addressIdKeys, auctionFormKeys, auctionListKeys } from 'src/entities/auction/queries/queryKeyFactory';
import { popToast } from 'src/shared/utils/toast';
import type { EpisodeCount, FetchedAuction } from 'src/entities/auction/types';
import type { AuctionInsert, AuctionRow, AuctionUpdate } from 'src/shared/supabase/types';

export const useGetAuctionQuery = (auctionIdParam: string | undefined) => {
  const {
    data: fetchedAuction,
    isPending: isAuctionFetching,
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
  const queryClient = new QueryClient();

  const { mutateAsync: mutatePostAuction, isPending: isPostAuctionPending } = useMutation({
    mutationFn: (formData: AuctionInsert): Promise<AuctionRow> => postAuction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionFormKeys.item(auctionId) });
      popToast('info', '경매 등록 성공', '경매 등록에 성공했습니다.', 'medium');
    }
  });
  return { mutatePostAuction, isPostAuctionPending };
};

export const usePatchAuctionQuery = (auctionId: string | undefined) => {
  const queryClient = new QueryClient();

  const { mutateAsync: mutatePatchAuction, isPending: isPatchAuctionPending } = useMutation({
    mutationFn: (patchMutationParam: {
      auctionIdParam: string | undefined;
      patchAuctionParam: AuctionUpdate;
    }): Promise<AuctionRow> => patchAuction(patchMutationParam.auctionIdParam, patchMutationParam.patchAuctionParam),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auctionFormKeys.item(auctionId) });
      popToast('info', '경매 수정 성공', '경매 수정에 성공했습니다.', 'medium');
    }
  });
  return { mutatePatchAuction, isPatchAuctionPending };
};

export const prefetchedAuctionList = async (order: string, keyword: string | undefined, queryClient: QueryClient) => {
  await queryClient.prefetchInfiniteQuery({
    queryKey: auctionListKeys.order(order),
    queryFn: ({
      pageParam
    }: {
      pageParam: number;
    }): Promise<{
      data: (AuctionRow & EpisodeCount)[];
      nextId: number;
    }> => getAuctionCardList({ order, keyword, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId
  });
};

export const useGetAuctionListQuery = (order: string, keyword: string | undefined) => {
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
      getAuctionCardList({ order, keyword, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { data: (AuctionRow & EpisodeCount)[]; nextId: number }) => lastPage.nextId,
    staleTime: 0,
    enabled: Boolean(order) === true
  });

  return { fetchedAuctions, isError, error, isPending, isFetchingNextPage, fetchNextPage, ref, inView };
};

export const prefetchAddressId = async (loggedInUserId: string, queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: () => getAddressId(loggedInUserId)
  });
};

export const prefetchAuctionFormData = async (auctionId: string | undefined, queryClient: QueryClient) => {
  await queryClient.prefetchQuery({
    queryKey: auctionFormKeys.item(auctionId),
    queryFn: () => getAuction(auctionId)
  });
};
