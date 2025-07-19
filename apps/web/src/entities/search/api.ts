export const getPopularKeywords = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/keywords`);

  if (!res.ok) {
    throw new Error('인기 검색어를 불러오는 데 실패했습니다.');
  }
  const result = await res.json();

  return result.data.map((item: { keyword: string }) => item.keyword);
};

export const postKeyword = async (keyword: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/keywords`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keyword })
  });

  if (!res.ok) {
    throw new Error(`키워드 저장에 실패했습니다.: ${res.status}`);
  }
  const result = await res.json();

  return result.message;
};
