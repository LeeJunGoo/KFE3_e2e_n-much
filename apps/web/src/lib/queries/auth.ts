export const fetchLogout = async () => {
  const res = await fetch('http://localhost:3001/api/auth/logout', {
    method: 'POST'
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '로그아웃 중 오류가 발생했습니다.');
  }

  const data = await res.json();
  return data.status;
};
