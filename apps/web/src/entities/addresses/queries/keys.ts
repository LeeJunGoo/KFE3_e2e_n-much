export const addressQueryKeys = {
  all: ['addresses'] as const,
  default: (userId: string) => [...addressQueryKeys.all, 'default', userId] as const
};
