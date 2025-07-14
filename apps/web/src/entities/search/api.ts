export const postKeyword = async (keyword: string) => {
  const res = await fetch('/api/search', {
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
