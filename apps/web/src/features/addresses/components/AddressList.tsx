'use client';

import { useGetDefaultAddressInfo } from 'src/entities/addresses/queries/useAddresses';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import AddressListItem from 'src/features/addresses/components/AddressListItem';

const AddressList = () => {
  const user = useUserState();
  const userId = user?.id;
  const { data, isPending, isError } = useGetDefaultAddressInfo(userId);

  if (!userId) return <div>로그인 해주세요</div>;
  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러!</div>;
  if (!data) return <div>주소 없음</div>;

  return (
    <ul className="space-y-3">
      <AddressListItem address={data} />
    </ul>
  );
};

export default AddressList;
