import { formatNumber } from '@repo/ui/utils/formatNumber';
import { useState } from 'react';
import { Button } from '../ui/button';

export const BiddingForm = ({ currentBid, userPoints }: { currentBid: number; userPoints: number }) => {
  const [bidAmount, setBidAmount] = useState('');

  const handleBidSubmit = () => {
    // bidAmount가 userPoints보다 낮은지 등 유효성 검사
    if (Number(bidAmount) > userPoints) {
      alert(`현재 보유중인 포인트는 ${userPoints} 입니다.`);
      return;
    }

    alert(`${formatNumber(Number(bidAmount))}P 입찰을 시도합니다.`);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setBidAmount(numericValue);
  };

  return (
    <form className="space-y-4" onSubmit={handleBidSubmit}>
      <h3 className="text-lg font-bold">입찰하기</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">현재 입찰가</span>
          <span className="font-semibold text-[#8E74F2]">{formatNumber(currentBid)}P</span>
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
        <div>
          <input
            id="bid-amount"
            type="text"
            placeholder="5,000"
            value={bidAmount}
            onChange={handleAmountChange}
            required
            className="w-full pr-8"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#8E74F9] hover:bg-[#3f3562]">
        입찰하기
      </Button>
    </form>
  );
};
