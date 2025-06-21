//TODO - 모달 창 ui 깨지는 거 물어보기 => 리팩토링할 때 답변(박서영)
//TODO - 시간이 남거나 리팩토링할 때, tanstack query 도입

//TODO - 폼 유효성 검사 상의
//TODO - ui 수정

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../typography/PageTitle';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import ImageUploader from './ImageUploader';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { ko } from 'date-fns/locale';
import { uploadImage } from '../../utils/supabase/query/bucket';

export default function AuctionForm() {
  const searchParams = useSearchParams();
  const auctionIdParam = searchParams.get('auction_id');

  const isEditing: boolean = auctionIdParam ? true : false;
  const [isLoading, setIsLoading] = useState<boolean>(isEditing);

  const [showPostCodeSearch, setShowPostCodeSearch] = useState<boolean>(false);
  const [confirmPostCode, setConfirmPostCode] = useState<boolean>(false);

  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

  const formDefaultValues = useMemo(
    () => ({
      title: '',
      address: '',
      startTime: '',
      endTime: '',
      detailAddress: '',
      description: '',
      startingPoint: '0',
      maxPoint: '0'
    }),
    []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues
  });

  async function getAuction(auctionId: string | null) {
    const fetchUrl = `http://localhost:3001/api/auctions?auction_id=${auctionId}`;
    const data = await fetch(fetchUrl);
    const result = await data.json();
    return result;
  }

  useEffect(() => {
    async function setFormDefaultValues(auctionId: string | null) {
      if (!isEditing) {
        return;
      }

      const result = await getAuction(auctionId);

      if (result.status === 'success' && result.data) {
        const { title, address, start_time, end_time, description, image_urls, starting_point, max_point } =
          result.data;

        form.reset({
          title,
          address: address[0],
          detailAddress: address[1],
          startDay: new Date(start_time),
          startTime: start_time.split('T')[1].substr(0, 8),
          endDay: new Date(end_time),
          endTime: end_time.split('T')[1].substr(0, 8),
          description,
          startingPoint: starting_point,
          maxPoint: max_point
        });

        setConfirmPostCode(true);
        setPreviewImages([...image_urls]);
        setIsLoading(false);
      } else {
        form.reset(formDefaultValues);
        setIsLoading(false);
      }
    }

    setFormDefaultValues(auctionIdParam);
  }, [auctionIdParam, form, formDefaultValues, isEditing]);

  useEffect(() => {
    if (confirmPostCode) {
      form.trigger('address');
    }
  }, [confirmPostCode, form]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageUrls: string[] = [];
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
      previewImages.forEach(async (prevImage) => {
        const data = await uploadImage(prevImage);
        imageUrls.push('https://psszbhuartnhkzomgxmq.supabase.co/storage/v1/object/public/' + data.fullPath);
      });
    } catch (error) {
      console.log(error);
    }
    console.log('imageUrls', imageUrls);
    const fetchUrl = `http://localhost:3001/api/auctions`;
    const data = await fetch(fetchUrl, {
      method: 'POST',
      body: JSON.stringify({
        user_id: '35a67768-f866-4cc3-aa19-746d714a3a25',
        title,
        address: [address, detailAddress],
        start_time: startDay.toISOString().split('T')[0] + 'T' + startTime,
        end_time: endDay.toISOString().split('T')[0] + 'T' + endTime,
        description,
        starting_point: startingPoint,
        max_point: maxPoint,
        image_urls: imageUrls
      })
    });
    const result = await data.json();

    console.log(values);
    console.log('결과', result);
  }

  const handleComplete = (data: Address) => {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageTitle>상품 정보</PageTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>제목</FormLabel>
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
                <FormLabel>주소</FormLabel>
                <FormControl>
                  <Input placeholder="상품 위치 또는 주소를 입력하세요." {...field} />
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
          {showPostCodeSearch && <DaumPostcodeEmbed onComplete={handleComplete} />}
          <FormField
            control={form.control}
            name="startDay"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>경매 시작일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
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
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
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
                <FormLabel>경매 시작 시간</FormLabel>
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
              <FormItem className="flex flex-col">
                <FormLabel>경매 종료일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
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
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
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
                <FormLabel>경매 종료 시간</FormLabel>
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
                <FormLabel>상세 내용</FormLabel>
                <FormControl>
                  <Input placeholder="상품에 대한 자세한 설명을 입력하세요." {...field} />
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
                <FormLabel>경매 시작 포인트</FormLabel>
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
                <FormLabel>경매 상한 포인트</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="경매의 상한 포인트를 입력하세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageUploader onPreviewImages={setPreviewImages} />
          <Button type="submit">{isEditing ? '수정하기' : '등록하기'}</Button>
        </form>
      </Form>
      <ul>
        {previewImages &&
          previewImages.map((previewImage) => {
            if (previewImage) {
              return (
                <li key={uuidv4()}>
                  <Image alt={'img'} src={previewImage} width={300} height={300} />
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}
