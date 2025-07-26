import type { AddressInsert, AddressRow } from 'src/shared/supabase/types';

// 🔍 주소 정보 조회
export const getAddressInfo = async (addressId: AddressRow['address_id']) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses?addressId=${addressId}`);

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const data: AddressRow = await res.json();
  return data;
};

// 📝 주소 등록
export const postAddressInfo = async (payload: AddressInsert) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/addresses`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error);
  }

  const result = await res.json();
  return result.data; // 삽입된 주소 데이터 반환
};
