'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@repo/ui/components/ui/carousel';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const page = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <header className="mb-10">
        <div className="flex justify-between">
          <Link
            href={'/auctions'}
            className="flex items-center gap-2 text-[#8E74F2] hover:text-[#D6CBFF] transition-colors"
          >
            <FaArrowLeft />
            <span>경매 목록으로 돌아가기</span>
          </Link>
          <div className="space-x-2">
            <button className="bg-[#F4F4F7] px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors">
              수정
            </button>
            <button className="bg-[#F4F4F7] px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors">
              삭제
            </button>
          </div>
        </div>
      </header>
      <main className="space-y-7">
        <div className="bg-[#F3F4F6] p-4 rounded-lg space-y-3">
          <h1 className="text-2xl font-bold">식사권 화이트롤 + 빵</h1>
          <div>
            <p className="text-gray-400 text-sm">현재&nbsp;입찰가</p>
            <p className="text-[#8E74F2] text-lg font-semibold">850,000&nbsp;P</p>
          </div>
          <div>
            <p className="text-sm">남은 시간</p>
            <time className="text-lg font-semibold text-[#D84A5F]">2일&nbsp;23시간&nbsp;59분 남음</time>
          </div>
        </div>
        <div className="px-7 space-y-7">
          <div className="relative rounded-lg overflow-hidden">
            <Carousel setApi={setApi}>
              <CarouselContent>
                <CarouselItem className="bg-amber-300 w-full h-[300px]"></CarouselItem>
                <CarouselItem className="bg-amber-300 w-full h-[300px]"></CarouselItem>
                <CarouselItem className="bg-amber-300 w-full h-[300px]"></CarouselItem>
              </CarouselContent>
            </Carousel>
            {/* 2. 카운트 표시를 위한 div 추가 및 스타일링 */}
            <p className="absolute bottom-5 right-5 rounded-full bg-gray-900/70 px-3 py-1 text-sm text-white">
              {current} / {count}
            </p>
          </div>
          {/* 상품 정보 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">상품 정보</h2>
            </div>

            <div className="px-6 py-4 leading-relaxed text-gray-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum et dolores asperiores qui obcaecati
                natus earum reprehenderit libero, dolorem, animi minima at consectetur velit placeat repellendus illo
                eaque, eveniet architecto?
              </p>
            </div>
          </div>
          {/* 업체 정보 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">업체 정보</h2>
            </div>
            <div className="px-6 py-4 space-y-5">
              <div className="flex gap-3">
                <div className="w-[50px] h-[50px] bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300" />
                <div className="space-y-1">
                  <p className="font-semibold">풍년제과</p>
                  <p className="flex items-center">
                    <FaMapMarkerAlt />
                    <span className="text-sm">서울 특별시 강남구 서초구 123-12</span>
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="flex justify-between text-gray-500 text-sm">
                  <span>총 경매 수</span>
                  <span> 42건</span>
                </p>

                <p className="flex justify-between text-gray-500 text-sm">
                  <span>현재 진행중인 경매</span>
                  <span> 2건</span>
                </p>
              </div>
            </div>
          </div>
          {/* 최고 입찰가 */}
          <div className="border rounded-lg divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold">최고 입찰가</h2>
            </div>
            <div className="px-6 py-4 space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <div className="w-[50px] h-[50px] bg-blue-400/30 border-gray-200 object-cover rounded-full hover:scale-105 transition-transform duration-300" />
                  <div className="space-y-1">
                    <p className="font-semibold">이지현</p>
                    <p className="flex items-center">
                      <IoMdTime />
                      <time className="text-sm">6월 14일 오후 03:10</time>
                    </p>
                  </div>
                </div>
                <div className="text-[#8E74F2]">
                  <p>850,000P</p>
                </div>
              </div>
            </div>
          </div>
          {/* 사연 */}
          <div className="divide-y">
            <div className="px-6 py-4">
              <h2 className="text-lg font-bold space-x-0.5">
                <span>사연</span>
                <span>(4)</span>
              </h2>
            </div>
            <div className="px-6 py-4 bg-amber-100">
              <div className="flex gap-3 items-center">
                <div className="w-[30px] h-[30px] bg-blue-400/30 border-gray-200 object-cover rounded-full" />
                <div>
                  <p className="font-semibold">이지현</p>
                  <p className="flex items-center">
                    <IoMdTime />
                    <time className="text-sm">6월 14일 오후 03:10</time>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      경매 상품 상세 page
    </>
  );
};

export default page;
