// components/BiddingForm.jsx (새 파일)

import React, { useState } from 'react';
import { Button } from '../ui/button';

// 숫자 포맷팅 함수 (예: 10000 -> 10,000)
const formatNumber = (num: any) => {
  return new Intl.NumberFormat('ko-KR').format(num);
};

export const BiddingForm = ({ currentBid, userPoints }: { currentBid: any; userPoints: any }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBidSubmit = () => {
    // TODO: 실제 입찰 처리 로직 구현
    // 예: bidAmount가 userPoints보다 낮은지, currentBid보다 높은지 등 유효성 검사
    alert(`${formatNumber(bidAmount)}P 입찰을 시도합니다.`);
  };

  return (
    <div className="w-full space-y-4 rounded-lg border bg-slate-50 p-4">
      <h3 className="text-lg font-bold">입찰하기</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">현재 입찰가</span>
          <span className="font-semibold text-purple-600">{formatNumber(currentBid)}P</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">보유 포인트</span>
          <span className="font-semibold">{formatNumber(userPoints)}P</span>
        </div>
      </div>

      <div>
        <label htmlFor="bid-amount" className="mb-1.5 block text-sm font-medium text-gray-700">
          입찰 금액
        </label>
        <div className=" w-full">
          <input
            id="bid-amount"
            type="text"
            placeholder="5,000"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            className="pr-8" // 오른쪽 'P' 글자를 위한 패딩
          />
        </div>
      </div>

      <Button onClick={handleBidSubmit} className="w-full bg-purple-600 hover:bg-purple-700">
        입찰하기
      </Button>
    </div>
  );
};
