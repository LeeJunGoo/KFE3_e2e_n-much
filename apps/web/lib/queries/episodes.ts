import { notFound } from 'next/navigation';

export const fetchAllEpisode = async () => {
  try {
    // 변경
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
