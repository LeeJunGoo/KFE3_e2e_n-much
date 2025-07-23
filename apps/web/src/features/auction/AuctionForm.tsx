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
import { cn } from '@repo/ui/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TZDate } from 'react-day-picker';
import { useForm, useWatch } from 'react-hook-form';
import { FaCalendarAlt } from 'react-icons/fa';
import {
  BUCKET_FOLDER_NAME,
  MAX_DESCRIPTION_LETTERS,
  MAX_TITLE_LETTERS,
  MIN_MAX_POINT_NUM,
  MIN_STARTING_POINT_NUM,
  UTC_TIME_ZONE
} from 'src/entities/auction/constants';
import { useGetAddressIdQuery } from 'src/entities/auction/queries/address';
import { useGetAuctionQuery, usePatchAuctionQuery, usePostAuctionQuery } from 'src/entities/auction/queries/auction';
import { auctionFormSchema } from 'src/entities/auction/schema/auctionForm';
import { deleteImages, uploadImageToBucket } from 'src/entities/auction/supabase';
import ImageUploader from 'src/features/auction/ImageUploader';
import FormDescription from 'src/shared/ui/FormDescription';
import FormTitle from 'src/shared/ui/FormTitle';
import PageContainer from 'src/shared/ui/PageContainer';
import {
  convertFromKorToUtcDate,
  convertFromUtcToKorDate,
  getNowKorDate,
  getTime,
  getTomorrowDate,
  setTimeToDate
} from 'src/shared/utils/dateFns';
import { v4 as uuidv4 } from 'uuid';
import type { AuctionFormProps, AuctionFormType, PreviewImage } from 'src/entities/auction/types';
import type { z } from 'zod';

const AuctionForm = ({ auctionIdParam, loggedInUserId }: AuctionFormProps) => {
  const isEditing: boolean = Boolean(auctionIdParam);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(isEditing);

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [imageUrlsToDelete, setImageUrlsToDelete] = useState<string[]>([]);
  const router = useRouter();

  console.log('로그인한 유저 id', loggedInUserId);
  console.log('auctionIdParam', auctionIdParam);

  const { fetchedAuction, isAuctionFetching, isAuctionFetchingError, fetchingAuctionError } =
    useGetAuctionQuery(auctionIdParam);
  const { fetchedAddressId, isAddressIdFetching, isAddressIdFetchingError, fetchingAddressIdError } =
    useGetAddressIdQuery(loggedInUserId);

  console.log('fetchedAddressID', fetchedAddressId);
  console.log('fetchedAuction', fetchedAuction);

  const { mutatePostAuction, isPostAuctionPending } = usePostAuctionQuery(auctionIdParam);
  const { mutatePatchAuction, isPatchAuctionPending } = usePatchAuctionQuery(auctionIdParam);

  //TODO - 어디에 배치할지 의논하기 (KMH)
  const validateDate = (day: Date | null, time: string | null, isDisableCondition: boolean) => {
    const formEndDay = day || form.getValues('endDay');
    const formEndTime = time || form.getValues('endTime');
    const formDate = setTimeToDate(formEndDay, formEndTime);
    const korNow = getNowKorDate();

    return isDisableCondition ? formDate < korNow : formDate > korNow;
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

  const form = useForm<AuctionFormType>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues: getFormDefaultValues()
  });

  const endTimeValue = useWatch({
    control: form.control,
    name: 'endTime'
  });

  useEffect(() => {
    form.trigger('endDay');
    form.trigger('endTime');
  }, [form, endTimeValue]);

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

  const onSubmit = async (values: z.infer<typeof auctionFormSchema>) => {
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

        const data = await mutatePostAuction(postAuctionParam);
        console.log(values);
        console.log('결과', data);
        console.log('옥션아이디', data.auction_id);

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
        updated_at: new TZDate(new Date(), UTC_TIME_ZONE).toISOString()
      };

      const data = await mutatePatchAuction({ auctionIdParam, patchAuctionParam });

      console.log(values);
      console.log('결과', data);
      console.log('옥션아이디', data.auction_id);
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

  //TODO - error가 발생하면 대처가 불가능, 화면을 어떡해 보여줄지 의논하기 (KMH)
  if (isAuctionFetchingError || isAddressIdFetchingError) {
    console.error('fetchingAuctionError', fetchingAuctionError);
    console.error('fetchingAddressIdError', fetchingAddressIdError);
    return <p>에러 발생</p>;
  }

  //FIXME - 스켈레톤 UI 사용 (KMH)
  //TODO - 서영님한테 물어보기 (KMH)
  if (isFormLoading || isAuctionFetching || isAddressIdFetching) {
    return <p>Loading...</p>;
  }

  //TODO - 준구님이랑 의논해서 공통 컴포넌트로 분리하기 (KMH)
  return (
    <>
      <PageContainer>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormTitle
              control={form.control}
              name={'title'}
              titleLabel={'제목'}
              placeholder="경매 상품의 제목을 입력하세요."
              maxTitleLength={MAX_TITLE_LETTERS}
            />
            <FormDescription
              control={form.control}
              name="description"
              descriptionLabel="상세 내용"
              placeholder="상품에 대한 자세한 설명을 입력하세요."
              maxDescLength={MAX_DESCRIPTION_LETTERS}
            />
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
                          disabled={(day) => validateDate(day, null, true)}
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
            <ImageUploader previewImages={previewImages} setPreviewImages={setPreviewImages} />
            <Button type="submit" className="h-12 w-full" variant="base">
              {(isEditing && !isPatchAuctionPending && '수정하기') ||
                (isEditing && isPatchAuctionPending && '수정중...') ||
                (!isEditing && !isPostAuctionPending && '등록하기') ||
                (!isEditing && isPostAuctionPending && '등록중...')}
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
                            const imagePath = BUCKET_FOLDER_NAME + imageFullPath[imageFullPath.length - 1];
                            console.log('imageDir', imagePath);
                            console.log('imagesToDelete', [...prev, imagePath]);
                            return [...prev, imagePath];
                          });
                        }
                      }}
                      className="absolute right-1 top-1"
                      variant="base"
                    >
                      &times;
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
