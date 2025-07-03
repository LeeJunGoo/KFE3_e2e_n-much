//NOTE - 사용자 포인트 거래 내역 조회
export const fetchUserPointTransactions = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/points`);
  if (!res.ok) {
    throw new Error('포인트 거래 내역을 가져오는 과정에서 네트워크 에러가 발생했습니다.');
  }
  const data = await res.json();
  return data.data;
};

//NOTE - 포인트 거래 내역 추가
export const fetchCreatePointTransaction = async ({
  type,
  amount,
  balance,
  title,
  description
}: {
  type: string;
  amount: number;
  balance: number;
  title: string;
  description?: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/points`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      type,
      amount,
      balance,
      title,
      description
    })
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (res.status === 400) {
      console.error(errorData.message);
      return;
    }
    throw new Error('포인트 거래 내역을 추가하는 과정에서 네트워크 에러가 발생했습니다.');
  }

  const data = await res.json();
  return data.data;
};
