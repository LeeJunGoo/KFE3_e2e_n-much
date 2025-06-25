// import type { MyPageUserInfo } from '../../types/mypage/index';

// // 현재 유저 정보 불러오기
// export const fetchCurrentUser = async (user_id: string): Promise<MyPageUserInfo> => {
//   const res = await fetch(`/api/users?user_id=${user_id}`);
//   const json = await res.json();
//   if (json.status !== 'success') throw new Error(json.error);
//   return json.data;
// };
