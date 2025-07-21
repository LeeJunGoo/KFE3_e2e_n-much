const ChatObject = () => {
  return (
    <div>
      <div className="border-(--color-warm-gray)/30 flex items-center gap-3 border-b p-4">
        <div className="size-12 overflow-hidden rounded-lg border sm:size-16">
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
          <div className="mb-2 flex flex-col">
            <h3 className="line-clamp-1 font-medium">미쉐린 제과 레스토랑 식사권</h3>
            <p className="text-(--color-warm-gray) text-sm">안주원 제과점</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatObject;
