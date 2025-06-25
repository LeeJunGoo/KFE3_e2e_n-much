import React from 'react';
import AuctionCard from 'src/components/common/AuctionCard';
import { CarouselSize } from 'src/components/main/CardSlides';
import Sample from 'src/components/main/Sample';

const page = () => {
  return (
    <div>
      <Sample></Sample>
      <CarouselSize />
      <AuctionCard></AuctionCard>
    </div>
  );
};

export default page;
