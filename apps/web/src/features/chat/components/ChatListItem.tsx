const ChatListItem = () => {
  return (
    <>
      <li className="border-(--color-warm-gray)/30border-b bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="size-16 overflow-hidden rounded-lg border">
            {/* {item.image_urls ? (
            <Image
              src={item.image_urls[0] || ''}
              alt={title}
              width={104}
              height={104}
              className="h-full w-full object-cover"
            />
          ) : ( */}
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
              이미지 없음
            </div>
            {/* )} */}
          </div>
          <div className="flex-1">
            <div className="flex flex-col items-start sm:flex-row sm:gap-1">
              <h3 className="font-medium">안주원제과점</h3>
              <div>
                <span className="text-(--color-warm-gray) text-sm">서울특별시 서대문구</span>
                <span className="text-(--color-warm-gray)">•</span>
                <time className="text-(--color-warm-gray) text-sm">3시간 전</time>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="flex justify-between text-sm">안녕하세요? 시간 예약..</p>
              <span className="bg-(--color-accent) ml-auto flex shrink-0 items-center justify-center rounded-full px-2 text-xs text-white">
                99
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default ChatListItem;
