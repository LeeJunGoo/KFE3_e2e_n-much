//TODO - 모달 창 ui 깨지는 거 물어보기 => 리팩토링할 때 답변(박서영)
//TODO - 시간이 남거나 리팩토링할 때, tanstack query 도입

//TODO - 폼 유효성 검사 상의
//TODO - 날짜, 시간 유효성 검사 고려 (경매 최소 기간 상의)
//TODO - 날짜 시간 업로드 리팩토링하기
//TODO - 찜하기(favorites) 빈 배열로 초기화
//FIXME - 경매를 등록할 때, sellerId는 로그인한 유저의 아이디로 변경하기
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import ImageUploader from './ImageUploader';
import Image from 'next/image';
import { addHours, compareAsc, format, set, subDays } from 'date-fns';
import { FiCalendar as CalendarIcon } from 'react-icons/fi';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Calendar } from '@repo/ui/components/ui/calendar';
import { ko } from 'date-fns/locale';
import { TZDate } from 'react-day-picker';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { cn } from '@repo/ui/lib/utils';
import { uploadImage } from 'src/lib/supabase/query/bucket';
import PageTitle from '../common/ui/PageTitle';
import { Textarea } from '@repo/ui/components/ui/textarea';
import PageContainer from '../layout/PageContainer';
import { useQuery } from '@tanstack/react-query';
import { fetchAuctionById } from 'src/lib/queries/auctions';

export default function AuctionForm({ auctionIdParam }: { auctionIdParam: string | undefined }) {
  const isEditing: boolean = auctionIdParam ? true : false;
  const [isFormLoading, setIsFormLoading] = useState<boolean>(isEditing);

  const [showPostCodeSearch, setShowPostCodeSearch] = useState<boolean>(false);
  const [confirmPostCode, setConfirmPostCode] = useState<boolean>(isEditing);

  const [previewImages, setPreviewImages] = useState<{ id: string; data: string }[]>([]);
  const router = useRouter();

  const {
    data: auction,
    isLoading: isDataLoading,
    isError
  } = useQuery({
    queryKey: ['auctionForm'],
    queryFn: () => fetchAuctionById(auctionIdParam),
    enabled: !!auctionIdParam
  });

  const formSchema = z.object({
    title: z
      .string()
      .min(5, {
        message: '경매 제목은 최소 5자가 되어야 합니다.'
      })
      .max(50, {
        message: '경매 제목은 최대 50자가 되어야 합니다.'
      }),
    address: z
      .string()
      .min(5, { message: '주소는 최소 5글자가 되어야 합니다.' })
      .refine(() => confirmPostCode, { message: '주소 검색을 통해 주소를 입력해야 합니다.' }),
    detailAddress: z.string().min(5, { message: '상세 주소는 최소 5글자가 되어야 합니다.' }),
    startDay: z.date({ message: '경매 시작일을 입력해야 합니다.' }),
    startTime: z.string().min(8, { message: '경매 시작 시간을 입력해야 합니다.' }),
    endDay: z.date({ message: '경매 종료일을 입력해야 합니다.' }),
    endTime: z.string().min(8, { message: '경매 종료 시간을 입력해야 합니다.' }),
    description: z.string().min(5, { message: '상세 내용은 최소 5글자가 되어야 합니다.' }).max(500, {
      message: '상세 내용은 최대 500자가 되어야 합니다.'
    }),
    startingPoint: z.string().refine((value) => Number(value) > 0, { message: '최소 포인트는 0보다 커야합니다.' }),
    maxPoint: z.string().refine((value) => Number(value) > 0, { message: '최대 포인트는 0보다 커야합니다.' })
  });

  const getFormDefaultValues = useCallback(() => {
    const today = new Date();
    const startDay = new TZDate(today, 'Asia/Seoul');
    const endDay = addHours(startDay, 25); //NOTE - 임시로 설정한 기본 값

    const startTime = format(startDay, 'HH:mm:ss');
    const endTime = format(endDay, 'HH:mm:ss');

    return {
      title: '',
      address: '',
      startDay,
      startTime,
      endDay,
      endTime,
      detailAddress: '',
      description: '',
      startingPoint: '0',
      maxPoint: '0'
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormDefaultValues()
  });

  // async function getAuction(auctionId: string | undefined) {
  //   const fetchUrl = `http://localhost:3001/api/auctions?auction_id=${auctionId}`;
  //   const data = await fetch(fetchUrl);
  //   const result = await data.json();

  //   return result;
  // }

  useEffect(() => {
    async function setFormDefaultValues() {
      if (!isEditing) {
        return;
      }

      console.log('first', auction);

      if (auction) {
        const { title, address, start_time, end_time, description, image_urls, starting_point, max_point } = auction;

        const startDay = new TZDate(start_time, 'Asia/Seoul');
        const startTime = format(startDay, 'HH:mm:ss');

        const endDay = new TZDate(end_time, 'Asia/Seoul');
        const endTime = format(endDay, 'HH:mm:ss');

        form.reset({
          title,
          address: address[0],
          detailAddress: address[1],
          startDay,
          startTime,
          endDay,
          endTime,
          description,
          startingPoint: String(starting_point),
          maxPoint: String(max_point)
        });

        if (image_urls) {
          setPreviewImages(image_urls.map((image: string) => ({ id: uuidv4(), data: image })));
        }

        setIsFormLoading(false);
      } else {
        form.reset(getFormDefaultValues());
        setIsFormLoading(false);
      }
    }

    setFormDefaultValues();
  }, [auctionIdParam, form, getFormDefaultValues, isEditing, auction]);

  useEffect(() => {
    if (confirmPostCode) {
      form.trigger('address');
    }
  }, [confirmPostCode, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let imageUrls: string[] = [];
    const {
      title,
      address,
      detailAddress,
      startDay,
      startTime,
      endDay,
      endTime,
      description,
      startingPoint,
      maxPoint
    } = values;
    try {
      const imageUploadPromise = previewImages.map(async (prevImage): Promise<string> => {
        const data = await uploadImage(prevImage.data);
        return 'https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/' + data.fullPath;
      });

      imageUrls = await Promise.all(imageUploadPromise);
    } catch (error) {
      console.log(error);
    }

    const korStartTime = startTime.split(':');
    const korStartDate = set(startDay, {
      hours: Number(korStartTime[0]),
      minutes: Number(korStartTime[1]),
      seconds: Number(korStartTime[2])
    });
    const utcStartDate = new TZDate(korStartDate, 'utc');

    const korEndTime = endTime.split(':');
    const korEndDate = set(endDay, {
      hours: Number(korEndTime[0]),
      minutes: Number(korEndTime[1]),
      seconds: Number(korEndTime[2])
    });
    const utcEndDate = new TZDate(korEndDate, 'utc');

    const auctionId = uuidv4();
    const fetchUrl = `http://localhost:3001/api/auctions`;
    const data = await fetch(fetchUrl, {
      method: isEditing ? 'PATCH' : 'POST',
      body: JSON.stringify({
        auction_id: isEditing ? auctionIdParam : auctionId,
        seller_id: '8e085b32-e33d-4d0e-9189-1119836b74d2',
        title,
        address: [address, detailAddress],
        start_time: utcStartDate,
        end_time: utcEndDate,
        description,
        starting_point: startingPoint,
        max_point: maxPoint,
        image_urls: imageUrls,
        updated_at: new TZDate(new Date(), 'utc')
      })
    });
    const result = await data.json();

    console.log(values);
    console.log('결과', result);
    console.log('옥션아이디', auctionId);
    router.push(`http://localhost:3001/auctions/${auctionId}`);
  }

  const handlePostCodeSearch = (data: Address) => {
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
    form.setValue('address', fullAddress);
    form.trigger('address');
    setConfirmPostCode(true);
    setShowPostCodeSearch(false);
  };

  if (isError) {
    return <p>에러 발생</p>;
  }

  if (isFormLoading || isDataLoading) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      <PageTitle className="pb-10 text-left">{isEditing ? '경매 수정' : '경매 등록'}</PageTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목&#42;</FormLabel>
                <FormControl>
                  <Input placeholder="경매 상품의 제목을 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>주소&#42;</FormLabel>
                <FormControl>
                  <Input placeholder="상품 위치 또는 주소를 입력하세요." disabled={true} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="detailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상세 주소</FormLabel>
                <FormControl>
                  <Input placeholder="상품의 상세 위치 또는 상세 주소를 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => {
              setShowPostCodeSearch((prev) => !prev);
            }}
            className="outline"
          >
            {showPostCodeSearch ? '주소 검색 닫기' : '주소 검색'}
          </Button>
          {showPostCodeSearch && <DaumPostcodeEmbed onComplete={handlePostCodeSearch} />}
          <FormField
            control={form.control}
            name="startDay"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-col">
                <FormLabel>경매 시작일&#42;</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const todayDate = subDays(new TZDate(new Date(), 'Asia/Seoul'), 1);
                        const endDate = new TZDate(form.getValues('endDay'), 'Asia/Seoul');
                        const compareTodayDate = compareAsc(date, todayDate);
                        const compareEndDate = compareAsc(date, endDate);

                        return compareTodayDate === -1 || compareEndDate === 1;
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>경매 시작 시간&#42;</FormLabel>
                <FormControl>
                  <Input className="w-1/2" type="time" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDay"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-col">
                <FormLabel>경매 종료일&#42;</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        const startDate = new TZDate(form.getValues('startDay'), 'Asia/Seoul');
                        const compareEndDate = compareAsc(date, startDate);

                        return compareEndDate === -1;
                      }}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>경매 종료 시간&#42;</FormLabel>
                <FormControl>
                  <Input className="w-1/2" type="time" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상세 내용&#42;</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="상품에 대한 자세한 설명을 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startingPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>경매 시작 포인트&#42;</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="경매의 시작 포인트를 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>경매 상한 포인트&#42;</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="경매의 상한 포인트를 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormLabel>상품 이미지</FormLabel>
          <ImageUploader onPreviewImages={setPreviewImages} />
          <Button
            variant="outline"
            type="reset"
            onClick={() => {
              form.reset(getFormDefaultValues());
              setPreviewImages([]);
            }}
            className="w-1/2"
          >
            초기화
          </Button>
          <Button type="submit" className="w-1/2">
            {isEditing ? '수정하기' : '등록하기'}
          </Button>
        </form>
      </Form>
      <ul>
        {previewImages &&
          previewImages.map((previewImage) => {
            return (
              <li key={previewImage.id} className="relative">
                <Button
                  onClick={() => setPreviewImages((prev) => prev.filter((image) => image.id !== previewImage.id))}
                  className="absolute top-1 left-72"
                >
                  X
                </Button>
                <Image alt={'img'} src={previewImage.data} width={300} height={300} />
              </li>
            );
          })}
      </ul>
    </PageContainer>
  );
}
