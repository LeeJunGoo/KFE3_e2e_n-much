export const fetchPopularKeywords = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/keywords`);

  if (!res.ok) {
    throw new Error('인기 검색어를 불러오는 데 실패했습니다.');
  }
  console.log('res:', res);
  const result = await res.json();
  return result.data;
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
    throw new Error(`키워드를 저장하는 과정에서 에러가 발생했습니다.: ${res.status}`);
  }
  const result = await res.json();

  return result.data;
};
