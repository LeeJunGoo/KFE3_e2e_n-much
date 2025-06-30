'use client';
import { Badge } from '@repo/ui/components/ui/badge';
import { Card } from '@repo/ui/components/ui/card';
import React from 'react';
import { AuctionRow } from 'src/lib/supabase/type';
import { SellerInfo } from 'src/types/auctions/detail';

const AuctionDetail = ({ auctionInfo }: { auctionInfo: AuctionRow & SellerInfo }) => {
  // 상태 배지 색상 설정
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'bg-[#65BA84] text-white';
      case '마감임박':
        return 'bg-[#D84A5F] text-white';
      case '종료':
        return 'bg-[#B8B8B8] text-white';
      default:
        return 'bg-[#65BA84] text-white';
    }
  };

  return (
    <Card className="mb-4 rounded-t-2xl p-5 shadow-md">
      {/* 경매 정보 */}
      <div className="mb-5">
        <div className="mb-2 flex items-start justify-between">
          <h1 className="text-xl leading-tight font-bold text-[#1F1F25]">{auctionInfo.title}</h1>
          <Badge className={`${getStatusBadgeColor(auctionInfo.status)} ml-2`}>{auctionInfo.status}</Badge>
        </div>
        <p className="mb-3 text-sm text-[#B8B8B8]">{auctionInfo.description}</p>
        <div className="mb-3 flex items-center text-[#5B80C2]">
          <i className="fas fa-clock mr-2"></i>
          <span className="text-sm font-medium">남은 시간: {}</span>
        </div>
        <div className="mb-4">
          <p className="text-sm text-[#B8B8B8]">현재 최고 입찰가</p>
          <p className="text- [#1F1F25] text-2xl font-bold">{auctionInfo.current_point.toLocaleString()} P</p>
        </div>
        {/* 액션 버튼 */}
        {/* {auctionInfo.isLoggedIn ? (
          auctionData.isSeller ? (
            <div className="flex space-x-3">
              <Button className="!rounded-button flex-1 bg-[#EEF2FB] text-[#5B80C2] hover:bg-[#A3BCE5]">
                수정하기
              </Button>
              <Button className="!rounded-button flex-1 bg-[#EEF2FB] text-[#D84A5F] hover:bg-[#D84A5F] hover:text-white">
                삭제하기
              </Button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Button
                className="!rounded-button flex-1 bg-[#EEF2FB] text-[#5B80C2] hover:bg-[#A3BCE5]"
                onClick={() => alert('사연 작성 모달 열기')}
              >
                사연 작성하기
              </Button>
              <Button
                className="!rounded-button flex-1 bg-[#5B80C2] text-white hover:bg-[#4A6DA8]"
                onClick={() => setShowBidModal(true)}
              >
                입찰하기
              </Button>
            </div>
          )
        ) : (
          <Button className="!rounded-button w-full bg-[#5B80C2] text-white hover:bg-[#4A6DA8]">로그인하기</Button>
        )} */}
      </div>
    </Card>
  );
};

export default AuctionDetail;
