'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Input } from '@repo/ui/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import { usePostAddressInfo } from 'src/entities/addresses/queries/useAddresses';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { getImageURLFromDB } from 'src/entities/user/mypage/utils/getImage';

type PostcodeData = {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
};

const AddressForm = () => {
  const [businessName, setBusinessName] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { push } = useRouter();
  const user = useUserState();
  const userId = user?.id;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutate, isPending } = usePostAddressInfo();

  const handleComplete = (data: PostcodeData) => {
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
  };

  // 등록 버튼 클릭시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    if (!businessName || !zonecode || !address) {
      alert('필수 입력값을 모두 입력해 주세요.');
      return;
    }
    if (!imageFile) {
      alert('이미지를 등록해 주세요.');
      return;
    }

    // DB에 이미지 저장 후 URL 가져오기 - KSH
    const imageUrl: string | null = await getImageURLFromDB(imageFile);

    mutate(
      {
        user_id: userId,
        business_name: businessName,
        postal_code: zonecode,
        road_address: address,
        detail_address: detailAddress,
        is_default: true, // 첫 주소라 기본주소
        company_image: imageUrl
      },
      {
        onSuccess: () => {
          push('/mypage');
        },
        onError: (error) => {
          alert(error instanceof Error ? error.message : '주소 등록 실패');
        }
      }
    );
  };

  // 파일 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          업체명
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Input
          type="text"
          placeholder="예: OO 제과점"
          maxLength={30}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          이미지 등록
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {/* 미리보기 */}
        {imageFile && (
          <Image src={URL.createObjectURL(imageFile)} alt="미리보기" width={50} height={50} className="mt-2 h-20" />
        )}
      </div>
      <div className="mt-8 flex flex-col">
        <label className="mb-2 flex items-center gap-0.5 text-sm">
          주소
          <span className="text-(--color-red) translate-y-0.5">*</span>
        </label>
        <div className="mb-2 flex items-stretch gap-2">
          <Input type="text" placeholder="우편번호" maxLength={10} readOnly value={zonecode} />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="active" className="h-auto px-10" onClick={() => setIsDialogOpen(true)}>
                주소 검색
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className="mb-4 text-center text-lg font-bold">{'주소검색'}</DialogTitle>
              </DialogHeader>
              <DaumPostcodeEmbed
                onComplete={(data) => {
                  handleComplete(data);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        <Input type="text" placeholder="기본 주소" className="mb-2" maxLength={50} readOnly value={address} />
        <Input
          type="text"
          placeholder="나머지 주소 (선택 입력 가능)"
          maxLength={50}
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full bg-white p-4">
        <Button type="submit" variant="base" className="w-full" disabled={isPending}>
          {isPending ? '등록 중...' : '등록하기'}
        </Button>
      </div>
      <div className="mt-8">
        <label className="flex w-full items-start justify-center gap-2">
          <input type="checkbox" className="accent-(--color-accent) size-4 translate-y-0.5" checked readOnly />
          <p className="text-sm">
            <span className="mr-1 block md:inline-block">기본 주소로 저장</span>
            <span className="text-(--color-text-base)/70">&#40;첫 주소는 자동으로 기본 주소로 저장됩니다&#41;</span>
          </p>
        </label>
      </div>
    </form>
  );
};

export default AddressForm;
