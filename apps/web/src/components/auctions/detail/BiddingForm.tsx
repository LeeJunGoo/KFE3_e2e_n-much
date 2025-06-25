import { Button } from '@repo/ui/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { fetchUpdateEpisodeBid } from 'src/lib/queries/episodes';
import { formatNumber } from 'src/utils/formatNumber';

export const BiddingForm = ({
  auction_id,
  episode_id,
  currentBid,
  userPoint
}: {
  auction_id: string;
  episode_id: string;
  currentBid: number;
  userPoint: number;
}) => {
  const [bidPoint, setBidPoint] = useState('');
  const [pointCheck, setPointCheck] = useState('');

  const inputValue = formatNumber(Number(bidPoint));
  // 입찰 버튼 비활성화
  const isBidInvalid = !bidPoint || Number(bidPoint) <= 0 || Number(bidPoint) > userPoint;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPointCheck(''); // 제출 시 에러 초기화

    try {
      const newTotalBid = currentBid + Number(bidPoint);
      alert(`${formatNumber(Number(bidPoint))}P를 추가 입찰하여 총 ${formatNumber(newTotalBid)}P로 입찰을 시도합니다.`);

      const data = await fetchUpdateEpisodeBid(auction_id, episode_id, newTotalBid);

      if (data === 'success') {
        alert('입찰을 성공하셨습니다.');
        window.location.reload();
      }
    } catch (err) {
      if (err instanceof Error) {
        alert('입찰에 실패하셨습니다.');
      }
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');

    // ✅ 입력할 때마다 유효성 검사 및 에러 상태 업데이트
    if (Number(numericValue) > userPoint) {
      setPointCheck(`보유 포인트를 초과할 수 없습니다. (최대: ${formatNumber(userPoint)}P)`);
    } else if (numericValue && Number(numericValue) <= 0) {
      setPointCheck('0보다 큰 금액을 입력해야 합니다.');
    } else {
      setPointCheck(''); // 유효하면 에러 메시지 초기화
    }

    setBidPoint(numericValue);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">입찰하기</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">현재 사연 입찰가</span>
          <span className="font-semibold text-[#8E74F2]">{formatNumber(currentBid)}&nbsp;P</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">내 보유 포인트</span>
          <span className="font-semibold">{formatNumber(userPoint)}&nbsp;P</span>
        </div>
      </div>

      <div>
        <label htmlFor="bid-amount" className="mb-1.5 block text-sm font-medium text-gray-700">
          입찰 금액 (추가할 포인트)
        </label>
        <div>
          <input
            id="bid-amount"
            type="text"
            placeholder="5,000"
            value={inputValue || ''}
            onChange={handleAmountChange}
            required
            className={`w-full pr-8 ${pointCheck ? 'border-red-500' : ''}`}
          />
        </div>

        {pointCheck && <p className="mt-1 text-sm text-red-600">{pointCheck}</p>}
      </div>

      <Button type="submit" className="w-full bg-[#8E74F9] hover:bg-[#3f3562]" disabled={isBidInvalid}>
        {'입찰하기'}
      </Button>
    </form>
  );
};
