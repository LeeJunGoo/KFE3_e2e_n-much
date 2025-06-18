import { notFound } from 'next/navigation';

export const fetchAllEpisode = async () => {
  try {
    const response = await fetch(`/api/episodes`);

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`사연 데이터 불러오기 실패: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// 내가 쓴 사연 리스트 불러오기
export const fetchUserEpisodes = async (userId: string) => {
  try {
    const response = await fetch(`/api/episodes?user_id=${userId}`);

    if (!response.ok) {
      throw new Error(`내 사연 불러오기 실패: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
