export const userQueryKeys = {
  all: ['user'] as const,
  detail: (userId: string) => [...userQueryKeys.all, 'detail', userId] as const
};
