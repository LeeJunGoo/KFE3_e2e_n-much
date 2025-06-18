export const episodeQueryKeys = {
  all: ['episode'] as const,
  detail: (userId: string) => [...episodeQueryKeys.all, userId] as const,
  episode: (episodeId: string) => [...episodeQueryKeys.all, 'episode', episodeId] as const
};
