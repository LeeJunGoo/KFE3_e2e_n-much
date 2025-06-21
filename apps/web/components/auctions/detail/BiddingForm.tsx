import { Button } from '@repo/ui/components/ui/button';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { formatNumber } from 'utils/formatNumber';

export const BiddingForm = ({
  auction_id,
  user_id,
  currentBid,
  userPoints
}: {
  auction_id: string;
  user_id: string;
  currentBid: number;
  userPoints: number;
}) => {
  const [bidPoint, setBidPoint] = useState('');
  const handleBidSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // bidAmount가 userPoints보다 낮은지 등 유효성 검사
      if (Number(bidPoint) > userPoints) {
        alert(`현재 보유중인 포인트는 ${userPoints} 입니다.`);
        return;
      }

      alert(`${formatNumber(Number(bidPoint))}P 입찰을 시도합니다.`);

      const res = await fetch('http://localhost:3001/api/episodes', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          auction_id,
          user_id,
          bid_point: bidPoint
        })
      });

      if (!res.ok) {
        if (res.status === 404) return notFound;
        throw new Error('입찰하는 과정에서 네트워크 통신 에러가 발생했습니다.' + res.status);
      }

      const data = await res.json();

      if (data.status === 'success') {
        alert('입찰을 성공하셨습니다.');
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('DB 에러 발생' + error.message);
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');
    setBidPoint(numericValue);
  };

  return (
    <form className="space-y-4" onSubmit={handleBidSubmit}>
      <h3 className="text-lg font-bold">입찰하기</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">현재 사연 입찰가</span>
          <span className=" font-semibold text-[#8E74F2]">{formatNumber(currentBid)}&nbsp;P</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">내보유 포인트</span>
          <span className="font-semibold">{formatNumber(userPoints)}&nbsp;P</span>
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
            value={bidPoint}
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
