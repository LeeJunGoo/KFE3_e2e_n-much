//전체 사연 리스트 불러오기
export const fetchAllEpisode = async () => {
  const res = await fetch(`/api/episodes`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};

// 내가 쓴 사연 리스트 불러오기
export const fetchUserEpisodes = async (userId: string) => {
  const res = await fetch(`/api/episodes?user_id=${userId}`);
  const json = await res.json();
  if (!res.ok || json.status !== 'success') throw new Error(json.error || res.statusText);
  return json.data;
};
