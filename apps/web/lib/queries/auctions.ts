import { notFound } from 'next/navigation';

//경매 리스트 전체 데이터 불러오기
export const fetchAllAuctions = async (user_id?: string) => {
  const url = user_id ? `/api/auctions?user_id=${user_id}` : `/api/auctions`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`경매 리스트 데이터 불러오기 실패: ${response.statusText}`);
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

//경매자 id 데이터 불러오기
