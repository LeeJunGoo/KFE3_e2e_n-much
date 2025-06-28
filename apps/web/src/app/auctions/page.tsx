import SelectOrder from 'src/components/auctions/SelectOrder';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  let { order } = await searchParams;

  if (!order) {
    order = 'end_time';
  }

  return (
    <>
      <div className="mb-4 flex w-full justify-between">
        <p className="text-lg font-semibold text-[#1F1F25]">경매 리스트</p>
        <SelectOrder order={order} />
      </div>
      {/* <div className="rounded-md bg-gray-300 px-2 py-2">
        <p className="pt-1 pb-2 text-sm">{`총 ${5}개의 경매가 있습니다`}</p>
        <ul className="grid grid-cols-2 gap-3">
          {auctions.length > 0 &&
            auctions.map((auction) => {
              const { auction_id, status, title, current_point, end_time, episodes } = auction;
              let { image_urls, favorites } = auction;
              if (!image_urls) {
                image_urls = [];
              }
              if (!favorites) {
                favorites = [];
              }
              return (
                <AuctionCard
                  key={auction_id}
                  status={status}
                  imageSrc={image_urls[0]}
                  title={title}
                  currentPoint={current_point}
                  endTime={end_time}
                  episodeCount={episodes[0]['count']}
                  favorites={favorites.length}
                />
              );
            })}
        </ul>
      </div> */}
    </>
  );
}
