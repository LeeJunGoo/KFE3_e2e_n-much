import { EPISODES_LIST_QUERY_KEY } from 'src/entities/episode/constants';

//ANCHOR - episode pagination에서 사용하는 tansTack query Key
export const episodesListKeys = {
  all: [EPISODES_LIST_QUERY_KEY] as const,
  item: ({ auctionId, page }: { auctionId: string; page: number }) =>
    auctionId ? ([...episodesListKeys.all, auctionId, page] as const) : []
};
