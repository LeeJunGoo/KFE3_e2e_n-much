'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import { useState } from 'react';
import { DaumPostcodeEmbed } from 'react-daum-postcode';

const AddressForm = () => {
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');

  const handleComplete = (data: {
    address: string;
    addressType: string;
    bname: string;
    buildingName: string;
    zonecode: string;
  }) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZonecode(data.zonecode);
    setAddress(fullAddress);

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

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
          <Input type="text" placeholder="우편번호" maxLength={10} readOnly value={zonecode} />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="active" className="h-auto px-10">
                주소 검색
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="mb-4 text-center text-lg font-bold">{'주소검색'}</DialogTitle>
              </DialogHeader>
              <DaumPostcodeEmbed onComplete={handleComplete} />;
            </DialogContent>
          </Dialog>
        </div>
        <Input type="text" placeholder="기본 주소" className="mb-2" maxLength={50} readOnly value={address} />
        <Input type="text" placeholder="나머지 주소 (선택 입력 가능)" maxLength={50} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full bg-white p-4">
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
