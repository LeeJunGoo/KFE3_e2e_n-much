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

export const fetchStoreUser = async (role: string) => {
  const res = await fetch('http://localhost:3001/api/auth/store-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ role })
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '사용자 정보 저장 중 오류가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

export const fetchUserRole = async () => {
  const res = await fetch('http://localhost:3001/api/auth/user-role', {
    method: 'GET'
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '사용자 역할 조회 중 오류가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

//전체 유저 정보 가져오기
export const fetchUserInfo = async () => {
  const res = await fetch('http://localhost:3001/api/auth/user-info', {
    method: 'GET'
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '사용자 정보 조회 중 오류가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};
