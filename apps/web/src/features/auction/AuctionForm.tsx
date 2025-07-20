//TODO - 폼 유효성 검사 상의 (KMH)
//TODO - 서영님한테 이미지와 버튼 css 물어보기 (KMH)
'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Calendar } from '@repo/ui/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/components/ui/popover';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { cn } from '@repo/ui/lib/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addHours, format, set } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TZDate } from 'react-day-picker';
import { useForm, useWatch } from 'react-hook-form';
import { FaCalendarAlt } from 'react-icons/fa';
import { getAddressId, getAuction, patchAuction, postAuction } from 'src/entities/auction/api';
import { deleteImages, uploadImageToBucket } from 'src/entities/auction/supabase';
import ImageUploader from 'src/features/auction/ImageUploader';
import PageContainer from 'src/shared/ui/PageContainer';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import type { AddressRow, AuctionRow } from 'src/shared/supabase/types';

//TODO - 분리하기 (KMH)
interface AuctionFormProps {
  auctionIdParam: string | undefined;
  loggedInUserId: string;
}

//TODO - 분리하기 (KMH)
type AddressId = Pick<AddressRow, 'address_id'>;

//TODO - 분리하기 (KMH)
type FetchedAuction = Pick<
  AuctionRow,
  'title' | 'description' | 'end_date' | 'starting_point' | 'current_point' | 'max_point' | 'image_urls' | 'status'
>;

//TODO - 분리하기 (KMH)
interface PreviewImage {
  id: string;
  data: string;
  isUrl: boolean;
}

//TODO - 분리하기 (KMH)
const auctionFormKeys = {
  all: ['auctionForm'] as const,
  item: (auctionId: string) => [...auctionFormKeys.all, auctionId] as const
};

//TODO - 분리하기 (KMH)
const addressIdKeys = {
  all: ['addressId'] as const,
  item: (userId: string) => [...auctionFormKeys.all, userId] as const
};

const MIN_TITLE_LETTERS = 5;
const MAX_TITLE_LETTERS = 50;
const MIN_DESCRIPTION_LETTERS = 5;
const MAX_DESCRIPTION_LETTERS = 500;
const MIN_END_TIME_LETTERS = 1;
const MIN_STARTING_POINT_NUM = 0;
const MIN_MAX_POINT_NUM = 0;

const HOURS_OF_DAY = 24;

const AuctionForm = ({ auctionIdParam, loggedInUserId }: AuctionFormProps) => {
  const isEditing: boolean = Boolean(auctionIdParam);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(isEditing);

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [imageUrlsToDelete, setImageUrlsToDelete] = useState<string[]>([]);
  const router = useRouter();

  console.log('로그인한 유저 id', loggedInUserId);
  console.log('auctionIdParam', auctionIdParam);

  const queryClient = useQueryClient();

  //FIXME - 분리하기 (KMH)
  const {
    data: fetchedAuction,
    isLoading: isAuctionFetching,
    isError: isAuctionFetchingError,
    error: fetchingAuctionError
  } = useQuery({
    queryKey: auctionFormKeys.item(auctionIdParam!), //NOTE - enabled에서 이미 필터링함 (KMH)
    queryFn: (): Promise<FetchedAuction> => getAuction(auctionIdParam),
    enabled: !!auctionIdParam,
    staleTime: Infinity
  });

  //FIXME - 분리하기 (KMH)
  const {
    data: fetchedAddressId,
    isLoading: isAddressIdFetching,
    isError: isAddressIdFetchingError,
    error: fetchingAddressIdError
  } = useQuery({
    queryKey: addressIdKeys.item(loggedInUserId),
    queryFn: (): Promise<AddressId> => getAddressId(loggedInUserId),
    select: (data: AddressId) => data.address_id,
    enabled: !!loggedInUserId,
    staleTime: Infinity
  });

  console.log('fetchedAddressID', fetchedAddressId);
  console.log('fetchedAuction', fetchedAuction);

  //FIXME - schema로 분리 (KMH)
  const formSchema = z.object({
    title: z
      .string()
      .min(MIN_TITLE_LETTERS, {
        message: '경매 제목은 최소 5글자가 되어야 합니다.'
      })
      .max(MAX_TITLE_LETTERS, {
        message: '경매 제목은 최대 50글자가 되어야 합니다.'
      }),
    description: z
      .string()
      .min(MIN_DESCRIPTION_LETTERS, { message: '상세 내용은 최소 5글자가 되어야 합니다.' })
      .max(MAX_DESCRIPTION_LETTERS, {
        message: '상세 내용은 최대 500자가 되어야 합니다.'
      }),
    endDay: z.date({ message: '경매 종료일을 입력해야 합니다.' }),
    endTime: z.string().min(MIN_END_TIME_LETTERS, { message: '경매 종료 시각을 입력해야 합니다.' }),
    startingPoint: z
      .string()
      .refine((value) => Number(value) > MIN_STARTING_POINT_NUM, { message: '최소 포인트는 0보다 커야 합니다.' }),
    maxPoint: z
      .string()
      .refine((value) => Number(value) > MIN_MAX_POINT_NUM, { message: '최대 포인트는 0보다 커야 합니다.' })
  });

  //TODO - 분리하기 (KMH)
  const getNowKorDate = () => {
    const now = new Date();
    const korNow = new TZDate(now, 'Asia/Seoul');

    return korNow;
  };

  //TODO - 분리하기 (KMH)
  const getTomorrowDate = (date: Date) => {
    const tomorrowDate = addHours(date, HOURS_OF_DAY);
    return tomorrowDate;
  };

  //TODO - 분리하기 (KMH)
  const getTime = (date: Date) => {
    const time = format(date, 'HH:mm:ss');
    return time;
  };

  //TODO - 분리하기 (KMH)
  const convertFromUtcToKorDate = (date: string) => {
    const korDate = new TZDate(date, 'Asia/Seoul');
    return korDate;
  };

  //TODO - 분리하기 (KMH)
  const convertFromKorToUtcDate = (date: Date) => {
    const korDate = new TZDate(date, 'utc');
    return korDate;
  };

  //TODO - 분리하기 (KMH)
  const setTimeToDate = (date: Date, time: string) => {
    const splittedTime = time.split(':');
    const resultDate = set(date, {
      hours: Number(splittedTime[0]),
      minutes: Number(splittedTime[1]),
      seconds: Number(splittedTime[2])
    });

    return resultDate;
  };

  const getFormDefaultValues = () => {
    const korToday = getNowKorDate();
    const endDay = getTomorrowDate(korToday);
    const endTime = getTime(endDay);

    return {
      title: '',
      description: '',
      endDay,
      endTime,
      startingPoint: String(MIN_STARTING_POINT_NUM),
      maxPoint: String(MIN_MAX_POINT_NUM)
    };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormDefaultValues()
  });

  const titleValue = useWatch({
    control: form.control,
    name: 'title'
  });

  const descriptionValue = useWatch({
    control: form.control,
    name: 'description'
  });

  useEffect(() => {
    if (isEditing && fetchedAuction) {
      const {
        title,
        description,
        end_date: endDate,
        starting_point: startingPoint,
        max_point: maxPoint,
        image_urls: imageUrls
      } = fetchedAuction;

      const endDay = convertFromUtcToKorDate(endDate);
      const endTime = getTime(endDay);

      form.reset({
        title,
        description,
        endDay,
        endTime,
        startingPoint: String(startingPoint),
        maxPoint: String(maxPoint)
      });

      if (imageUrls) {
        setPreviewImages(imageUrls.map((imageUrl: string) => ({ id: uuidv4(), data: imageUrl, isUrl: true })));
      }

      if (isFormLoading) {
        setIsFormLoading(false);
      }
    }
  }, [fetchedAuction, isEditing, form, isFormLoading]);

  //TODO - 분리하기 (KMH)
  const uploadImagesToDB = async (previewImages: PreviewImage[]) => {
    if (previewImages.length === 0) {
      return [];
    }

    const imageUploadPromise = previewImages.map(async (prevImage): Promise<string> => {
      if (!prevImage.isUrl) {
        const data = await uploadImageToBucket(prevImage.data);
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
      }
      return prevImage.data;
    });

    const imageUrls = await Promise.all(imageUploadPromise);
    return imageUrls;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { title, description, endDay, endTime, startingPoint, maxPoint } = values;

    const korEndDate = setTimeToDate(endDay, endTime);
    const utcEndDate = convertFromKorToUtcDate(korEndDate);

    let imageUrls: string[] = [];

    try {
      imageUrls = await uploadImagesToDB(previewImages);
      console.log('image url', imageUrls);
    } catch (error) {
      //FIXME - 토스로 알림하고 에러 처리하기 (KMH)
      console.error(error);
    }

    console.log('imageUrlsToDelete', imageUrlsToDelete);

    try {
      await deleteImages(imageUrlsToDelete);
    } catch (error) {
      //FIXME - 토스로 알림하고 에러 처리하기 (KMH)
      console.error(error);
    }

    //FIXME - POST하는 fetch 메서드 tanstack query로 만들어서 분리하기 (KMH)
    try {
      if (!fetchedAddressId) {
        //TODO - toast로 처리 (KMH)
        throw new Error('주소를 불러오는데 실패했습니다.');
      }

      if (!isEditing) {
        const postAuctionParam = {
          user_id: loggedInUserId,
          title,
          description,
          end_date: utcEndDate.toISOString(),
          starting_point: Number(startingPoint),
          max_point: Number(maxPoint),
          image_urls: imageUrls,
          address_id: fetchedAddressId
        };

        const data = await postAuction(postAuctionParam);
        console.log(values);
        console.log('결과', data);
        console.log('옥션아이디', data.auction_id);

        queryClient.removeQueries({ queryKey: ['auctionForm', auctionIdParam] }); //TODO - mutate 안에 넣기 (KMH)

        //FIXME - 테스트 끝나면 주석 제거하기 (KMH)
        // router.push(`/auctions/${data.auction_id}`);
        return;
      }

      if (!fetchedAuction) {
        //TODO - toast로 처리 (KMH)
        throw new Error('경매를 불러오는데 실패했습니다.');
      }

      const patchAuctionParam = {
        auction_id: auctionIdParam,
        user_id: loggedInUserId,
        title,
        description,
        end_date: utcEndDate.toISOString(),
        starting_point: Number(startingPoint),
        current_point: Number(fetchedAuction.current_point),
        max_point: Number(maxPoint),
        image_urls: imageUrls,
        status: fetchedAuction.status,
        address_id: fetchedAddressId,
        updated_at: new TZDate(new Date(), 'utc').toISOString()
      };

      const data = await patchAuction(auctionIdParam, patchAuctionParam);

      console.log(values);
      console.log('결과', data);
      console.log('옥션아이디', data.auction_id);

      queryClient.removeQueries({ queryKey: ['auctionForm', auctionIdParam] }); //TODO - mutate 안에 넣기 (KMH)

      //FIXME - 테스트 끝나면 주석 제거하기 (KMH)
      // router.push(`/auctions/${newAuctionId}`);
    } catch (error) {
      console.error(error);
    }
    if (isEditing) {
      //FIXME - 테스트 끝나면 주석 제거하기 (KMH)
      // router.push(`/auctions/${data.auction_id}`);
    } else {
      //FIXME - 테스트 끝나면 주석 제거하기 (KMH)
      // router.push(`/auctions/${newAuctionId}`);
    }
  };

  //FIXME - toss로 에러를 알리고, 에러 처리하기 (KMH)
  if (isAuctionFetchingError || isAddressIdFetchingError) {
    console.error('fetchingAuctionError', fetchingAuctionError);
    console.error('fetchingAddressIdError', fetchingAddressIdError);
    return <p>에러 발생</p>;
  }

  //FIXME - 스켈레톤 UI 사용 (KMH)
  if (isFormLoading || isAuctionFetching || isAddressIdFetching) {
    return <p>Loading...</p>;
  }

  //FIXME - UI 수정하기 (KMH)
  //TODO - 공통 컴포넌트로 분리하기 (KMH)
  return (
    <>
      <PageContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="relative">
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
              <p className={`absolute right-0 top-0 text-xs font-semibold`}>
                {titleValue.length}/{MAX_TITLE_LETTERS}
              </p>
            </div>

            <div className="relative">
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
              <p className={`absolute right-0 top-0 text-xs font-semibold`}>
                {descriptionValue.length}/{MAX_DESCRIPTION_LETTERS}
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="endDay"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
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
                  <FormItem className="w-full">
                    <FormLabel>
                      경매 종료 시간<span className="text-(--color-red)">&#42;</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="h-9 bg-white" type="time" step="1" {...field} />
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
        <ul className="mt-4 grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          {previewImages &&
            previewImages.map((previewImage, index) => {
              return (
                <li key={previewImage.id} className="relative w-full">
                  <div className="h-80 w-full border-2 border-black md:w-80">
                    <Image
                      alt={`${index + 1}번 째 업로드할 경매 이미지 `}
                      src={previewImage.data}
                      className="object-contain"
                      priority
                      fill
                    />
                    <Button
                      onClick={() => {
                        setPreviewImages((prev) => prev.filter((image) => image.id !== previewImage.id));
                        if (previewImage.isUrl) {
                          setImageUrlsToDelete((prev) => {
                            const imageFullPath: string[] = previewImage.data.split('/');
                            const imagePath = 'images/' + imageFullPath[imageFullPath.length - 1];
                            console.log('imageDir', imagePath);
                            console.log('imagesToDelete', [...prev, imagePath]);
                            return [...prev, imagePath];
                          });
                        }
                      }}
                      className="absolute right-1 top-1"
                    >
                      X
                    </Button>
                  </div>
                </li>
              );
            })}
        </ul>
      </PageContainer>
    </>
  );
};

export default AuctionForm;
