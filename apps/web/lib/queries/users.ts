import { notFound } from 'next/navigation';
import type { MyPageUserInfo } from '@repo/ui/types/mypage/index';

// 현재 유저 정보 불러오기
export const fetchCurrentUser = async (user_id: string): Promise<MyPageUserInfo> => {
  try {
    const response = await fetch(`/api/users?user_id=${user_id}`);

    if (!response.ok) {
      throw new Error(`유저 정보 불러오기 실패: ${response.statusText}`);
    }

    if (response.status === 404) {
      notFound();
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('유저 정보를 불러오는 중 오류가 발생했습니다.');
  }
};
