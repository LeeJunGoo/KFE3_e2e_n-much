// 'use client';

// import { Button } from '@repo/ui/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@repo/ui/components/ui/dialog';
// import { Input } from '@repo/ui/components/ui/input';
// import React, { useState } from 'react';

// const AuctionBidModal = ({ auction_id, currentBid }) => {
//   const [showBidModal, setShowBidModal] = useState<boolean>(false);
//   const [bidAmount, setBidAmount] = useState<string>('');

//   // 입찰 처리
//   const handleBid = () => {
//     if (!bidAmount) return;
//     const amount = parseInt(bidAmount);
//     if (isNaN(amount) || amount <= currentBid) {
//       alert('현재 입찰가보다 높은 금액을 입력해주세요.');
//       return;
//     }
//     if (amount > auctionData.userPoints) {
//       alert('보유 포인트가 부족합니다.');
//       return;
//     }
//     // 여기에 입찰 처리 로직 추가
//     alert(`${amount.toLocaleString()}포인트로 입찰이 완료되었습니다.`);
//     setShowBidModal(false);
//   };

//   return (
//     <Dialog open={showBidModal} onOpenChange={setShowBidModal}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="mb-4 text-center text-lg font-bold">입찰하기</DialogTitle>
//         </DialogHeader>
//         <div className="py-4">
//           <div className="mb-5 text-center">
//             <p className="mb-1 text-sm text-[#B8B8B8]">현재 보유 포인트</p>
//             <p className="text-xl font-bold text-[#1F1F25]">{auctionData.userPoints.toLocaleString()} P</p>
//           </div>
//           <div className="mb-5">
//             <p className="mb-2 text-sm text-[#B8B8B8]">현재 최고 입찰가: {auctionData.currentBid.toLocaleString()} P</p>
//             <Input
//               type="number"
//               placeholder="입찰 금액을 입력하세요"
//               className="w-full border-[#C6C7D1] focus:border-[#5B80C2] focus:ring-[#5B80C2]"
//               value={bidAmount}
//               onChange={(e) => setBidAmount(e.target.value)}
//               min={auctionData.currentBid + 1}
//               max={auctionData.userPoints}
//             />
//             <p className="mt-1 text-xs text-[#5B80C2]">* 현재 입찰가보다 높은 금액을 입력해주세요</p>
//           </div>
//           <div className="flex space-x-3">
//             <Button
//               variant="base"
//               className="!rounded-button flex-1 bg-[#EEF2FB] text-[#1F1F25] hover:bg-[#C6C7D1]"
//               onClick={() => setShowBidModal(false)}
//             >
//               취소
//             </Button>
//             <Button className="!rounded-button flex-1 bg-[#5B80C2] text-white hover:bg-[#4A6DA8]" onClick={handleBid}>
//               입찰하기
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AuctionBidModal;
