'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@repo/ui/components/ui/carousel';
import { Card, CardContent } from '@repo/ui/components/ui/card';

export function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 7 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
