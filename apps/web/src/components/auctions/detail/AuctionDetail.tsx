'use client';
import { Badge } from '@repo/ui/components/ui/badge';
import { Button } from '@repo/ui/components/ui/button';
import { Card } from '@repo/ui/components/ui/card';
import { PropsWithChildren } from 'react';
import { AuctionRow } from 'src/lib/supabase/type';
import { SellerInfo } from 'src/types/auctions/detail';

const AuctionDetail = ({ auctionInfo, children }: PropsWithChildren<{ auctionInfo: AuctionRow & SellerInfo }>) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'success';
      case 'CLOSED':
        return 'error';
      default:
        return 'success';
    }
  };
  return (
    //  경매 정보
    <Card className="mb-4 rounded-t-2xl p-5 shadow-md">
      <div className="mb-2">
        <div className="mb-2 flex items-start justify-between">
          <h1 className="text-xl leading-tight font-bold text-(--color-text-base)">{auctionInfo.title}</h1>
          <Badge variant={getStatusBadgeColor(auctionInfo.status)} className="ml-2">
            {auctionInfo.status}
          </Badge>
        </div>
        <p className="mb-3 text-sm text-(--color-warm-gray)">{auctionInfo.description}</p>

        {children}
        <div className="mb-4">
          <p className="text-sm text-(--color-warm-gray)">현재 최고 입찰가</p>
          <p className="text-xl font-bold text-(--color-text-base)">{auctionInfo.current_point.toLocaleString()} P</p>
        </div>
        {/* 액션 버튼 */}
        <div className="flex space-x-3">
          <Button
            className="!rounded-button flex-1 bg-(--color-accent) text-(--color-secondary) hover:bg-(--color-primary)"
            onClick={() => alert('사연 작성 모달 열기')}
          >
            사연 작성하기
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AuctionDetail;
