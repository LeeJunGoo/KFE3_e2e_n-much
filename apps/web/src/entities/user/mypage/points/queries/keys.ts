export const pointQueryKeys = {
  all: ['point'] as const,
  user: (userId: string) => [...pointQueryKeys.all, 'user', userId] as const
};
