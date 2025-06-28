import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/ui/select';
import { Dispatch, SetStateAction } from 'react';

interface SelectOrderProp {
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

export default function SelectOrder({ order, setOrder }: SelectOrderProp) {
  return (
    <Select onValueChange={setOrder} defaultValue={order}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬 순서</SelectLabel>
          <SelectItem value="end_time">마감 임박순</SelectItem>
          <SelectItem value="favorites">인기순</SelectItem>
          <SelectItem value="created_at">최신순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
