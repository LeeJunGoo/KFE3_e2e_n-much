//TODO - 상세 정보에서 수정하기 누르면 미들웨어에서 자기 계정인지 확인하기  (KMH)
//TODO - 폼 유효성 검사 상의 (KMH)
//TODO - 경매를 등록할 때, userId는 로그인한 유저의 아이디로 변경하기 (KMH)
//TODO - 경매 수정시 이미지 제거시 버켓 이미지 삭제 (KMH)
//TODO - 잘못된 auction_id가 전달된 경우도 대처하기 (KMH)
//TODO - address_id도 경매 등록한 user_id의 기본 배송지를 삽입 (KMH)

'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Calendar } from '@repo/ui/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { cn } from '@repo/ui/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { addHours, format, set } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TZDate } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { FaCalendarAlt } from 'react-icons/fa';
import { getAuction } from 'src/entities/auction/api';
import { uploadImage } from 'src/entities/auction/supabase';
import ImageUploader from 'src/features/auction/ImageUploader';
import PageContainer from 'src/shared/ui/PageContainer';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import type { AuctionRow } from 'src/shared/supabase/types';

const AuctionForm = ({ auctionIdParam }: { auctionIdParam: string | undefined }) => {
  const isEditing: boolean = Boolean(auctionIdParam);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(isEditing);

  const [previewImages, setPreviewImages] = useState<{ id: string; data: string; isUrl: boolean }[]>([]);
  const router = useRouter();

  const loggedInUserId = 'b021a550-5857-4330-9b0e-ed53ac81c8d6'; //FIXME - 로그인한 정보를 가져오는 함수로 대체하기 (KMH)

  console.log('auction_id', auctionIdParam);

  //FIXME - 분리하기 (KMH)
  //FIXME - fetchedAuction 타입 명확하게 작성하기 (KMH)
  const {
    data: fetchedAuction,
    isLoading: isAuctionFetching,
    isError: isAuctionFetchingError
  } = useQuery({
    queryKey: ['auctionForm', auctionIdParam],
    queryFn: (): Promise<AuctionRow> => getAuction(auctionIdParam),
    enabled: !!auctionIdParam
  });

  //FIXME - fetchedAuction 타입 명확하게 작성하기 (KMH)
  //FIXME - 경매 리스트의 쿼리 키에 따라서 쿼리 키 수정하기 (KMH)
  const {
    data: fetchedAddressID,
    isLoading: isAddressIDFetching,
    isError: isAddressIDFetchingError
  } = useQuery({
    queryKey: ['addressId', loggedInUserId],
    queryFn: (): Promise<{ address_id: string }> => getAuction(auctionIdParam),
    enabled: !!auctionIdParam
  });
  console.log('fetchedAddressID', fetchedAddressID);
  console.log('fetchedAuction', fetchedAuction);

  //FIXME - schema로 분리 (KMH)
  //FIXME - 스키마 제한 글자 숫자 리터럴 상수화 하기 (KMH)
  const formSchema = z.object({
    title: z
      .string()
      .min(5, {
        message: '경매 제목은 최소 5글자가 되어야 합니다.'
      })
      .max(50, {
        message: '경매 제목은 최대 50글자가 되어야 합니다.'
      }),
    description: z.string().min(5, { message: '상세 내용은 최소 5글자가 되어야 합니다.' }).max(500, {
      message: '상세 내용은 최대 500자가 되어야 합니다.'
    }),
    endDay: z.date({ message: '경매 종료일을 입력해야 합니다.' }),
    endTime: z.string().min(8, { message: '경매 종료 시각을 입력해야 합니다.' }),
    startingPoint: z.string().refine((value) => Number(value) > 0, { message: '최소 포인트는 0보다 커야 합니다.' }),
    maxPoint: z.string().refine((value) => Number(value) > 0, { message: '최대 포인트는 0보다 커야 합니다.' })
  });

  //FIXME - 날짜, 시간 기능 함수로 분리하기 (KMH)
  //FIXME - 24 매직 넘버 수정 (KMH)
  const getFormDefaultValues = useMemo(() => {
    if (!isEditing || !fetchedAuction) {
      const today = new Date();
      const korToday = new TZDate(today, 'Asia/Seoul');
      const endDay = addHours(korToday, 24);
      const endTime = format(endDay, 'HH:mm:ss');

      return {
        title: '',
        description: '',
        endDay,
        endTime,
        startingPoint: '0',
        maxPoint: '0'
      };
    }

    const {
      title,
      description,
      end_date: endDate,
      starting_point: startingPoint,
      max_point: maxPoint
    } = fetchedAuction;

    const endDay = new TZDate(endDate, 'Asia/Seoul');
    const endTime = format(endDay, 'HH:mm:ss');

    return {
      title,
      description,
      endDay,
      endTime,
      startingPoint: String(startingPoint),
      maxPoint: String(maxPoint)
    };
  }, [fetchedAuction, isEditing]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormDefaultValues
  });

  useEffect(() => {
    const imageUrls = fetchedAuction?.image_urls;

    if (imageUrls) {
      setPreviewImages(imageUrls.map((imageUrl: string) => ({ id: uuidv4(), data: imageUrl, isUrl: true })));
    }

    if (isFormLoading) {
      setIsFormLoading(false);
    }
  }, [fetchedAuction?.image_urls, isFormLoading]);

  //FIXME - uploadImage 리팩토링 (KMH)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, description, endDay, endTime, startingPoint, maxPoint } = values;

    //FIXME - 타임존을 바꾸는 함수 만들어서 분리하기 (KMH)
    const korEndTime = endTime.split(':');
    const korEndDate = set(endDay, {
      hours: Number(korEndTime[0]),
      minutes: Number(korEndTime[1]),
      seconds: Number(korEndTime[2])
    });
    const utcEndDate = new TZDate(korEndDate, 'utc');

    const auctionId = uuidv4();

    let imageUrls: string[] = [];

    try {
      const imageUploadPromise = previewImages.map(async (prevImage): Promise<string> => {
        if (!prevImage.isUrl) {
          const data = await uploadImage(prevImage.data);
          return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
        }
        return prevImage.data;
      });

      imageUrls = await Promise.all(imageUploadPromise);
      console.log('image url', imageUrls);
    } catch (error) {
      //FIXME - 토스로 알림하고 에러 처리하기 (KMH)
      console.log(error);
    }

    //FIXME - POST하는 fetch 메서드 tanstack query로 만들어서 분리하기 (KMH)
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/auctions`;
    console.log('로그인한 유저 id', loggedInUserId);
    const data = await fetch(fetchUrl, {
      method: isEditing ? 'PATCH' : 'POST',
      body: JSON.stringify({
        auction_id: isEditing ? auctionIdParam : auctionId,
        user_id: loggedInUserId,
        title,
        description,
        end_date: utcEndDate,
        starting_point: startingPoint,
        current_point: isEditing ? fetchedAuction?.current_point || 0 : 0, //FIXME - auction_id 쿼리 스트링이 잘못될 경우 고려하기 (KMH)
        max_point: maxPoint,
        image_urls: imageUrls,
        status: isEditing ? fetchedAuction?.status || 'OPEN' : 'OPEN', //FIXME - auction_id 쿼리 스트링이 잘못될 경우 고려하기
        updated_at: isEditing ? new TZDate(new Date(), 'utc') : null
      })
    });
    const result = await data.json();

    console.log(values);
    console.log('결과', result);
    console.log('옥션아이디', auctionId);
    if (isEditing) {
      //FIXME - 테스트 끝나면 주석 제거하기 (KMH)
      // router.push(`/auctions/${auctionIdParam}`);
    } else {
      //FIXME - 테스트 끝나면 주석 제거하기 (KMH)
      // router.push(`/auctions/${auctionId}`);
    }
  };

  //FIXME - toss로 에러를 알리고, 에러 처리하기 (KMH)
  if (isAuctionFetchingError || isAddressIDFetchingError) {
    return <p>에러 발생</p>;
  }

  //FIXME - 스켈레톤 UI 사용 (KMH)
  if (isFormLoading || isAuctionFetching || isAddressIDFetching) {
    return <p>Loading...</p>;
  }

  //FIXME - UI 수정하기 (KMH)
  return (
    <>
      <PageContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    제목<span className="text-(--color-red)">&#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-white" placeholder="경매 상품의 제목을 입력하세요." {...field} />
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
                  <FormLabel>
                    상세 내용 <span className="text-(--color-red)">&#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none bg-white"
                      rows={5}
                      placeholder="상품에 대한 자세한 설명을 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full gap-2">
              <FormField
                control={form.control}
                name="endDay"
                render={({ field }) => (
                  <FormItem className="flex w-1/2 flex-col">
                    <FormLabel>
                      경매 종료일<span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <FaCalendarAlt className="text-(--color-accent) h-4 w-4 opacity-50" />
                            {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) => {
                          //   const startDate = new TZDate(form.getValues('startDay'), 'Asia/Seoul');
                          //   const compareEndDate = compareAsc(date, startDate);

                          //   return compareEndDate === -1;
                          // }}
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
                  <FormItem className="w-1/2">
                    <FormLabel>
                      경매 종료 시간<span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="bg-white" type="time" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="startingPoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    경매 시작 포인트 <span className="text-(--color-red)"> &#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="number"
                      placeholder="경매의 시작 포인트를 입력하세요."
                      {...field}
                    />
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
                  <FormLabel>
                    경매 상한 포인트 <span className="text-(--color-red)"> &#42;</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="number"
                      placeholder="경매의 상한 포인트를 입력하세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel>상품 이미지</FormLabel>
            <ImageUploader onPreviewImages={setPreviewImages} />

            <Button type="submit" className="h-12 w-full" variant="base">
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
                    className="absolute left-72 top-1"
                  >
                    X
                  </Button>
                  <Image alt={'img'} src={previewImage.data} width={300} height={300} />
                </li>
              );
            })}
        </ul>
      </PageContainer>
    </>
  );
};

export default AuctionForm;
