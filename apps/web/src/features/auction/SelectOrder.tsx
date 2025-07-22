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
import type { SelectOrderProps } from 'src/entities/auction/types';

const SelectOrder = ({ order }: SelectOrderProps) => {
  const router = useRouter();
  //TODO - 서영님한테 물어보기 w-full md:w-44하니까 레이아웃 이상해짐 (KMH)
  return (
    <Select
      onValueChange={(changedOrder) =>
        router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/auctions?order=${changedOrder}`)
      }
      value={order}
    >
      <SelectTrigger className="w-full bg-white md:w-44">
        <SelectValue placeholder="정렬 순서 선택" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬 순서</SelectLabel>
          <SelectItem value="end_date">곧 종료되는 경매</SelectItem>
          <SelectItem value="favorites">인기 경매</SelectItem>
          <SelectItem value="created_at">최신 경매</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectOrder;
