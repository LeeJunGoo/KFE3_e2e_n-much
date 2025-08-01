'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/ui/button';
import { Form, FormLabel } from '@repo/ui/components/ui/form';
import { useRouter } from 'next/navigation';
import { TZDate } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { MAX_DESCRIPTION_LETTERS, MAX_TITLE_LETTERS, UTC_TIME_ZONE } from 'src/entities/auction/constants';
import { useTriggerCrossFields } from 'src/entities/auction/hooks/useTriggerCrossFields';
import { useAuctionQuery, usePatchAuctionQuery, usePostAuctionQuery } from 'src/entities/auction/queries/auction';
import { auctionFormSchema } from 'src/entities/auction/schema/auctionForm';
import { deleteImages } from 'src/entities/auction/supabase';
import { getExtension } from 'src/entities/auction/utils/extension';
import { getFormDefaultValues } from 'src/entities/auction/utils/formDefaultValues';
import { uploadImagesToDB } from 'src/entities/auction/utils/uploadImages';
import { validateDate } from 'src/entities/auction/utils/validateDate';
import FormEndDay from 'src/features/auction/form/components/fields/FormEndDay';
import FormEndTime from 'src/features/auction/form/components/fields/FormEndTime';
import FormMaxPoint from 'src/features/auction/form/components/fields/FormMaxPoint';
import FormStartingPoint from 'src/features/auction/form/components/fields/FormStartingPoint';
import ImageUploader from 'src/features/auction/form/components/ImageUploader';
import ErrorState from 'src/shared/ui/ErrorState';
import FormDescription from 'src/shared/ui/FormDescription';
import FormTitle from 'src/shared/ui/FormTitle';
import { LoadingSpinner } from 'src/shared/ui/LoadingSpinner';
import PageContainer from 'src/shared/ui/PageContainer';
import {
  convertFromKorToUtcDate,
  convertFromUtcToKorDate,
  getTime,
  setTimeToDate
} from 'src/shared/utils/formatWithTimeZone';
import { popToast } from 'src/shared/utils/popToast';
import { v4 as uuidv4 } from 'uuid';
import type { AuctionFormProps, AuctionFormType, PreviewImage } from 'src/entities/auction/types';

const AuctionForm = ({ auctionIdParam, loggedInUserId, loggedInAddressId }: AuctionFormProps) => {
  const isEditing: boolean = !!auctionIdParam;
  const [isFormLoading, setIsFormLoading] = useState<boolean>(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [imageUrlsToDelete, setImageUrlsToDelete] = useState<string[]>([]);
  const { push } = useRouter();

  console.log('로그인한 유저 id', loggedInUserId);
  console.log('auctionIdParam', auctionIdParam);

  const { fetchedAuction, isAuctionFetching, isAuctionFetchingError, fetchingAuctionError } =
    useAuctionQuery(auctionIdParam);
  // const { fetchedAddressId, isAddressIdFetching, isAddressIdFetchingError, fetchingAddressIdError } =
  // useGetAddressIdQuery(loggedInUserId);

  // console.log('fetchedAddressID', fetchedAddressId);
  console.log('로그인한 주소 id', loggedInAddressId);
  console.log('fetchedAuction', fetchedAuction);

  const { mutatePostAuction, isPostAuctionPending } = usePostAuctionQuery(auctionIdParam);
  const { mutatePatchAuction, isPatchAuctionPending } = usePatchAuctionQuery(auctionIdParam);

  const form = useForm<AuctionFormType>({
    resolver: zodResolver(auctionFormSchema),
    defaultValues: getFormDefaultValues(),
    mode: 'onChange'
  });

  useTriggerCrossFields({
    control: form.control,
    fieldA: 'endDay',
    fieldB: 'endTime',
    trigger: form.trigger
  });

  useTriggerCrossFields({
    control: form.control,
    fieldA: 'startingPoint',
    fieldB: 'maxPoint',
    trigger: form.trigger
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
        setPreviewImages(
          imageUrls.map((imageUrl: string) => {
            const ext = getExtension(imageUrl);
            return { id: uuidv4(), data: imageUrl, isUrl: true, ext };
          })
        );
      }

      if (isFormLoading) {
        setIsFormLoading(false);
      }
    }
  }, [fetchedAuction, isEditing, form, isFormLoading]);

  //TODO - toast 안내문 등록과 수정일 때 분리해서 알리기 (KMH)
  //TODO - 등록하기와 수정하기가 완료되어서 디테일 페이지로 넘어갈 때, 버튼 텍스트를 등록/수정 완료라고 표시하기 (KMH)
  const onSubmit = async (values: AuctionFormType) => {
    setIsSubmitting(true);
    const { title, description, endDay, endTime, startingPoint, maxPoint } = values;

    const korEndDate = setTimeToDate(endDay, endTime);
    const utcEndDate = convertFromKorToUtcDate(korEndDate);

    let imageUrls: string[] = [];

    try {
      imageUrls = await uploadImagesToDB(previewImages);
      console.log('image url', imageUrls);
    } catch (error) {
      popToast('error', '경매 등록/수정 에러', '이미지를 업로드하는데 실패했습니다.', 'long');
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    console.log('imageUrlsToDelete', imageUrlsToDelete);

    try {
      await deleteImages(imageUrlsToDelete);
    } catch (error) {
      popToast('error', '경매 등록/수정 에러', '이미지를 삭제하는데 실패했습니다.', 'long');
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    // if (!fetchedAddressId) {
    if (!loggedInAddressId) {
      popToast('error', '경매 등록/수정 에러', '주소를 불러오는데 실패했습니다.', 'long');
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
        // address_id: fetchedAddressId
        address_id: loggedInAddressId
      };
      try {
        const data = await mutatePostAuction(postAuctionParam);
        console.log(values);
        console.log('결과', data);
        console.log('옥션아이디', data.auction_id);
        //TODO - data가 있을 경우(등록이 성공한 경우)만 push하도록 수정하기 (KMH)
        push(`/auctions/${data.auction_id}`);

        return;
      } catch (error) {
        popToast('error', '경매 등록 에러', '경매 등록에 실패했습니다.', 'long');
        console.error(error);
        setIsSubmitting(false);
        return;
      }
    }

    if (!fetchedAuction) {
      popToast('error', '경매 수정 에러', '경매 정보를 불러오는데 실패했습니다.', 'long');
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
      // address_id: fetchedAddressId,
      address_id: loggedInAddressId,
      updated_at: new TZDate(new Date(), UTC_TIME_ZONE).toISOString()
    };
    try {
      const data = await mutatePatchAuction({ auctionIdParam, patchAuctionParam });
      console.log(values);
      console.log('결과', data);
      console.log('옥션아이디', data.auction_id);

      push(`/auctions/${data.auction_id}`);
    } catch (error) {
      popToast('error', '경매 수정 에러', '경매 수정에 실패했습니다.', 'long');
      setIsSubmitting(false);
      console.error(error);
      setIsSubmitting(false);
      return;
    }
  };

  // if (isAuctionFetchingError || isAddressIdFetchingError) {
  if (isAuctionFetchingError) {
    console.error('fetchingAuctionError', fetchingAuctionError);
    // console.error('fetchingAddressIdError', fetchingAddressIdError);
    return (
      <PageContainer>
        <ErrorState />
      </PageContainer>
    );
  }
  //TODO - 로딩 스패너 넣기 (KMH)
  //TODO - 나중에 시간되면 스켈레톤 넣기 (KMH)
  // if (isFormLoading || isAuctionFetching || isAddressIdFetching) {
  if (isFormLoading || isAuctionFetching) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

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
              <FormEndDay
                control={form.control}
                name="endDay"
                endDayLabel="경매 종료일"
                placeholder="경매 종료일을 선택하세요."
                endTime={form.getValues('endTime') as string}
                validateDisableDate={validateDate}
              />
              <FormEndTime control={form.control} name="endTime" endTimeLabel="경매 종료 시간" />
            </div>
            <FormStartingPoint
              control={form.control}
              name="startingPoint"
              startingPointLabel="경매 시작 포인트"
              placeholder="경매의 시작 포인트를 입력하세요."
            />
            <FormMaxPoint
              control={form.control}
              name="maxPoint"
              maxPointLabel="경매 상한 포인트"
              placeholder="경매의 상한 포인트를 입력하세요."
            />
            <FormLabel>상품 이미지</FormLabel>
            <ImageUploader
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
              setImageUrlsToDelete={setImageUrlsToDelete}
            />
            <Button type="submit" className="h-12 w-full" variant="base" disabled={isSubmitting}>
              {(isEditing && !isPatchAuctionPending && '수정하기') ||
                (isEditing && isPatchAuctionPending && '수정중...') ||
                (!isEditing && !isPostAuctionPending && '등록하기') ||
                (!isEditing && isPostAuctionPending && '등록중...')}
            </Button>
          </form>
        </Form>
      </PageContainer>
    </>
  );
};

export default AuctionForm;
