// 'use client';

// import { Button } from '@repo/ui/components/ui/button';
// import { Input } from '@repo/ui/components/ui/input';
// import { Form, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { toast } from '@repo/ui/components/ui/sonner';
// import { zodResolver } from '@hookform/resolvers/zod';

// import { fetchUpdateEpisodeBid } from 'src/entities/episode/api';
// import { formatNumber } from 'src/shared/utils/formatNumber';
// import type { EpisodeItemProps } from 'src/entities/episode/types';

// const getSchema = (minBid: number) =>
//   z.object({
//     bidAmount: z
//       .string()
//       .min(1, '입찰 금액을 입력해주세요.')
//       .transform((val) => parseInt(val, 10))
//       .refine((val) => !isNaN(val) && val > minBid, `입찰가는 ${minBid + 1}P 이상이어야 합니다.`)
//   });

// type Props = {
//   episode: EpisodeItemProps;
//   onClose: () => void;
// };

// const schema = getSchema(100);
// type FormValues = z.infer<typeof schema>;

// const EpisodeBidModalForm = ({ episode, onClose }: Props) => {
//   const userInfo = { point: 10000 }; // TODO: 유저 상태 연동
//   const form = useForm<FormValues>({
//     //FIXME - 현재 입찰 포인트
//     // resolver: zodResolver(getSchema(episode.bid_point)),
//     resolver: zodResolver(schema),
//     defaultValues: {
//       bidAmount: 0
//     }
//   });
//   const form = useForm<FormValues>({
//   resolver: zodResolver(schema),
//   defaultValues: {
//     bidAmount: 0
//   }
// });

//   const { handleSubmit, reset } = form;

//   const onSubmit = async ({ bidAmount }: { bidAmount: number }) => {
//     if (bidAmount > userInfo.point) {
//       toast.error('보유 포인트가 부족합니다.');
//       return;
//     }

//     try {
//       //FIXME - 현재 입찰 포인트
//       //   const totalBid = episode.bid_point + bidAmount;
//       const totalBid = 0 + bidAmount;
//       toast.loading(`${formatNumber(bidAmount)}P를 추가 입찰하여 총 ${formatNumber(totalBid)}P로 입찰을 시도합니다.`);

//       //FIXME - 에피소드 입찰
//       //   const result = await fetchUpdateEpisodeBid(episode.auction_id, episode.episode_id, bidAmount);

//       const result = false;
//       if (result) {
//         toast.success('입찰을 성공하셨습니다.');
//         window.location.reload();
//       }
//     } catch {
//       toast.error('입찰에 실패했습니다. 다시 시도해주세요.');
//     } finally {
//       onClose();
//       reset();
//     }
//   };

//   return (
//     <>
//       <div className="mb-5 text-center">
//         <p className="text-muted mb-1 text-sm">현재 보유 포인트</p>
//         <p className="text-xl font-bold">{formatNumber(userInfo.point)} P</p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-5 text-center">
//             <p className="text-(--color-warm-gray) mb-1 text-sm">현재 보유 포인트</p>
//             <p className="text-(--color-text-base) text-xl font-bold">{userInfo.point} P</p>
//           </div>
//           <div className="mb-5">
//             <p className="text-(--color-accent) mb-2 text-sm">현재 최고 입찰가: {formatNumber(200)} P</p>
//             <FormField
//               control={form.control}
//               name="bidAmount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>입찰 금액</FormLabel>
//                   <Input
//                     type="number"
//                     //FIXME - 에피소드 현재 입찰가
//                     placeholder={`${100 + 1}P 이상 입찰 금액을 입력하세요`}
//                     //FIXME - 에피소드 현재 입찰가
//                     //   min={episode.bid_point + 1}
//                     {...field}
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="flex space-x-3">
//             <Button
//               className="!rounded-button bg-(--color-secondary) text-(--color-text-base) hover:bg-(--color-warm-gray) flex-1"
//               onClick={onClose}
//               type="button"
//             >
//               취소
//             </Button>
//             <Button
//               className="!rounded-button bg-(--color-accent) hover:bg-(--color-primary) flex-1 text-white"
//               type="submit"
//             >
//               입찰하기
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </>
//   );
// };

// export default EpisodeBidModalForm;

import React from 'react';

const EpisodeBidModalForm = () => {
  return <div>EpisodeBidModalForm</div>;
};

export default EpisodeBidModalForm;
