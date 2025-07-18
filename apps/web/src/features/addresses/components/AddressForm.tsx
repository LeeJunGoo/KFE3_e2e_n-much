import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';

const AddressForm = () => {
  return (
    <form>
      <div className="flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          업체명
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Input type="text" placeholder="예: OO 제과점" maxLength={10} />
      </div>
      <div className="mt-8 flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          주소
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <div className="mb-2 flex items-stretch gap-2">
          <Input type="text" placeholder="우편번호" maxLength={10} readOnly />
          <Button variant="active" className="h-auto px-10">
            주소 검색
          </Button>
        </div>
        <Input type="text" placeholder="기본 주소" className="mb-2" maxLength={50} readOnly />
        <Input type="text" placeholder="나머지 주소 (선택 입력 가능)" maxLength={50} />
      </div>
      <div className="w-ful absolute bottom-0 left-0 right-0 bg-white p-4">
        <Button variant="base" className="w-full">
          등록하기
        </Button>
      </div>
      <div className="mt-8">
        <label className="flex w-full items-start justify-center gap-2">
          <input type="checkbox" className="accent-(--color-accent) size-4 translate-y-0.5" checked readOnly />
          <p className="text-sm">
            <span className="mr-1 block md:inline-block">기본 주소로 저장</span>
            <span className="text-(--color-text-base)/70">(첫 주소는 자동으로 기본 주소로 저장됩니다)</span>
          </p>
        </label>
      </div>
    </form>
  );
};

export default AddressForm;
