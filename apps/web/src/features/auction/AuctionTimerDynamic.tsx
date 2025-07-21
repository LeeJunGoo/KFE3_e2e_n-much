'use client';

import React from 'react';
import { useTimer } from 'src/entities/auction/hooks/useCountDown';
import { type AuctionTimerStatus } from 'src/entities/auction/types';
import { type AuctionRow } from 'src/shared/supabase/types';
import AuctionTimer from './shared/AuctionTimer';

const AuctionTimerDynamic = ({ endDate }: { endDate: AuctionRow['end_date'] }) => {
  const { days, hours, minutes, seconds } = useTimer({ endDate });
  let status: AuctionTimerStatus = 'ongoing';
  let formattedTime = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;

  if (parseInt(days) > 0) {
    //ANCHOR - 24시간 이상일 경우: '일', '시간', '분'만 표시
    formattedTime = `${days}일 ${hours}시간 ${minutes}분`;
    status = 'ongoing';
  } else {
    //ANCHOR -  24시간 미만일 경우: '시간', '분', '초' 표시
    formattedTime = `${hours}시간 ${minutes}분 ${seconds}초`;
    status = 'urgent';
  }

  return (
    <>
      <AuctionTimer remainTime={formattedTime} status={status} />
    </>
  );
};

export default AuctionTimerDynamic;
