'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/ui/select';
import { useRouter } from 'next/navigation';

//TODO - 파일로 분리하기
interface SelectOrderProp {
  order: string;
}

const SelectOrder = ({ order }: SelectOrderProp) => {
  const router = useRouter();

  return (
    <Select
      onValueChange={(changedOrder) =>
        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/auctions?order=${changedOrder}`)
      }
      value={order}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬 순서</SelectLabel>
          <SelectItem value="end_date">마감 임박순</SelectItem>
          <SelectItem value="favorites">인기순</SelectItem>
          <SelectItem value="created_at">최신순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectOrder;
