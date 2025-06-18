import { notFound } from 'next/navigation';

export const fetchAllEpisode = async () => {
  try {
    const response = await fetch(`/api/stories`);

    if (!response.ok) {
      throw new Error(`사연 데이터 불러오기 실패: ${response.statusText}`);
    }

    if (response.status === 404) {
      notFound();
    }

    const data = await response.json();
    if (data.status === 'error') throw new Error(data.error);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
