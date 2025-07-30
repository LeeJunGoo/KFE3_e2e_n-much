import { ENDING_SOON_AUCTIONS_COUNT } from 'src/entities/auction/constants';
import { getAuctionsCategory } from 'src/entities/auction/serverActions';
import EndingSoonCarousel from 'src/features/auction/carousel/EndingSoonCarousel';
import AuctionSectionHeader from 'src/features/auction/shared/AuctionSectionHeader';
import EmptyState from 'src/features/user/mypage/components/shared/EmptyState';

const EndingSoonListSection = async () => {
  const endingSoonAuctions = await getAuctionsCategory('end_date', true, ENDING_SOON_AUCTIONS_COUNT);

  if (!endingSoonAuctions || endingSoonAuctions.length === 0) {
    return (
      <EmptyState
        className="bg-(--color-background) rounded-lg border py-16 shadow-md"
        title="아직 등록된 상품 정보가 없어요."
        description="새로운 경매가 등록되면 알려드릴게요.!"
      />
    );
  }

  return (
    <div>
      <AuctionSectionHeader title="곧 종료되는 경매" href={'/auctions?order=end_time'} />
      <EndingSoonCarousel endingSoonAuctions={endingSoonAuctions} />
    </div>
  );
};

export default EndingSoonListSection;
