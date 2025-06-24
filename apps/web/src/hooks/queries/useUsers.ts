import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../../lib/queries/users';
import { userQueryKeys } from './keys/users';

//유저 정보 불러오기
// export const useGetUser = (userId: string) => {
//   return useQuery({
//     queryKey: userQueryKeys.detail(userId),
//     queryFn: () => fetchCurrentUser(userId),
//     enabled: !!userId
//   });
// };
