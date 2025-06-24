import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@repo/ui/components/ui/select';

export default function SelectOrder() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>정렬 순서</SelectLabel>
          <SelectItem value="apple">마감 임박순</SelectItem>
          <SelectItem value="banana">인기순</SelectItem>
          <SelectItem value="blueberry">최신순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
